// Throttle function for actions
export default function throttle(func, ms) {

    var isThrottled = false,
            savedArgs,
            savedThis;

    function wrapper() {

        var arg = arguments        

        if (isThrottled) {
            savedArgs = arg;
            savedThis = this;
            return;
        }

        isThrottled = true;            

        setTimeout(function () {
            isThrottled = false;
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);

        func.apply(this, arg);

    }

    return wrapper;

}