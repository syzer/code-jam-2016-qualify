#!/usr/bin/env node
'use strict'

const countFlips = (str) => {
    const stack = str.split('')
    const flips = stack.reduce((acc, curr, i, arr) => {
        if (acc.l != curr) {
            acc.c = acc.c + 1
        }
        acc.l = curr
        return acc
    }, {
        c: 0,
        l: stack[0]
    })

    if (flips.l === '-') {
        return flips.c + 1
    }
    return flips.c
}

const run = countFlips

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

processStream(process.stdin)