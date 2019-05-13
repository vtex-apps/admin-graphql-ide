"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function subscribeAndCount(done, observable, cb) {
    var handleCount = 0;
    var subscription = observable.subscribe({
        next: function (result) {
            try {
                handleCount++;
                cb(handleCount, result);
            }
            catch (e) {
                setImmediate(function () {
                    subscription.unsubscribe();
                    done.fail(e);
                });
            }
        },
        error: done.fail,
    });
    return subscription;
}
exports.default = subscribeAndCount;
//# sourceMappingURL=subscribeAndCount.js.map