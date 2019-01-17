# vue-ieow
Small util function used to wait for a property to have a value, if the prop doesn't have this value yet.
# install
```
npm i https://github.com/tartinesKiller/vue-ieow
```
Then in your main.js:
```js
import VueIeow from "vue-ieow";
Vue.use(VueIeow);
```
# usage
If you want to call a method when a property changes, but also want to check if that property doesn't already have this value, without vue-ieow:
```js
created () {
    if (this.$store.getters.deviceReady) {
        this.doStuff();
    }
},
watch: {
    "$store.getters.deviceReady" (newVal) {
        if (newVal) {
            this.doStuff();
        }
    }
}
```
With vue-ieow:
```js
async created () {
    // the next line will check if $store.getters.deviceReady is true.
    // if it is not the case, it will watch changes on the property,
    // and resolve if it is equal to the awaited value.
    await this.$ieow("$store.getters.deviceReady", true);
    this.doStuff();
},
```
