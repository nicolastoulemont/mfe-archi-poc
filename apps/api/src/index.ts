import { PrismaClient } from '@prisma/client'
import type { Contact } from '@prisma/client'
import fastify from 'fastify'

const prisma = new PrismaClient()
const app = fastify()

type IContactByIdParam = Pick<Contact, 'id'>
type IContactByNameQuery = { search: string | null }
type IContactByIdBody = Omit<Contact, 'id'>

app.post<{
  Body: {}
}>(`/contact`, async (req, res) => {
  const result = await prisma.contact.create({ data: {} })
  res.send(result)
})

app.put<{
  Body: IContactByIdBody
}>(`/contact`, async (req, res) => {
  const { first, last, avatar, twitter, favorite, notes } = req.body
  const result = await prisma.contact.create({
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

app.listen(
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
