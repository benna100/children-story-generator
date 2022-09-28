import express from 'express'
import { createServer as createViteServer } from 'vite'

// Or use require if nodejs complains about ES module
// const express = require('express')
// const { createServer: createViteServer } = require('vite')

async function createServer() {
  const app = express()

  // Create Vite server in middleware mode.
  const vite = await createViteServer({
    server: { middlewareMode: 'html'},
  })

  // Do not serve built index.html when visiting http://localhost:3000/
  app.use(express.static('dist', { index: false }))

  // Use vite's connect instance as middleware
  app.use(vite.middlewares)

  app.listen(5151)
}

createServer()