# 几道题目轻松搞定贪心算法

---

# 主题列表：juejin, github, smartblue, cyanosis, channing-cyan, fancy, hydrogen, condensed-night-purple, greenwillow

# 贡献主题：https://github.com/xitu/juejin-markdown-themes

theme: juejin
highlight:

---

# 什么是贪心算法？

1 贪心算法就是在每一步都要选择最优结果，当局部最优结果结束后，得到全局最优结果。但是其实很多看似可以使用贪心算法的，往往使用贪心算法并不能得到最优解。

## 445 分配饼干

### 题目描述

有一群孩子和一堆饼干，每个孩子有一个饥饿度，每个饼干都有一个大小。每个孩子只能吃最多一个饼干，且只有饼干的大小大于孩子的饥饿度时，这个孩子才能吃饱。求解最多有多少孩子可以吃饱。

例子

输入两个数组，分别代表孩子的饥饿度和饼干的大小。输出最多有多少孩子可以吃饱的数量。<br/>
Input: [1,2], [1,2,3]<br/>
Output: 2<br/>
在这个样例中，我们可以给两个孩子喂[1,2]、[1,3]、[2,3]这三种组合的任意一种。<br/>

### 思考 1

这里很明显是属于贪心算法，优先把饥饿度最小的孩子用最小的饼干喂饱，一定可以得到最多的。

### 实现 1

```js
export default (childrens, cookies) => {
  if (!childrens || childrens.length === 0) return 0;
  childrens.sort();
  cookies.sort();
  // 最多可以有多少孩子
  let res = 0;
  // 已经分配的饼干索引
  let cookiesIndex = 0;
  // 优先使用最小的饼干喂饱饥饿最下的孩子
  for (let i = 0; i < childrens.length; i++) {
    for (let j = cookiesIndex; j < cookies.length; j++) {
      if (cookies[j] >= childrens[i]) {
        res++;
        cookiesIndex = j + 1;
        break;
      }
    }
  }
  return res;
};
```

算法时间复杂度 O(childrens.length\*cookies.length), 空间复杂度 O(1)

## 763-划分字母区间

### 题目描述

字符串 S 由小写字母组成。我们要把这个字符串划分为尽可能多的片段，同一字母最多出现在一个片段中。返回一个表示每个字符串片段的长度的列表。

例子

输入：S = "ababcbacadefegdehijhklij"<br/>
输出：[9,7,8]<br/>
解释：<br/>
划分结果为 "ababcbaca", "defegde", "hijhklij"。<br/>
每个字母最多出现在一个片段中。<br/>
像 "ababcbacadefegde", "hijhklij" 的划分是错误的，因为划分的片段数较少。<br/>

提示

S 的长度在[1, 500]之间。<br/>
S 只包含小写字母 'a' 到 'z' 。

### 思考 1

1 思路很简单，利用递归，不断的去查找<br/>
2 利用贪心算法和双指针，首先使用一个数组存储所有字符出现的最后位置，然后利用双指针，一个指向子串开始的位置，一个指向子串结束的位置，然后不断查找，当发现一个字母已经到达了它在字符串中的最后位置的时候，就是相当于发现了一个符合条件的子串。
代码很简单，稍微看下，就明白了。<br/>

这里可以得到一个小提示，一旦涉及到字符串的时候，很自然的就要想到使用一个长度为 26 的数组来存储。

### 实现 1

```js
/**
 * @param {string} S
 * @return {number[]}
 */

const getBigStr = (S, begin, res) => {
  let max = begin;
  const len = S.length;
  if (begin >= S.length) {
    return;
  }
  const lastIndex = S.lastIndexOf(S[begin]);
  if (lastIndex !== -1) {
    max = Math.max(max, lastIndex);
    let s1 = S.substring(begin, lastIndex + 1);
    for (let i = 1; i < s1.length; i++) {
      const newLastIndex = S.lastIndexOf(s1[i]);
      if (newLastIndex > max) {
        max = newLastIndex;
        s1 = S.substring(begin, max + 1);
      }
    }
    res.push(S.substring(begin, max + 1));
  } else {
    res.push(S[begin]);
    max = begin++;
  }
  return max;
};
export default (S) => {
  let res = [];
  let max = -1;
  while (max < S.length) {
    max = getBigStr(S, max + 1, res);
  }
  return res.map((item) => item.length);
};
```

