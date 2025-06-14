import 'reflect-metadata'
import 'dotenv/config'

import fs from 'node:fs/promises'
import path from 'node:path'

import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'

import { AppDataSource } from '@/infra/data-source'

import { routes } from './routes'

const app = fastify()

app.register(fastifyCors, { origin: '*' })

app.register(routes, { prefix: '/api' })

async function registerHandlers() {
  const handlersDir = path.join(__dirname, '..', 'events', 'handlers')
  const files = await fs.readdir(handlersDir)

  for (const file of files) {
    if (file.endsWith('.ts')) {
      const handlerModule = await import(path.join(handlersDir, file))

      if (typeof handlerModule.register === 'function') {
        handlerModule.register()
      }
    }
  }
}

async function runServer() {
  await registerHandlers()

  await AppDataSource.initialize()

  app.listen({ port: 3333 }).then(() => {
    console.log('HTTP Server Running!')
  })
}

runServer()
