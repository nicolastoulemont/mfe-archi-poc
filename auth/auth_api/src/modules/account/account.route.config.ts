import { FastifySchema } from 'fastify'
import { $ref } from './account.schema'

type RouteConfig = {
  path: string
  options: {
    schema: FastifySchema
  }
}

export const signInRouteConfig: RouteConfig = {
  path: '/signin',
  options: {
    schema: {
      body: $ref('signInInputSchema'),
      response: {
        200: $ref('signInResponseSchema'),
      },
    },
  },
}

export const signUpRouteConfig: RouteConfig = {
  path: '/signup',
  options: {
    schema: {
      body: $ref('signUpInputSchema'),
      response: {
        201: $ref('signUpResponseSchema'),
      },
    },
  },
}

export const updateAccountByIdRouteConfig: RouteConfig = {
  path: '/:id',
  options: {
    schema: {
      body: $ref('updateAccountByIdInputSchema'),
      response: {
        201: $ref('updateAccountByIdResponseSchema'),
      },
    },
  },
}

export const deleteAccountByIdRouteConfig: RouteConfig = {
  path: '/:id',
  options: {
    schema: {
      response: {
        200: $ref('deleteAccountByIdResponseSchema'),
      },
    },
  },
}

export const getAccountByIdRouteConfig: RouteConfig = {
  path: '/:id',
  options: {
    schema: {
      response: {
        200: $ref('getAccountByIdResponseSchema'),
      },
    },
  },
}