### 实现 2

```js
export default (S) => {
  if (S == null || S.length === 0) {
    return null;
  }
  const list = [];
  // 记录每个字符出现在字符串中的最后的位置
  const map = new Array(26).fill(0);

  for (let i = 0; i < S.length; i++) {
    map[S.charCodeAt(i) - 97] = i;
  }
  // 记录每个子串出现的开始和结束
  let last = 0;
  let start = 0;
  for (let i = 0; i < S.length; i++) {
    last = Math.max(last, map[S.charCodeAt(i) - 97]);
    if (last === i) {
      list.push(last - start + 1);
      start = last + 1;
    }
  }
  return list;
};
```

时间复杂度 O（n）, 空间复杂度 O（1）

## 435 区间问题

### 题目描述

给定多个区间，计算让这些区间互不重叠所需要移除区间的最少个数。起止相连不算重叠。

例子

输入是一个数组，数组由多个长度固定为 2 的数组组成，表示区间的开始和结尾。输出一个 整数，表示需要移除的区间数量。

Input: [[1,2], [2,4], [1,3]]<br/>
Output: 1<br/>

在这个样例中，我们可以移除区间 [1,3]，使得剩余的区间 [[1,2], [2,4]] 互不重叠

### 思考 1

这里的贪心策略使用是不明显的，需要做一些转换，但是如何转换呢？<br/>

这个首先得自己思考下，然后才能有收获，不然看完题解也很快就忘记了。<br/>

思考最好的方法是多写几个测试用例，看下如何解决。<br/>

比如测试用例中[[1,2], [2,4], [1,3]]，为什么会删除[1,3]，很明显是[1,3]与[1,2]的区别就是 3 比 2 大，如果[1,3] 变成[0,5]呢？<br/>
则输入的数组变成[[1,2], [2,4], [0,5]]，可以很明显看出删除[0,5]<br/>
如果输入的数组变成[[1,2], [2,4], [5,7]]呢，可以明显看出不需要删除任何数组

通过以上的例子是不是发现了什么？<br/>

所谓的贪心算法就是找到局部的最优解，然后判断局部的最优解是否是全局的最优解？<br/>

这里是不是发现如果想删除最少的数组，只需要把跨度最大的数组删除就可以了。<br/>

也就是如果两个区间重合，删除其中一个区间的结尾最小的区间，因为区间结尾最小，说明以后删除的区间也就越少，也就是这里的贪心。

### 实现 1

```
/**
 * @param {number[][]} intervals
 * @return {number}
 */
export default (intervals) => {
  if (!intervals || intervals.length === 0 || intervals.length === 1) return 0;
  intervals.sort((a, b) => a[1] - b[1]);
  let min = 0;
  for (let i = 1; i < intervals.length; ) {
    if (
      (intervals[i][0] < intervals[i - 1][1] && intervals[i][0] >= intervals[i - 1][0]) ||
      intervals[i][0] < intervals[i - 1][0]
    ) {
      min++;
      intervals.splice(i, 1);
    } else {
      i++;
    }
  }
  return min;
};

```

时间复杂度 O（nlgn）空间复杂度 O（1）

### 实现 2

```js
/**
 * @param {number[][]} intervals
 * @return {number}
 */

export default (intervals) => {
  if (!intervals || intervals.length < 2) return 0;
  intervals.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    } else {
      return a[0] - b[0];
    }
  });
  let count = 0;
  for (let i = 1; i < intervals.length; ) {
    if (intervals[i][0] < intervals[i - 1][1]) {
      if (intervals[i][1] > intervals[i - 1][1]) {
        intervals.splice(i, 1);
      } else {
        intervals.splice(i - 1, 1);
      }
      count++;
    } else {
      i++;
    }
  }
  return count;
};
```

