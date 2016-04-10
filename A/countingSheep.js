'use strict'

const _ = require('lodash')
let seen

const appendSeen = (num) =>
    num.toString()
        .split('')
        .map(n => parseInt(n, 10))
        .map(n => {
            seen[n] = 1
        })

const isAllSeen = (seen) =>
    _.reduce(seen, (acc, el, i) => {
        if (acc && !el) {
            acc = false
        }
        return acc
    }, true)

const next = (currNum, i) => {
    appendSeen(currNum)
    return isAllSeen(seen);

}

const countSheeps = (startNum) => {
    let i = 0
    let currNum = i * startNum
    seen = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0
    }

    // todo: iterator?
    do {
        currNum = startNum * (i + 1)
        i += 1
    } while ((!next(currNum, i) && i < 10000))

    if (i === 10000) {
        return 'INSOMNIA'
    } else {
        return currNum
    }
}

module.exports = countSheeps
