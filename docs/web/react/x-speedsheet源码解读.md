# x-speedSheet 源码解读

## 整体架构

## 渲染

### 初始渲染

#### 1 调用SpeadSheet构造函数

1.1	主要是根据传入的options创建出dom元素插入到传入的id元素中，有点类似react把虚拟dom元素创建出来之后，插入到页面设置的id元素上。

1.2	初始化一些数据，比如this.data 就是表示代理了整个sheet 数据的，有点类似设置了整个sheet数据的proxy。

1.3	this.sheet 表示整个sheet的初始化和事件的初始化，同时把this.data 也挂载到this.sheet.data上面，同时把event和table等数据表示挂载到上面。比如下图就是this.sheet的数据结构。

![image-20210710114201688](/Users/zsj/Library/Application Support/typora-user-images/image-20210710114201688.png)



```js
constructor(selectors, options = {}) {
    let targetEl = selectors;

    // 默认显示bottombar
    this.options = { showBottomBar: true, ...options };
    // sheetIndex 类似excel下面的几个表格的索引
    this.sheetIndex = 1;
    // 所有的数据，也就是每个sheet在数组中一个索引
    this.datas = [];
    if (typeof selectors === "string") {
      // 获取容器
      targetEl = document.querySelector(selectors);
    }
    this.bottombar = this.options.showBottomBar
      ? new Bottombar(
          () => {
            const d = this.addSheet();
            this.sheet.resetData(d);
          },
          (index) => {
            const d = this.datas[index];
            this.sheet.resetData(d);
          },
          () => {
            this.deleteSheet();
          },
          (index, value) => {
            this.datas[index].name = value;
          }
        )
      : null;

    // #
    // addSheet(name, active)
    // 功能 添加多表
    // @param name string 名称
    // @param active boolean 默认为 true
    // this.data 表示一张表的所有数据代理
    this.data = this.addSheet();
    // h就是创建一个对象，该对象的属性el表示创建的dom元素
    const rootEl = h("div", `${cssPrefix}`).on("contextmenu", (evt) =>
      evt.preventDefault()
    );
    // 把我们创建的元素插入到浏览器的dom元素上
    targetEl.appendChild(rootEl.el);
    // 创建表，this.data表示 DataProxy 代理类
    this.sheet = new Sheet(rootEl, this.data);
    if (this.bottombar !== null) {
      rootEl.child(this.bottombar.el);
    }
  }
```



#### 2 Sheet类

通过在构造函数中的逻辑可以发现，几乎所有的初始化整个views层和初始化事件等逻辑都在Sheet类中

在源码中this.sheet = new Sheet(rootEl, this.data); rootEl是一个div的数据结构，想象成是类似react的viralDOM表示就可以了，不过会比viralDOM简单很多。this.data就是在构造函数里边创建的整个sheet中的data的proxy代理对象。

在Sheet的构造函数中也是做了一些初始化的工作，比如创建toolbar对象，print 打印的对象，创建select的时候div的对象，创建edit的时候div的对象等，等到创建完这些对象之后，然后调用事件初始化函数初始化事件，调用render函数渲染。

```js
constructor(targetEl, data) {
    // 使用发布订阅模式
    this.eventMap = createEventEmitter();
    const { view, showToolbar, showContextmenu } = data.settings;

    // el 表示真实的dom元素
    this.el = h("div", `${cssPrefix}-sheet`);
    // 创建toolbar
    this.toolbar = new Toolbar(data, view.width, !showToolbar);
    // 创建打印
    this.print = new Print(data);
    targetEl.children(this.toolbar.el, this.el, this.print.el);
    // sheetDataProxy 代理
    this.data = data;
    // 创建表格
    this.tableEl = h("canvas", `${cssPrefix}-table`);
    // 创建缩放
    this.rowResizer = new Resizer(false, data.rows.height);
    this.colResizer = new Resizer(true, data.cols.minWidth);
    // 创建scrollbar
    this.verticalScrollbar = new Scrollbar(true);
    this.horizontalScrollbar = new Scrollbar(false);
    // 创建editor div对象
    this.editor = new Editor(
      formulas,
      () => this.getTableOffset(),
      data.rows.height
    );
    // 创建data检测
    this.modalValidation = new ModalValidation();
    // 创建右键点击的菜单栏
    this.contextMenu = new ContextMenu(() => this.getRect(), !showContextmenu);
    // 创建selected，也就是在表格中点击之后的对象
    this.selector = new Selector(data);
    // 创建遮罩层，通过这里获取到事件
    this.overlayerCEl = h("div", `${cssPrefix}-overlayer-content`).children(
      this.editor.el,
      this.selector.el
    );
    this.overlayerEl = h("div", `${cssPrefix}-overlayer`).child(
      this.overlayerCEl
    );
    // 创建排序
    this.sortFilter = new SortFilter();
    // 把创建的dom元素都插入到this.el中
    this.el.children(
      this.tableEl,
      this.overlayerEl.el,
      this.rowResizer.el,
      this.colResizer.el,
      this.verticalScrollbar.el,
      this.horizontalScrollbar.el,
      this.contextMenu.el,
      this.modalValidation.el,
      this.sortFilter.el
    );
    // 创建table对象
    this.table = new Table(this.tableEl.el, data);
    // 初始化事件
    sheetInitEvents.call(this);
    // 调用表格的render画出表格
    sheetReset.call(this);
    // 设置选择的表格的cell的坐标为0，0
    selectorSet.call(this, false, 0, 0);
  }
```



#### 3 Table

Table的构造函数没有做过多的东西，很简单就是初始化了一些变量，this.draw就是一个画的函数，一个this.data是前面的sheetDataProxy。

