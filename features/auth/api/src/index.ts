import { PrismaClient, Role } from '@prisma/client'
import type { Account } from '@prisma/client'
import fastify from 'fastify'
import cors from '@fastify/cors'

const prisma = new PrismaClient()

export type AccountEntity = Account
export type AccountWithRole = Account & {
  roles: Role[]
}

export type IAccountByIdParam = Pick<Account, 'id'>
export type IAccountByIdBody = Omit<Account, 'id'>

async function main() {
  const app = fastify()
  await app.register(cors, {
    origin: '*',
  })

  app.post<{
    Body: string
  }>(`/signin`, async (req, res) => {
    const { email, password } = JSON.parse(req.body) as IAccountByIdBody
    const account = await prisma.account.findUnique({
      where: { email },
      include: {
        roles: true,
      },
    })
    if (!account) {
      res.status(401).send({ message: 'Invalid email or password' })
    }

    const match = password === account?.password
    if (!match) {
      res.status(401).send({ message: 'Invalid email or password' })
    }

    res.send(account)
  })

  app.post<{
    Body: string
  }>(`/signup`, async (req, res) => {
    const { email, password, role } = JSON.parse(req.body) as IAccountByIdBody & { role: string }
    try {
      const account = await prisma.account.create({
        data: {
          email,
          password,
          roles: {
            create: {
              type: role,
            },
          },
        },
        include: {
          roles: true,
        },
      })
      res.send(account)
    } catch (error) {
      console.error(error)
      res.status(401).send({ message: 'Invalid email or password' })
    }
  })

  app.put<{
    Params: IAccountByIdParam
    Body: string
  }>(`/account/:id`, async (req, res) => {
    const { id } = req.params
    const { email, password } = JSON.parse(req.body) as IAccountByIdBody
    const account = await prisma.account.update({
      where: { id },
      data: {
        email,
        password,
      },
    })
    res.send(account)
  })

  app.delete<{
    Params: IAccountByIdParam
  }>(`/account/:id`, async (req, res) => {
    const { id } = req.params
    const account = await prisma.account.delete({
      where: {
        id,
      },
    })
    res.send(account)
  })

  app.get<{
    Params: IAccountByIdParam
  }>('/account/:id', async (req, res) => {
    const { id } = req.params

    const account = await prisma.account.findUnique({
      where: { id },
      include: {
        roles: true,
      },
    })
    res.send(account)
  })

  const port = 3002

  await app.listen({ port }, (err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`🚀 Auth server ready at: http://localhost:${port}`)
  })
}

try {
  main()
} catch (error) {
  prisma.$disconnect()
}
