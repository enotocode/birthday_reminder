// Throttle function for actions
export default function throttle(func, ms) {

    var isThrottled = false,
            savedArgs,
            savedThis;

    function wrapper() {

        var arg = arguments
        
        // Hello, Thunk middleware
        return function (dispatch) {
            
            if (isThrottled) {
                savedArgs = arg;
                savedThis = this;
                return;
            }

            isThrottled = true;            

            setTimeout(function () {
                isThrottled = false;
                if (savedArgs) {
                    dispatch(wrapper.apply(savedThis, savedArgs));
                    savedArgs = savedThis = null;
                }
            }, ms);

            dispatch(func.apply(this, arg));
        }
    }

    return wrapper;

}