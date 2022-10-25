require('dotenv').config()

import { prisma } from '@poc/auth_database'
import { PORTS_MAP } from '@poc/ports-map'
import { buildServer } from './server'

const server = buildServer()

async function main() {
  try {
    server.listen({ port: PORTS_MAP.AUTH.DEV_API }, (err) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log(`🚀 Auth server ready at: http://localhost:${PORTS_MAP.AUTH.DEV_API}`)
    })
  } catch (error) {
    prisma.$disconnect()
  }
}

main()
