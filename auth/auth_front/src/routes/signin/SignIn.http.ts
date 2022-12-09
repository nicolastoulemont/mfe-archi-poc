import type { Account, Role } from '@poc/auth_database'
import { API_URL } from '../../constant'

export type IAccountByIdBody = Omit<Account, 'id'>

type AccountWithRole = Account & {
  roles: Role[]
}

export async function signIn(credentials: IAccountByIdBody) {
  const res = await fetch(`${API_URL}/signin`, { method: 'post', body: JSON.stringify(credentials) })
  const account: AccountWithRole = await res.json()
  return account
}
