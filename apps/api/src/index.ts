import { PrismaClient } from '@prisma/client'
import type { Contact } from '@prisma/client'
import fastify from 'fastify'
import cors from '@fastify/cors'

const prisma = new PrismaClient()
const app = fastify()

type IContactByIdParam = Pick<Contact, 'id'>
type IContactByNameQuery = { search: string | null }
type IContactByIdBody = Omit<Contact, 'id'>

async function main() {
  // const app = fastify()
  await app.register(cors, {
    origin: '*',
  })

  app.post<{
    Body: {}
  }>(`/contact`, async (req, res) => {
    const result = await prisma.contact.create({ data: {} })
    res.send(result)
  })

  app.put<{
    Params: IContactByIdParam
    Body: string
  }>(`/contact/:id`, async (req, res) => {
    const { id } = req.params
    const { first, last, avatar, twitter, favorite, notes } = JSON.parse(req.body) as IContactByIdBody
    const result = await prisma.contact.update({
      where: { id: Number(id) },
      data: {
        first,
        last,
        avatar,
        twitter,
        favorite,
        notes,
      },
    })
    res.send(result)
  })

  app.delete<{
    Params: IContactByIdParam
  }>(`/contact/:id`, async (req, res) => {
    const { id } = req.params
    const contact = await prisma.contact.delete({
      where: {
        id: Number(id),
      },
    })
    res.send(contact)
  })

  app.get('/contacts', async (req, res) => {
    const query: IContactByNameQuery = (req.query as IContactByNameQuery) ?? { search: '' }
    const contacts = await prisma.contact.findMany(
      query.search
        ? { where: { OR: [{ first: { contains: query.search } }, { last: { contains: query.search } }] } }
        : undefined
    )
    res.send(contacts)
  })

  app.get<{
    Params: IContactByIdParam
  }>('/contact/:id', async (req, res) => {
    const { id } = req.params

    const contact = await prisma.contact.findUnique({
      where: { id: Number(id) },
    })

    res.send(contact)
  })

  await app.listen(
    {
      port: 3000,
    },
    (err) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log(`🚀 Server ready at: http://localhost:3000`)
    }
  )
}

try {
  main()
} catch (error) {
  prisma.$disconnect()
}
