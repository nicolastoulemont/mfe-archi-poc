import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.ContactCreateInput[] = [
  {
    first: 'Nicolas',
    last: 'Toulemont',
    avatar: 'https://avatars.githubusercontent.com/u/40027895?v=4',
    twitter: '@NicoToulemont',
    favorite: false,
    notes: 'Engineer',
  },
  {
    first: 'Cyril',
    last: 'Lopez',
    avatar: 'https://avatars.githubusercontent.com/u/13311463?v=4',
    twitter: '@soupette',
    favorite: false,
    notes: 'Engineer',
  },
  {
    first: 'Yann',
    last: 'Isabel',
    avatar: 'https://avatars.githubusercontent.com/u/19928886?v=4',
    twitter: '@yann_isabel',
    favorite: false,
    notes: 'Engineer',
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.contact.create({
      data: u,
    })
    console.log(`Created contact with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
