# scheduleWork



```javascript
function scheduleWork(fiber, expirationTime) {
      // 找到root,设置更新节点的所有父节点的expirationTime为当前的expirationTime，除非父节点的expirationTime
      // 大于当期的expirationTime，设置父节点的childExpirationTime，除非父节点的childExpirationTime大于当前的
      // expirationTime,然后返回Fiber root节点
      var root = scheduleWorkToRoot(fiber, expirationTime);
      // root 为空报错
      if (root === null) {
        {
          switch (fiber.tag) {
            case ClassComponent:
              warnAboutUpdateOnUnmounted(fiber, true);
              break;
            case FunctionComponent:
            case ForwardRef:
            case MemoComponent:
            case SimpleMemoComponent:
              warnAboutUpdateOnUnmounted(fiber, false);
              break;
          }
        }
        return;
      }
      // 现在没有工作，不分render和commit，且有优先级比较低的任务在等待执行，如果当前的expirationTime
      // 更大，说明优先级更高，则打断当前节点，执行优先级更高的任务
      if (
        !isWorking &&
        nextRenderExpirationTime !== NoWork &&
        expirationTime > nextRenderExpirationTime
      ) {
        // This is an interruption. (Used for performance tracking.)
        interruptedBy = fiber;
        resetStack();
      }
      // 更新root的过期时间
      markPendingPriorityLevel(root, expirationTime);
      if (
        // If we're in the render phase, we don't need to schedule this root
        // for an update, because we'll do it before we exit...
        !isWorking ||
        isCommitting$1 ||
        // ...unless this is a different root than the one we're rendering.
        nextRoot !== root
      ) {
        var rootExpirationTime = root.expirationTime;
        requestWork(root, rootExpirationTime);
      }
      if (nestedUpdateCount > NESTED_UPDATE_LIMIT) {
        // subsequent 后来的
        // Reset this back to zero so subsequent updates don't throw.
        nestedUpdateCount = 0;
        invariant(
          false,
          "Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops."
        );
      }
    }
```

