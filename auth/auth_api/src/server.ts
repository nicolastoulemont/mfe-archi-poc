import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import cors from '@fastify/cors'
import fjwt from '@fastify/jwt'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { withRefResolver } from 'fastify-zod'
import { accountRoutes } from './modules/account/account.route'
import { accountSchemas, signInResponseSchema } from './modules/account/account.schema'
import { version } from '../package.json'
import { generateMock } from '@anatine/zod-mock'

export function buildServer() {
  const server = fastify()

  server.register(cors, {
    origin: '*',
  })

  server.register(fjwt, { secret: process.env.JWT_SECRET as string })

  server.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      await request.jwtVerify()
    } catch (e) {
      return reply.send(e)
    }
  })

  server.addHook('preHandler', (req, _, next) => {
    // @ts-ignore Cannot reconcile types
    req.jwt = server.jwt
    return next()
  })

  for (const schema of accountSchemas) {
    server.addSchema(schema)
  }

  server.get('/healthcheck', async () => {
    return { status: 'OK' }
  })

  server.register(
    swagger,
    withRefResolver({
      exposeRoute: true,
      openapi: {
        info: {
          title: 'Auth API',
          description: 'PoC authentication api',
          version,
        },
      },
    })
  )

  server.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    staticCSP: true,
  })

  server.register(accountRoutes, { prefix: 'api/v1/accounts' })

  return server
}
