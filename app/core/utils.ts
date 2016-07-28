/**
 * small debounce function
 * pulled from -> https://davidwalsh.name/javascript-debounce-function
 * @param func
 * @param wait
 * @param immediate
 * @return {()=>undefined}
 */

export function debounce(func: Function, wait: Number, immediate: boolean = false) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * guid generator
 * @returns {Function}
 */
export function guid() {
    // Use crypto if available and fallback to Math.random
    let hasCrypto = (typeof(window.crypto) != 'undefined' && typeof(window.crypto.getRandomValues) != 'undefined');
    if(hasCrypto) {
        return function() {
            let buf = new Uint16Array(8);
            window.crypto.getRandomValues(buf);
            let S4 = function(num) {
                let ret = num.toString(16);
                while(ret.length < 4){
                    ret = "0"+ret;
                }
                return ret;
            };
            return (S4(buf[0])+S4(buf[1])+"-"+S4(buf[2])+"-"+S4(buf[3])+"-"+S4(buf[4])+"-"+S4(buf[5])+S4(buf[6])+S4(buf[7]));
        };
    } else {
        // Otherwise, just use Math.random
        return function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        };
    }
}