时间复杂度 O（nlgn）空间复杂度 O（1）

## 605. 种花问题

### 题目描述

假设你有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花卉不能种植在相邻的地块上，它们会争夺水源，两者都会死去。

给定一个花坛（表示为一个数组包含 0 和 1，其中 0 表示没种植花，1 表示种植了花），和一个数 n 。能否在不打破种植规则的情况下种入 n 朵花？能则返回 True，不能则返回 False。

例子

输入是一个数组，数组由多个长度固定为 2 的数组组成，表示区间的开始和结尾。输出一个 整数，表示需要移除的区间数量。

输入: flowerbed = [1,0,0,0,1], n = 1<br/>
输出: True<br/>

在这个样例中，可以把花种在 2 的位置上<br/>

输入: flowerbed = [1,0,0,0,1], n = 2<br/>
输出: False<br/>

因为这里有两颗花，不论第一棵花种在哪里，都会有相连的，从而导致有连在一起的两颗花

注意:

1 数组内已种好的花不会违反种植规则。<br/>
2 输入的数组长度范围为 [1, 20000]。<br/>
3 n 是非负整数，且不会超过输入数组的大小。

### 思考 1

贪心算法首先最重要的就是要寻找到最优解？<br/>
那这里的最优解是什么呢？或者换句话说我们怎么做才是最贪心的呢？

当 [1,0,0,0,1], n = 1 的时候，最贪心的肯定是从第一个可以种的位置种植<br/>

当 [1,0,0,0,1], n = 2 的时候，最贪心的肯定是从第一个可以种的位置种植,如果发现第二个没有位置可以种植，则返回 false

### 实现 1

```
/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
// [1, 0, 0, 0, 1]
// [1,0,0,0,1,0,0]
export default (flowerbed, n) => {
  for (let i = 0; i < flowerbed.length; ) {
    if (i === 0 && flowerbed[i] === 0 && flowerbed[i + 1] !== 1) {
      flowerbed[i] === 1;
      n--;
      i += 2;
    } else if (i === flowerbed.length - 1 && flowerbed[i] === 0 && flowerbed[i - 1] !== 1) {
      n--;
      i++;
    } else if (flowerbed[i] === 0 && flowerbed[i - 1] !== 1 && flowerbed[i + 1] !== 1) {
      flowerbed[i] = 1;
      n--;
      i += 2;
    } else {
      i++;
    }
  }
  return n <= 0;
};


```

时间复杂度 O（n）空间复杂度 O（1）

## 452. 用最少数量的箭引爆气球

### 题目描述

在二维空间中有许多球形的气球。对于每个气球，提供的输入是水平方向上，气球直径的开始和结束坐标。由于它是水平的，所以纵坐标并不重要，因此只要知道开始和结束的横坐标就足够了。开始坐标总是小于结束坐标。

一支弓箭可以沿着 x 轴从不同点完全垂直地射出。在坐标 x 处射出一支箭，若有一个气球的直径的开始和结束坐标为 xstart，xend， 且满足 xstart ≤ x ≤ xend，则该气球会被引爆。可以射出的弓箭的数量没有限制。 弓箭一旦被射出之后，可以无限地前进。我们想找到使得所有气球全部被引爆，所需的弓箭的最小数量。

给你一个数组 points ，其中 points [i] = [xstart,xend] ，返回引爆所有气球所必须射出的最小弓箭数。

例子 1

输入：points = [[10,16],[2,8],[1,6],[7,12]]<br/>
输出：2<br/>
解释：对于该样例，x = 6 可以射爆 [2,8],[1,6] 两个气球，以及 x = 11 射爆另外两个气球<br/>

例子 2

