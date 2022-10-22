import { API_URL } from '../../constant'
import { IContact } from '../../types'

export async function deleteContact(id: string) {
  const res = await fetch(`${API_URL}/contacts/${id}`, { method: 'delete' })
  const contact: IContact = await res.json()
  return contact
}
