import { AccountWithRole, IAccountByIdBody } from './../../../../api/src/index'
import { API_URL } from '../../constant'

export async function signIn(credentials: IAccountByIdBody) {
  const res = await fetch(`${API_URL}/signin`, { method: 'post', body: JSON.stringify(credentials) })
  const account: AccountWithRole = await res.json()
  return account
}
