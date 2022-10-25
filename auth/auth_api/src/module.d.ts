import { JWT } from '@fastify/jwt'

export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string
    }
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT
  }
  export interface FastifyInstance {
    authenticate: any
  }
}

declare module 'fastify-jwt' {
  interface FastifyJWT {
    user: {
      id: number
    }
  }
}
