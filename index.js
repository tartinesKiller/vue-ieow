export default {
    install: function (Vue) {
        Vue.prototype.$ieow = ieow;
    },
};

const ieow = async function (path, awaitedValue) {
    return new Promise((resolve, reject) => {
        const curValue = resolvePath(path, this);
        // if prop have already awaited value, resolve
        if (curValue === awaitedValue) {
            console.log(`${path} have already the awaited value, resolving`);
            resolve();
        } else { // if not, wait for the value to change
            console.log(`${path} does not have awaited value yet, will wait`);
            const unwatch = this.$watch(path, newVal => {
                if (newVal === awaitedValue) {
                    console.log(`${path} have awaited value, resolving and unwatch`);
                    unwatch();
                    resolve();
                }
            });
        }
    });
};

function resolvePath (path, obj = self, separator = ".") {
    var properties = Array.isArray(path) ? path : path.split(separator);
    return properties.reduce((prev, curr) => prev && prev[curr], obj);
}
