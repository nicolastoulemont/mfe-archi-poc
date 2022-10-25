import { FastifyInstance } from 'fastify'
import {
  signInHandler,
  signUpHandler,
  updateAccountByIdHandler,
  getAccountByIdHandler,
  deleteAccountByIdHandler,
} from './account.controller'
import {
  deleteAccountByIdRouteConfig,
  getAccountByIdRouteConfig,
  signInRouteConfig,
  signUpRouteConfig,
  updateAccountByIdRouteConfig,
} from './account.route.config'

export async function accountRoutes(server: FastifyInstance) {
  server.post(signInRouteConfig.path, signInRouteConfig.options, signInHandler)

  server.post(signUpRouteConfig.path, signInRouteConfig.options, signUpHandler)

  server.put(updateAccountByIdRouteConfig.path, updateAccountByIdRouteConfig.options, updateAccountByIdHandler)

  server.delete(deleteAccountByIdRouteConfig.path, deleteAccountByIdRouteConfig.options, deleteAccountByIdHandler)

  server.get(getAccountByIdRouteConfig.path, getAccountByIdRouteConfig.options, getAccountByIdHandler)
}
