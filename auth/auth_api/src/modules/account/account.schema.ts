import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

import { AccountModel, RoleModel } from '../../generated_schemas'

/**
 * Shared
 */
export const accountWithRolesSchema = AccountModel.omit({ password: true }).extend({
  roles: z.array(RoleModel),
})
export type AccountWithRoles = z.infer<typeof accountWithRolesSchema>

export type ByIdParam = {
  id: string
}

/**
 * SignIn
 */
const signInInputSchema = AccountModel.omit({ id: true })
export type SignInInput = z.infer<typeof signInInputSchema>
export const signInResponseSchema = accountWithRolesSchema

/**
 * SignUp
 */
const roleTypeUnionSchema = z.union([z.literal('employee'), z.literal('admin')])

const signUpInputSchema = signInInputSchema.extend({
  roles: z.array(z.object({ type: roleTypeUnionSchema })),
})
export type SignUpInput = z.infer<typeof signUpInputSchema>

export const signUpResponseSchema = z.object({ success: z.boolean() })

/**
 * Update account
 */
const updateAccountByIdInputSchema = AccountModel.omit({ id: true, password: true })
export type UpdateAccountByIdInput = z.infer<typeof updateAccountByIdInputSchema>
export const updateAccountByIdResponseSchema = AccountModel.omit({ password: true })

/**
 * Delete account
 */

export const deleteAccountByIdResponseSchema = z.object({ success: z.boolean() })

export const { schemas: accountSchemas, $ref } = buildJsonSchemas({
  signInInputSchema,
  signInResponseSchema,
  signUpInputSchema,
  signUpResponseSchema: signUpResponseSchema,
  updateAccountByIdInputSchema,
  updateAccountByIdResponseSchema,
  deleteAccountByIdResponseSchema,
  getAccountByIdResponseSchema: accountWithRolesSchema,
})
