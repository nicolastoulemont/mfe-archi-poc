import { FastifyInstance } from 'fastify'
import { $ref } from './account.schema'
import {
  signInHandler,
  signUpHandler,
  updateAccountByIdHandler,
  getAccountByIdHandler,
  deleteAccountByIdHandler,
} from './account.controller'

export async function accountRoutes(server: FastifyInstance) {
  server.post(
    '/signin',
    {
      schema: {
        body: $ref('signInInputSchema'),
        response: {
          200: $ref('signInResponseSchema'),
          401: $ref('unAuthorizedResponseSchema'),
        },
      },
    },
    signInHandler
  )

  server.post(
    '/signup',
    {
      schema: {
        body: $ref('signUpInputSchema'),
        response: {
          201: $ref('signUpResponseSchema'),
          401: $ref('unAuthorizedResponseSchema'),
        },
      },
    },
    signUpHandler
  )

  server.put(
    '/:id',
    {
      schema: {
        body: $ref('updateAccountByIdInputSchema'),
        response: {
          201: $ref('updateAccountByIdResponseSchema'),
          404: $ref('notFoundResponseSchema'),
        },
      },
    },
    updateAccountByIdHandler
  )

  server.delete(
    '/:id',
    {
      schema: {
        response: {
          200: $ref('deleteAccountByIdResponseSchema'),
          404: $ref('notFoundResponseSchema'),
        },
      },
    },
    deleteAccountByIdHandler
  )

  server.get(
    '/:id',
    {
      schema: {
        response: {
          200: $ref('getAccountByIdResponseSchema'),
          404: $ref('notFoundResponseSchema'),
        },
      },
    },
    getAccountByIdHandler
  )
}
