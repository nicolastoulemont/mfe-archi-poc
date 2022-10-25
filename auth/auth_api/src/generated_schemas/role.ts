import * as z from "zod"
import { CompleteAccount, RelatedAccountModel } from "./index"

export const RoleModel = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  accountId: z.string().uuid(),
  type: z.string(),
})

export interface CompleteRole extends z.infer<typeof RoleModel> {
  account: CompleteAccount
}

/**
 * RelatedRoleModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRoleModel: z.ZodSchema<CompleteRole> = z.lazy(() => RoleModel.extend({
  account: RelatedAccountModel,
}))
