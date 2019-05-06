# React fiber 中expirationTime 的计算

## expirationTime <a id="expirationtime-&#x516C;&#x5F0F;"></a>

这里是计算react fiber的过期时间，其实很简单，就是根据当前的操作，计算出来一个过期时间，唯一有点不同的就是这里会根据事件的优先级让在同一时间段内获得的过期时间是一致的，比如低优先级的25ms内，获得的过期时间是一致的，比如`10002 - 10026`之间，最终得到的结果都是`10525`，但是到了`10027`的到的结果就是`10550`，这就是除以`25`取整的效果。

## currentTime <a id="currenttime"></a>

```javascript
function requestCurrentTime() {
  // requestCurrentTime is called by the scheduler to compute an expiration
  // time.
  // simultaneous 同时
  // 同一事件触发的更新设置同样的过期时间
  // Expiration times are computed by adding to the current time (the start
  // time). However, if two updates are scheduled within the same event, we
  // should treat their start times as simultaneous, even if the actual clock
  // time has advanced between the first and second call.
  // 同一优先级的事件获取同样的过期时间
  // In other words, because expiration times determine how updates are batched,
  // we want all updates of like priority that occur within the same event to
  // receive the same expiration time. Otherwise we get tearing.
  //
  // currentRenderTime 用来提高性能，不用每次都去调用performance.now，currentschedulerTime用来记录scheduler 时间
  // We keep track of two separate times: the current "renderer" time and the
  // current "scheduler" time. The renderer time can be updated whenever; it
  // only exists to minimize the calls performance.now.
  //
  // But the scheduler time can only be updated if there's no pending work, or
  // if we know for certain that we're not in the middle of an event.

  // isRendering 不管是在协调阶段还是commit阶段，都会为true， 也就是说在所有的过期时间都是基于同一固定的时间
  if (isRendering) {
    // We're already rendering. Return the most recently read time.
    // 在render的时候，返回安排的时间
    return currentSchedulerTime;
  }
  // Check if there's pending work.
  findHighestPriorityRoot();
  // findHighestPriorityRoot 设置了 nextFlushedExpirationTime = 0
  if (
    nextFlushedExpirationTime === NoWork ||
    nextFlushedExpirationTime === Never
  ) {
    // If there's no pending work, or if the pending work is offscreen, we can
    // read the current time without risk of tearing.
    recomputeCurrentRendererTime();
    currentSchedulerTime = currentRendererTime;
    return currentSchedulerTime;
  }
  // There's already pending work. We might be in the middle of a browser
  // event. If we were to read the current time, it could cause multiple updates
  // within the same event to receive different expiration times, leading to
  // tearing. Return the last read time. During the next idle callback, the
  // time will be updated.
  return currentSchedulerTime;
}
```

如果在rendering阶段，直接返回currentSchedulerTime，如果没有pending work或者其他的直接返回当前的时间，如果有pending work 则直接返回currentScheduleTime。

## React fiber 中各种不同的时间含义

### childExpirationTime

这个时间是由节点本身产生的，然后不断冒泡到根节点，更新每个父节点上的childExpirationTime

### earliestPendingTime，lastestPedingTime

这两个很简单，就是在根节点上记录子树的所有最早的过期时间和最晚的过期时间，用来记录一下过期时间的过期时间（过期时间越小，说明优先级越高）

### earliestSuspendedTime, lastestSuspendedTime

Fiber node因为各种原因，需要挂起的最早时间和最晚时间，

#### lastestPingedTime <a id="lastestpingedtime"></a>

















