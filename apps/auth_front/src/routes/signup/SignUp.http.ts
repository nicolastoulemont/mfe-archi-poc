import type { Account, Role } from '@poc/auth_database'

import { API_URL } from '../../constant'

export type IAccountByIdBody = Omit<Account, 'id'>

type AccountWithRole = Account & {
  roles: Role[]
}

export const accountQuery = (id: string) => ({
  queryKey: ['account', id],
  queryFn: async () => getAccount(id),
  staleTime: 30 * 1000,
})

export async function getAccount(id: string): Promise<AccountWithRole> {
  const res = await fetch(`${API_URL}/account/${id}`)
  const account: AccountWithRole = await res.json()
  return account
}

export async function signUp(credentials: IAccountByIdBody & { role: string }) {
  const res = await fetch(`${API_URL}/signup`, { method: 'post', body: JSON.stringify(credentials) })
  const account: AccountWithRole = await res.json()
  return account
}
