import { prisma } from '@poc/auth_database'
import { SignUpInput, SignInInput, UpdateAccountByIdInput, ByIdParam } from './account.schema'

export async function getAccountByEmail(body: SignInInput) {
  const { email } = body
  const account = await prisma.account.findUnique({
    where: { email },
    include: {
      roles: true,
    },
  })
  return account
}

export async function createAccount(body: SignUpInput) {
  const { email, password, roles } = body
  const account = await prisma.account.create({
    data: {
      email,
      password,
    },
  })

  // Required in this demo because Prisma doesn't support createMany ops with sqlite
  await Promise.all(
    roles.map(
      async ({ type }) =>
        await prisma.role.create({
          data: {
            accountId: account.id,
            type,
          },
        })
    )
  )
}

export async function updateAccountById(body: UpdateAccountByIdInput, params: ByIdParam) {
  const { id } = params
  const { email } = body
  const account = await prisma.account.update({
    where: { id },
    data: {
      email,
    },
  })
  return account
}

export async function deleteAccountById(params: ByIdParam) {
  const { id } = params
  await prisma.account.delete({
    where: {
      id,
    },
  })
}

export async function getAccountById(params: ByIdParam) {
  const { id } = params

  const account = await prisma.account.findUnique({
    where: { id },
    include: {
      roles: true,
    },
  })

  return account
}