输入：points = [[1,2],[3,4],[5,6],[7,8]]<br/>
输出：4

例子 3

输入：points = [[1,2],[2,3],[3,4],[4,5]]<br/>
输出：2

注意:

1 0 <= points.length <= 104<br/>
2 points[i].length == 2<br/>
3 -231 <= xstart < xend <= 231 - 1

### 思考 1

当 [[10,16],[2,8],[1,6],[7,12]]的时候，我们想用最少的箭去射爆更多的气球，很自然的能够想到我们射出的箭肯定得能够穿越更多的空间。<br/>

比如这个例子中[2,8],[1,6]，我们需要用 2-6 中间的任何一支箭，比如 2，3，4，5，6，但是我们同时又希望我们这支箭可以射爆更多的区间，那应该从 2，3，4，5，6 中选择那只箭呢？

思考一下<br/>

很容易就想到肯定是最大的那支箭，也就是 6，因为只有越大，我们才能射爆更多的其他区间。<br/>

所以这里也就是我们的最优解。

### 实现 1

```js
/**
 * @param {number[][]} points
 * @return {number}
 */
export default (points) => {
  const rowLen = points.length;
  if (rowLen === 0) return 0;
  const colLen = 2;
  points.sort((a, b) => a[0] - b[0]);
  let count = 1;
  let pre = points[0];
  for (let i = 1; i < points.length; i++) {
    if (points[i][0] < pre[1]) {
      pre[0] = Math.max(points[i][0], pre[0]);
      pre[1] = Math.min(points[i][1], pre[1]);
    } else if (points[i][0] === pre[1]) {
      pre[0] = points[i][0];
      pre[1] = points[i][0];
    } else {
      pre = points[i];
      count++;
    }
  }
  return count;
};
```

### 实现 2

```js
/**
 * @param {number[][]} points
 * @return {number}
 */
export default (points) => {
  const rowLen = points.length;
  if (rowLen === 0) return 0;
  points.sort((a, b) => a[1] - b[1]);
  let count = 1;
  // 首先使用最大的箭头，可以射到最多的
  let arrowNum = points[0][1];
  for (let i = 1; i < points.length; i++) {
    if (points[i][0] > arrowNum) {
      count++;
      arrowNum = points[i][1];
    }
  }
  return count;
};
```

时间复杂度 O（nlgn） 空间复杂度 O（1）

## 763-划分字母区间

### 题目描述

字符串 S 由小写字母组成。我们要把这个字符串划分为尽可能多的片段，同一个字母只会出现在其中的一个片段。返回一个表示每个字符串片段的长度的列表。

例子 1

输入: S = "ababcbacadefegdehijhklij"<br/>
输出: [9,7,8]<br/>
解释:<br/>
划分结果为 "ababcbaca", "defegde", "hijhklij"。<br/>
每个字母最多出现在一个片段中。<br/>
像 "ababcbacadefegde", "hijhklij" 的划分是错误的，因为划分的片段数较少。<br/>

注意:

1 S 的长度在[1, 500]之间。<br/>
2 S 只包含小写字母'a'到'z'。<br/>

### 思考 1

这里是主要是贪心算法，首先肯定想到了贪心<br/>

另外这里看到提示 S 只包含小写字母'a'到'z'，因为以前做过很多的题目，只要涉及到小写字母'a'到'z'，就联想到了使用一个大小为 26 的数组来存储 a 到 z 出现的次数或者位置<br/>

回到正题，看下测试用例<br/>

S = "ababcbacadefegdehijhklij"<br/>

划分结果为 "ababcbaca", "defegde", "hijhklij"。<br/>
每个字母最多出现在一个片段中。<br/>

很明显可以看出，每个划分字符串里边每个字母都是只出现在字符串里边，比如遍历字符串的时候，如果遇到 a，则首先找到 a 最后出现的位置，就会找到一个子串，如果子串里边所有的字母都出现在这个子串里边，则可以认定这个子串可以划分出来，如果不是则更新子串的大小，重新计算。实现 1 就是这个思路。

