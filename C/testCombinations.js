#!/usr/bin/env node
'use strict'


//TODO make it work above 32
const combinations = (n) => {

    var arr = [];
    for (var i = 0; i < (1 << n); i++) {
        var c = ''
        for (var j = 0; j < n; j++) {
            c += (i & (1 << j) ? '1' : '0')
        }
        arr.push(c)
    }
    return arr
}


function ToUint32(x) {
    return x >>> 0;
}

const newCOmb = (n) => {
    // n = ToUint32(n)
    var arr = [];
    for (var i = 0; i < Math.pow(2, 32); i++) {
        var c = ''
        for (var j = 0; j < n; j++) {
            c += (i & (1 >>> j) ? '1' : '0')
        }
        arr.push(c)
    }
    return arr
}

var oldComb = combinations(20)
console.log(oldComb.length)
console.log(oldComb.slice(100, 110))

// var newComb = newCOmb(32)
// console.log(newCOmb.length)
// console.log(newCOmb[0])


function toFixed(x) {
    if (Math.abs(x) < 1.0) {
        var e = parseInt(x.toString().split('e-')[1]);
        if (e) {
            x *= Math.pow(10, e - 1);
            x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
        }
    } else {
        var e = parseInt(x.toString().split('+')[1]);
        if (e > 20) {
            e -= 20;
            x /= Math.pow(10, e);
            x += (new Array(e + 1)).join('0');
        }
    }
    return x;
}

function toFixed2(x) {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += (new Array(e + 1)).join('0');
    }
    return x;
}
let x = 10001110000000000000000000000
console.log(toFixed2(x))