import { PrismaClient } from '@prisma/client'
import type { Account } from '@prisma/client'
import fastify from 'fastify'
import cors from '@fastify/cors'

const prisma = new PrismaClient()

type IAccountByIdParam = Pick<Account, 'id'>
type IAccountByIdBody = Omit<Account, 'id'>

async function main() {
  const app = fastify()
  await app.register(cors, {
    origin: '*',
  })

  app.post<{
    Body: string
  }>(`/signin`, async (req, res) => {
    const { email, password } = JSON.parse(req.body) as IAccountByIdBody
    const account = await prisma.account.findUnique({ where: { email } })
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
    const { email, password } = JSON.parse(req.body) as IAccountByIdBody
    try {
      const result = await prisma.account.create({ data: { email, password } })
      res.send(result)
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
    const result = await prisma.account.update({
      where: { id },
      data: {
        email,
        password,
      },
    })
    res.send(result)
  })

  app.delete<{
    Params: IAccountByIdParam
  }>(`/contact/:id`, async (req, res) => {
    const { id } = req.params
    const contact = await prisma.account.delete({
      where: {
        id,
      },
    })
    res.send(contact)
  })

  app.get<{
    Params: IAccountByIdParam
  }>('/contact/:id', async (req, res) => {
    const { id } = req.params

    const contact = await prisma.account.findUnique({
      where: { id },
      include: {
        roles: true,
      },
    })

    res.send(contact)
  })

  const port = 3001

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