这里的主要逻辑在Table的render函数里边

render函数里边就是一些比较简单的使用canvas的渲染逻辑，基本比较简单。

```js
render() {
    // resize canvas
    const { data } = this;
    const { rows, cols } = data;
    // fixed width of header 固定宽度
    const fixedWidth = cols.indexWidth;
    // fixed height of header 固定高度
    const fiexedHeight = rows.height;

    this.draw.resize(data.viewWidth(), data.viewHeight());
    this.clear();

    const viewRange = data.viewRange();
    // renderAll.call(this, viewRange, data.scroll);
    const tx = data.freezeTotalWidth();
    const ty = data.freezeTotalHeight();
    const { x, y } = data.scroll;
    // 1
    renderContentGrid.call(this, viewRange, fixedWidth, fiexedHeight, tx, ty);
    renderContent.call(this, viewRange, fixedWidth, fiexedHeight, -x, -y);
    renderFixedHeaders.call(
      this,
      "all",
      viewRange,
      fixedWidth,
      fiexedHeight,
      tx,
      ty
    );
    // 渲染左侧栏
    renderFixedLeftTopCell.call(this, fixedWidth, fiexedHeight);
    const [fri, fci] = data.freeze;
    if (fri > 0 || fci > 0) {
      // 2
      if (fri > 0) {
        const vr = viewRange.clone();
        vr.sri = 0;
        vr.eri = fri - 1;
        vr.h = ty;
        renderContentGrid.call(this, vr, fixedWidth, fiexedHeight, tx, 0);
        renderContent.call(this, vr, fixedWidth, fiexedHeight, -x, 0);
        renderFixedHeaders.call(
          this,
          "top",
          vr,
          fixedWidth,
          fiexedHeight,
          tx,
          0
        );
      }
      // 3
      if (fci > 0) {
        const vr = viewRange.clone();
        vr.sci = 0;
        vr.eci = fci - 1;
        vr.w = tx;
        renderContentGrid.call(this, vr, fixedWidth, fiexedHeight, 0, ty);
        renderFixedHeaders.call(
          this,
          "left",
          vr,
          fixedWidth,
          fiexedHeight,
          0,
          ty
        );
        renderContent.call(this, vr, fixedWidth, fiexedHeight, 0, -y);
      }
      // 4
      const freezeViewRange = data.freezeViewRange();
      renderContentGrid.call(
        this,
        freezeViewRange,
        fixedWidth,
        fiexedHeight,
        0,
        0
      );
      renderFixedHeaders.call(
        this,
        "all",
        freezeViewRange,
        fixedWidth,
        fiexedHeight,
        0,
        0
      );
      renderContent.call(this, freezeViewRange, fixedWidth, fiexedHeight, 0, 0);
      // 5
      renderFreezeHighlightLine.call(this, fixedWidth, fiexedHeight, tx, ty);
    }
  }
```



到这里基本上使用x_spreadsheet('#x-spreadsheet-demo',options)的流程基本上就结束了。

此时的ui图如下图所示：

![image-20210710154508068](/Users/zsj/Library/Application Support/typora-user-images/image-20210710154508068.png)



### loadData

1. 当完成了初始的渲染之后，然后我们可以使用loadData来加载数据，来完成表格中加载数据的过程。

   可以先看下调用使用如下data，调用loadData达到的效果。

```js
     const rows = {
        len: 80,
        1: {
          cells: {
            0: { text: 'testingtesttestetst' },
            2: { text: 'testing' },
          },
        },
        2: {
          cells: {
            // 这里的style： 0 表示data中的styles的第一个元素
            0: { text: 'render', style: 0 },
            1: { text: 'Hello' },
            2: { text: 'haha', merge: [1, 1] },
          }
        },
        8: {
          cells: {
            // 这里的style： 0 表示data中的styles的第一个元素
            8: { text: 'border test', style: 0 },
          }
        }
      };

var xs = x_spreadsheet('#x-spreadsheet-demo', {
        showToolbar: true,
        showGrid: true,
        showBottomBar: true,
        col: {
          len: 50,
          width: 100,
          // indexWidth: 60,
          minWidth: 20,
        },
        row: {
          len: 20,
        },
        extendToolbar: {
          left: [
            {
              tip: 'Save',
              icon: saveIcon,
              onClick: (data, sheet) => {
                console.log('click save button：', data, sheet)
              }
            }
          ],
          right: [
            {
              tip: 'Preview',
              el: previewEl,
              onClick: (data, sheet) => {
                console.log('click preview button：', data)
              }
            }
          ],
        }
      })
        .loadData([{
          freeze: 'B3',
          styles: [
            {
              bgcolor: '#f4f5f8',
              textwrap: true,
              color: '#900b09',
              border: {
                top: ['thin', '#0366d6'],
                bottom: ['thin', '#0366d6'],
                right: ['thin', '#0366d6'],
                left: ['thin', '#0366d6'],
              },
            },
          ],
          merges: [
            'C3:D4',
          ],
          cols: {
            len: 10,
            2: { width: 200 },
          },
          rows,
        })
```

​	效果图如下

![image-20210710155216048](/Users/zsj/Library/Application Support/typora-user-images/image-20210710155216048.png)

2. 这里的关键是通过调用dataSheetProxy的resetData来重新渲染，然后调用到了table的resetData,然后table调用render来重新渲染。到此基本的渲染基本上就完成了。

   

## 事件系统

### 表格的点击事件

1. 通过createEventEmitter 注册事件， 文件目录(src/component/event.js)，这里的注册事件很简单，就是普通的发布订阅模式

2. 通过最外层的遮罩层监听事件函数，比如单击，比如双击，双击的时候，显示编辑框。

   
