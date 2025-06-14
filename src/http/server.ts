import 'reflect-metadata'
import 'dotenv/config'

import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'

import { AppDataSource } from '@/infra/data-source'

const app = fastify()

app.register(fastifyCors, { origin: '*' })

async function runServer() {
  await AppDataSource.initialize()

  app.listen({ port: 3333 }).then(() => {
    console.log('HTTP Server Running!')
  })
}

runServer()
