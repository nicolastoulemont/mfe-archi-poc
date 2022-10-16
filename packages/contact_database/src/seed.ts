import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const accounts: Prisma.AccountCreateInput[] = [
  {
    email: 'a@a.com',
    password: 'password_a',
    roles: { create: [{ type: 'employee' }, { type: 'admin' }] },
  },
  {
    email: 'b@b.com',
    password: 'password_b',
    roles: { create: { type: 'employee' } },
  },
  {
    email: 'c@c.com',
    password: 'password_c',
    roles: { create: { type: 'admin' } },
  },
]

async function seed() {
  console.log(`Start seeding ...`)
  for (const account of accounts) {
    const acc = await prisma.account.create({
      data: account,
    })
    console.log(`Created contact with id: ${acc.id}`)
  }
  console.log(`Seeding finished.`)
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