那这里和贪心有什么关系呢？<br/>

我的理解是就是每次把自己可以找到的最大子串找到。<br/>

当然这里实现 1 可以改进，不去不断的更新子串，利用一个数组存储每个字母在字符串中出现的最后一个位置，我们可以遍历字符串，当发现一个字母出现的位置是它在字符串中出现的位置的时候，就可以划分为一个子串，原理很简单，稍微看下代码就可以了。

### 实现 1

```js
/**
 * @param {string} S
 * @return {number[]}
 */

const getBigStr = (S, begin, res) => {
  let max = begin;
  const len = S.length;
  if (begin >= S.length) {
    return;
  }
  const lastIndex = S.lastIndexOf(S[begin]);
  if (lastIndex !== -1) {
    max = Math.max(max, lastIndex);
    let s1 = S.substring(begin, lastIndex + 1);
    for (let i = 1; i < s1.length; i++) {
      const newLastIndex = S.lastIndexOf(s1[i]);
      if (newLastIndex > max) {
        max = newLastIndex;
        s1 = S.substring(begin, max + 1);
      }
    }
    res.push(S.substring(begin, max + 1));
  } else {
    res.push(S[begin]);
    max = begin++;
  }
  return max;
};
export default (S) => {
  let res = [];
  let max = -1;
  while (max < S.length) {
    max = getBigStr(S, max + 1, res);
  }
  return res.map((item) => item.length);
};
```

### 实现 2

```js
export default (S) => {
  if (S == null || S.length === 0) {
    return null;
  }
  const list = [];
  // 记录每个字符出现在字符串中的最后的位置
  const map = new Array(26).fill(0);

  for (let i = 0; i < S.length; i++) {
    map[S.charCodeAt(i) - 97] = i;
  }
  // 记录每个子串出现的开始和结束
  let last = 0;
  let start = 0;
  for (let i = 0; i < S.length; i++) {
    last = Math.max(last, map[S.charCodeAt(i) - 97]);
    if (last === i) {
      list.push(last - start + 1);
      start = last + 1;
    }
  }
  return list;
};
```

时间复杂度 O（n），空间复杂度 O（1）

## 122. 买卖股票的最佳时机 II

### 题目描述

给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。<br/>

设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。

注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

例子 1

输入: [7,1,5,3,6,4]<br/>
输出: 7<br/>
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。<br/>
随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。<br/>

例子 2
输入: [1,2,3,4,5]<br/>
输出: 4<br/>
解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。<br/>
注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。
因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。

例子 3

输入: [7,6,4,3,1]<br/>
输出: 0<br/>
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0<br/>

注意:

1 1 <= prices.length <= 3 \* 10 ^ 4<br/>
2 0 <= prices[i] <= 10 ^ 4

### 思考 1

这里就很简单了，我们如果想获取收益最大，肯定是买在最低点，卖在最高点。<br/>

我们只需要使用贪心，找到前面连续降的最低点，然后卖在连续升的最高点就可以了。<br/>

### 实现 1

```js
/**
 * @param {number[]} prices
 * @return {number}
 */

export default (prices) => {
  let n = prices.length,
    lastBuy = -A[0],
    lastSold = 0;
  if (n === 0) return 0;

  for (let i = 1; i < n; i++) {
    let curBuy = Math.max(lastBuy, lastSold - A[i]);
    let curSold = Math.max(lastSold, lastBuy + A[i]);
    lastBuy = curBuy;
    lastSold = curSold;
  }

  return lastSold;
};
```

时间复杂度 O（n），空间复杂度 O（1）

## 406. 根据身高重建队列

### 题目描述

假设有打乱顺序的一群人站成一个队列。 每个人由一个整数对 (h, k) 表示，其中 h 是这个人的身高，k 是应该排在这个人前面且身高大于或等于 h 的人数。 例如：[5,2] 表示前面应该有 2 个身高大于等于 5 的人，而 [5,0] 表示前面不应该存在身高大于等于 5 的人。

