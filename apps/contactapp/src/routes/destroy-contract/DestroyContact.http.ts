import { API_URL } from '../../constant'
import { Contact } from '../contact'

export async function deleteContact(id: string) {
  const res = await fetch(`${API_URL}/contact/${id}`, { method: 'delete' })
  const contact: Contact = await res.json()
  return contact
}
