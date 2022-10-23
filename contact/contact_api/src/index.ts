import { prisma } from '@poc/contact_database'
import type { Contact } from '@poc/contact_database'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { PORTS_MAP } from '@poc/ports-map'

type IContactByIdParam = Pick<Contact, 'id'>
type IContactByNameQuery = { search: string | null }
type IContactByIdBody = Omit<Contact, 'id'>

async function main() {
  const app = Fastify({ logger: true })
  await app.register(cors, {
    origin: '*',
  })

  app.post<{
    Body: {}
  }>(`/contacts`, async (req, res) => {
    const result = await prisma.contact.create({ data: {} })
    res.send(result)
  })

  app.put<{
    Params: IContactByIdParam
    Body: string
  }>(`/contacts/:id`, async (req, res) => {
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
  }>(`/contacts/:id`, async (req, res) => {
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
  }>('/contacts/:id', async (req, res) => {
    const { id } = req.params

    const contact = await prisma.contact.findUnique({
      where: { id: Number(id) },
    })

    res.send(contact)
  })

  await app.listen({ port: PORTS_MAP.CONTACT.DEV_API }, (err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`🚀 Contact Server ready at: http://localhost:${PORTS_MAP.CONTACT.DEV_API}`)
  })
}

try {
  main()
} catch (error) {
  prisma.$disconnect()
}
