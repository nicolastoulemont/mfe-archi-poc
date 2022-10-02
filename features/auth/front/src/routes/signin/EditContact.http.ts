import { API_URL } from '../../constant'
import { IContact } from '../signup'

export async function updateContact(id: string, updates: Partial<IContact>) {
  const res = await fetch(`${API_URL}/contact/${id}`, { method: 'put', body: JSON.stringify(updates) })
  const contact: IContact = await res.json()
  return contact
}
