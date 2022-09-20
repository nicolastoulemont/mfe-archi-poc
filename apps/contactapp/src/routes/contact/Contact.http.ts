import { API_URL } from '../../constant'
import { Contact } from './Contact.types'

export const contactDetailQuery = (id: string) => ({
  queryKey: ['contacts', 'detail', id],
  queryFn: async () => getContact(id),
})

export async function getContact(id: string) {
  const res = await fetch(`${API_URL}/contact/${id}`)
  const contact: Contact = await res.json()
  return contact
}
