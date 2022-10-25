import * as z from "zod"
import { CompleteRole, RelatedRoleModel } from "./index"

export const AccountModel = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  password: z.string(),
})

export interface CompleteAccount extends z.infer<typeof AccountModel> {
  roles: CompleteRole[]
}

/**
 * RelatedAccountModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAccountModel: z.ZodSchema<CompleteAccount> = z.lazy(() => AccountModel.extend({
  roles: RelatedRoleModel.array(),
}))
