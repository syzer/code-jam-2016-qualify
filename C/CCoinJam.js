#!/usr/bin/env node
'use strict'

const bases = [2, 3, 4, 5, 6, 7, 8, 9, 10]

// smallest prime that divides n
const leastFactor = (n) => {
    if (isNaN(n) || !isFinite(n)) return NaN
    if (n == 0) return 0;
    if (n % 1 || n * n < 2) return 1;
    if (n % 2 == 0) return 2
    if (n % 3 == 0) return 3
    if (n % 5 == 0) return 5
    var m = Math.sqrt(n)
    for (var i = 7; i <= m; i += 30) {
        if (n % i == 0)      return i
        if (n % (i + 4) == 0)  return i + 4
        if (n % (i + 6) == 0)  return i + 6
        if (n % (i + 10) == 0) return i + 10
        if (n % (i + 12) == 0) return i + 12
        if (n % (i + 16) == 0) return i + 16
        if (n % (i + 22) == 0) return i + 22
        if (n % (i + 24) == 0) return i + 24
    }
    return n
}

// from lib
function memoize(func) {
    var memo = {};
    var slice = Array.prototype.slice;

    return function () {
        var args = slice.call(arguments);

        if (args in memo)
            return memo[args];
        else
            return (memo[args] = func.apply(this, args));

    }
}

const isPrime = (n) => {
    if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) return false
    return n == leastFactor(n)
}

const isPrimeFast = memoize(isPrime)

const isPrimeOnSomeBases = (str) => bases.find(base =>
    isPrimeFast(parseInt(str, base))
)

// //TODO make it work above 32
const combinations = (n, max) => {
    if (n == 32) {
        return require('./combinations')
    }
    var arr = [];
    for (var i = 0; i < Math.pow(2, n); i++) {
        var c = ''
        for (var j = 0; j < n; j++) {
            c += (i & (1 << j) ? '1' : '0')
        }
        if (c[0] == '1' && c[c.length - 1] == '1') {
            if (!isPrimeOnSomeBases(c)) {
                arr.push(c)
                if (arr.length === max) {
                    return arr
                }
            }
        }
    }
    return arr
}

const genFactors = (str) => {
    const nums = []

    bases.forEach((base, bi) => {
        let n = parseInt(str, bases[bi])

        for (let i = 2; i < n; i++) {
            if (!(n % i) && i !== n) {
                if (!nums.find(n => n === i)) {
                    nums.push(i)
                    return
                }
                if (n / i !== i && n / i !== n) {
                    if (!nums.find(n => n === n / i)) {
                        nums.push(n / i)
                        return
                    }
                }
            }
        }
    })

    return nums
}

// js is crazy
const toFixed2 = (x) => {
    var e = parseInt(x.toString().split('+')[1], 10)
    if (e > 20) {
        e -= 20
        x /= Math.pow(10, e)
        x += (new Array(e + 1)).join('0')
    }
    return x
}

const coinJam = (str) => {
    const input = str.split(' ').map(n => parseInt(n, 10))
    const n = input[0]
    const j = input[1]

    let nums = combinations(n, j)
    const dividers = nums.map(genFactors).map(el => el.map(toFixed2))

    return nums.map((n, ni) =>
        `${n} ${dividers[ni].join(' ')}`
    ).join('\n')
}

const run = coinJam

const processStream = (inStream) => {
    const readline = require('readline'),
        outStream = new (require('stream'))(),
        rl = readline.createInterface(inStream, outStream)

    // skip first line
    let i = -1
    rl.on('line', line => {
        i++
        if (!i) return
        console.log(`Case #${i}:\n${run(line)}`)
    })
}
processStream(process.stdin)