#!/usr/bin/env node
'use strict'

const gcd = (a, b) => {
    if (!b) {
        return a
    }
    return gcd(b, a % b)
}

// TODO memoize
const isPrimeFast = function (n) {
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
    if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) return false
    return n == leastFactor(n)
}

const isPrime = (value) => {
    for (var i = 2; i < value; i++) {
        if (value % i === 0) {
            return false
        }
    }
    return value > 1
}

const genPrimes = (maxNum) => {
    var arr = [2, 3]
    for (var i = 5; i <= maxNum; i += 2) {
        if (arr.every(p => i % p)) {
            arr.push(i)
        }
    }
    return arr
}

const factors = (num) => {
    let arr = []

    for (let i = 1; i <= Math.floor(Math.sqrt(num)); i += 1) {
        if (num % i === 0) {
            arr.push(i)
            if (num / i !== i)
                arr.push(num / i)
        }
    }
    return arr.sort((a, b) => a - b)
}

// console.log(factors(10))

const uniqueFactors = (num, base, memoFactors) => {
    // todo maybe get first feee and if ocupied => gcd
    let i = 2; // we dont want 1
    do {
        // if (num % i === 0 && !memoFactors[i]) {
        if (num % i === 0) {
            memoFactors[i] = base
            // TODO check here
            // if (num / i !== i && !memoFactors[num / i])
            if (num / i !== i)
                memoFactors[num / i] = base
        }
        i += 1
    } while (i < Math.floor(Math.sqrt(num)))
}

let memo = {}
uniqueFactors(10, 10, memo)
console.log(memo)
console.log(factors(10))

const bases = [2, 3, 4, 5, 6, 7, 8, 9, 10]

const getCandidNumber = (arr, start) => {
    let candidNum = Object.assign([], arr)
    for (let i = start; i < arr.length - 1; i++) {
        if (i !== 0) {
            candidNum[arr.length - i - 1] = 0
        }

        let candidStr = candidNum.join('')

        let isPrimeOnSomeBases = bases.find(base =>
            isPrimeFast(parseInt(candidStr, base))
        )
        if (!isPrimeOnSomeBases) {
            return candidStr
        }
    }
    return 'TODO'
}

const firstUniqueBaseDivider = (arr) => {
    return bases.map(b => {
        for (let k in arr) {
            if (arr[k] == b && b != k) {
                return k
            }
        }
        return 'X' + b
    })
}

// TODO it's overkill, no need to iterate all
const getAllDividers = (str) => {
    let memoFactors = {}

    bases.map(base => uniqueFactors(parseInt(str, base), base, memoFactors))

    return firstUniqueBaseDivider(memoFactors).join(' ')
}

const coinJam = (str) => {
    const input = str.split(' ').map(n => parseInt(n, 10))
    const n = input[0]
    const j = input[1]
    const numArr = Array.from({length: n}, x=>1)
    let nums = []
    let i = 0

    do {
        nums.push(getCandidNumber(numArr, i))
        i++
        // } while (nums.length < j)
    } while (nums.length < j)
    // TODO

    const dividers = nums.map(getAllDividers)
    console.log('dividers', dividers)
    return nums
}

const run = coinJam
// N = 16.
// J = 50.
// console.log(run('6 3'))

const processStream = (inStream) => {
    const readline = require('readline'),
        outStream = new (require('stream'))(),
        rl = readline.createInterface(inStream, outStream)

    // skip first line
    let i = -1
    rl.on('line', line => {
        i++
        if (!i) return
        console.log(`Case #${i}: ${run(line)}`)
    })
}

// processStream(process.stdin)

const genFactorials = (str, bases) => {
    let nums = []

    bases.map((base, bi) => {
        let num = parseInt(str, bases[bi])
        // console.log('num,base',num, bases[bi])
        // for (let i = 2; i < Math.floor(Math.sqrt(num)); i++) {
        for (let i = 2; i < num; i++) {
            if (num % i === 0 && i !== num) {
                if (!nums.find(n => n === i)) {
                    // console.log('i, base', i, bases[bi])
                    nums.push(i)
                    return;
                }
            }
        }
    })

    return nums;
}
const out = genFactorials('111111', bases)
console.log('nums', out)

var testLine = '1000100100000001 3 2 5 15283398438 7 2374772300744 11730992933547 102961278100490 142871442857143'
var testLine = '1111010000000001 5 2 3 19047851563 17 2768398677825 8040393526477 115797853349411 370336666666667'


const checkFactorials = (str) => {
    var arr = str.split(' ')
    var binaryStr = arr.shift()

    var nums = arr.map(el => parseInt(el, 10))

    var tests = nums.find((n, i) =>
        parseInt(binaryStr, bases[i]) % n !== 0
    )
    return !tests
}

console.log(checkFactorials(testLine))