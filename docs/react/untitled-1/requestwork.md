# requestwork



```javascript
// requestWork is called by the scheduler whenever a root receives an update.
    // It's up to the renderer to call renderRoot at some point in the future.
    function requestWork(root, expirationTime) {
      // 确定更新哪个root
      addRootToSchedule(root, expirationTime);
      if (isRendering) {
        // Prevent reentrancy. Remaining work will be scheduled at the end of
        // the currently rendering batch.
        return;
      }
      // 涉及事件系统，暂时不起作用
      if (isBatchingUpdates) {
        // Flush work at the end of the batch.
        if (isUnbatchingUpdates) {
          // ...unless we're inside unbatchedUpdates, in which case we should
          // flush it now.
          nextFlushedRoot = root;
          nextFlushedExpirationTime = Sync;
          performWorkOnRoot(root, Sync, false);
        }
        return;
      }

      // TODO: Get rid of Sync and use current time?
      if (expirationTime === Sync) {
        performSyncWork();
      } else {
        scheduleCallbackWithExpirationTime(root, expirationTime);
      }
    }
```

