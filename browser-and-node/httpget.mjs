// Based on examples from quickjs-emscripten's README
// console.log() :   https://github.com/justjake/quickjs-emscripten/tree/v0.29.1#exposing-apis
// resolvePromise(): https://github.com/justjake/quickjs-emscripten/tree/v0.29.1#contextresolvepromisehandle
import {getQuickJS} from 'quickjs-emscripten'

const QuickJS = await getQuickJS();
const vm = QuickJS.newContext();

const logHandle = vm.newFunction('log', (...args) => {
    const nativeArgs = args.map(vm.dump);
    console.log('QuickJS: ', ...nativeArgs);
})
const consoleHandle = vm.newObject();
vm.setProp(consoleHandle, 'log', logHandle);
vm.setProp(vm.global, 'console', consoleHandle);
consoleHandle.dispose();
logHandle.dispose();

const fetchHandle = vm.newFunction('fetch', (urlHandle) => {
    const url = vm.getString(urlHandle);
    const promise = vm.newPromise();

    fetch(url).then(res => res.text()).then(txt => promise.resolve(vm.newString(txt || '')));

    promise.settled.then(vm.runtime.executePendingJobs);
    return promise.handle;
})
fetchHandle.consume((handle) => vm.setProp(vm.global, 'fetch', handle));

const result = vm.evalCode(`(async () => {
  const txt = await fetch('https://httpbin.org/anything');
  console.log(txt);
})()`);
const promiseHandle = vm.unwrapResult(result);

await vm.resolvePromise(promiseHandle);

promiseHandle.dispose();
vm.dispose();
