import { API_URL } from '../../constant'
import { Contact } from '../contact'

export async function updateContact(id: string, updates: Partial<Contact>) {
  const res = await fetch(`${API_URL}/contact/${id}`, { method: 'put', body: JSON.stringify(updates) })
  const contact: Contact = await res.json()
  return contact
}
