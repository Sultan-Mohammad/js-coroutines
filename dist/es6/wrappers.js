import run from "./coroutines";

export function yielding(fn, frequency = 8) {
  let yieldCount = 0;
  return function* (...params) {
    let result = fn(...params);
    if (yieldCount++ % frequency === 0) {
      yield;
    }
    return result;
  };
}

export function wrapAsPromise(coroutine) {
  return function (...params) {
    return run(function* () {
      return yield* coroutine(...params);
    });
  };
}