编写一个算法，根据每个人的身高 h 重建这个队列，使之满足每个整数对 (h, k) 中对人数 k 的要求。

例子 1

输入：[[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]<br/>
输出：[[5,0], [7,0], [5,2], [6,1], [4,4], [7,1]]<br/>

注意:

1 总人数少于 1100 人

### 思考 1

这道题目确实不是很好理解，但是如果看过解法之后，就可以很好的利用贪心来解释。<br/>

比如输入[[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]的时候，当发现[7,0]的时候，前面要么没有区间，要么就是身高小于或者等于 7 且区间的结尾是 0 的区间。<br/>

那么是不是可以换个角度想，比如[7,0],它应该是放在结果中的 0 的位置，如果再发现一个比 7 小，或者等于 7 的区间，比如[5,0]，按照正常情况下，[5,0]也应该是放在结果的 0 的位置上的，可以在结果的 0 的位置上已经有[7,0]了所以[5,0]需要插入到[7,0]的前面。<br/>

所以这里可以先按照区间开头进行降序排序，当区间开头相同的时候，进行区间结尾的升序排序。然后依次插入到一个空数组中就可以了。<br/>

这里的贪心，其实不是很明显，可能贪心体现在先保证区间开头最大的位置放到数组中合理的位置。

### 实现 1

```js
/**
 * @param {number[][]} people
 * @return {number[][]}
 */
const swap = (people, i, j) => {
  const temp = people[j];
  people[j] = people[i];
  people[i] = temp;
};
export default (people) => {
  if (!people) return [];
  people.sort((o1, o2) => {
    return o1[0] !== o2[0] ? o2[0] - o1[0] : o1[1] - o2[1];
  });
  const res = [];
  for (let i = 0; i < people.length; i++) {
    res.splice(people[i][1], 0, people[i]);
  }
  return res;
};
```

时间复杂度 O（nlgn），空间复杂度 O（n）

## 665. 非递减数列

### 题目描述

给定一个长度为 n 的整数数组，你的任务是判断在最多改变 1 个元素的情况下，该数组能否变成一个非递减数列。<br/>

我们是这样定义一个非递减数列的： 对于数组中所有的 i (1 <= i < n)，满足 array[i] <= array[i + 1]。<br/>

例子 1

输入: [4,2,3]<br/>

输出: True<br/>

解释: 你可以通过把第一个 4 变成 1 来使得它成为一个非递减数列。<br/>

例子 2

输入: [4,2,1]<br/>

输出: False<br/>

解释: 你不能在只改变一个元素的情况下将其变为非递减数列。

注意:

1 n 的范围为 [1, 10,000]

### 思考 1

这里也很简单，就是不断遍历，当发现应该需要序号 i 的时候，如何根据 i 前后的数来确定修改为什么。<br/>

这里的贪心可能就是体现在如果根据需要修改的序号 i 的前后，来确定应该修改为什么。<br/>

如果已经修改过一次了，后面如果发现还需要修改，直接返回 false

### 实现 1

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
export default (nums) => {
  let hasChangedNum = 0;
  for (let i = 1; i < nums.length && hasChangedNum <= 1; i++) {
    if (nums[i] < nums[i - 1]) {
      hasChangedNum++;
      if (nums[i - 2] <= nums[i] || i < 2) {
        nums[i - 1] = nums[i];
      } else {
        nums[i] = nums[i - 1];
      }
    }
  }
  return hasChangedNum <= 1;
};
```

时间复杂度 O（n），空间复杂度 O（1）

## 贪心算法总结

贪心算法除非特备明显的可以看出需要使用贪心的，其他大多数没有必要刻意使用贪心，大多需要通过排序，修改来让数据结构变化，根据条件发现是否可以使用贪心，但大多数其实都可以无意识的使用贪心。
