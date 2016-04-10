#!/usr/bin/env node


'use strict'

const run = require('./countingSheep')

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