import { FastifyRequest, FastifyReply } from 'fastify'
import { SignInInput, SignUpInput, UpdateAccountByIdInput, ByIdParam } from './account.schema'
import {
  createAccount,
  deleteAccountById,
  getAccountByEmail,
  getAccountById,
  updateAccountById,
} from './account.service'

export async function signInHandler(req: FastifyRequest<{ Body: SignInInput }>, reply: FastifyReply) {
  const { password } = req.body
  const account = await getAccountByEmail(req.body)
  if (!account) {
    reply.status(401).send({ message: 'Invalid email or password' })
  }

  const match = password === account?.password
  if (!match) {
    reply.status(401).send({ message: 'Invalid email or password' })
  }

  reply.send(account)
}
export async function signUpHandler(req: FastifyRequest<{ Body: SignUpInput }>, reply: FastifyReply) {
  try {
    await createAccount(req.body)
    reply.send({ success: true })
  } catch (error) {
    console.error(error)
    reply.status(401).send({ message: 'Invalid email or password' })
  }
}

export async function updateAccountByIdHandler(
  req: FastifyRequest<{ Params: ByIdParam; Body: UpdateAccountByIdInput }>,
  reply: FastifyReply
) {
  try {
    const account = await updateAccountById(req.body, req.params)
    reply.send(account)
  } catch (error) {
    console.error(error)
    reply.status(404).send({ message: "Couldn't find the requested resource" })
  }
}

export async function deleteAccountByIdHandler(req: FastifyRequest<{ Params: ByIdParam }>, reply: FastifyReply) {
  try {
    await deleteAccountById(req.params)
    reply.send({ success: true })
  } catch (error) {
    console.error(error)
    reply.status(404).send({ message: "Couldn't find the requested resource" })
  }
}

export async function getAccountByIdHandler(req: FastifyRequest<{ Params: ByIdParam }>, reply: FastifyReply) {
  try {
    const account = await getAccountById(req.params)
    reply.send(account)
  } catch (error) {
    console.error(error)
    reply.status(404).send({ message: "Couldn't find the requested resource" })
  }
}
