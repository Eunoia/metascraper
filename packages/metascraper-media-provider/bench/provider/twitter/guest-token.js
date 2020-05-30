'use strict'

const { createGuestToken } = require('../../../src/get-media/provider/twitter')
const { createProxiesPool } = require('../../../src/get-media/util')
const userAgent = require('ua-string')

const { proxies } = require('../../constants')

const proxyPool = createProxiesPool(proxies)
const getGuestToken = createGuestToken({ userAgent, proxyPool })

// When it reaches the max, it returns a 429 rate limit error
const mainLoop = async () => {
  let index = 0
  while (true) {
    try {
      const guestToken = await getGuestToken()
      console.log(++index, guestToken)
    } catch (err) {
      console.error('ERR', err)
    }
  }
}

mainLoop()
