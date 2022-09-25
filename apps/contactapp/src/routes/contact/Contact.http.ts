import { API_URL } from '../../constant'
import { IContact } from './Contact.types'

export const contactDetailQuery = (id: string) => ({
  queryKey: ['contacts', 'detail', id],
  queryFn: async () => getContact(id),
  staleTime: 30 * 1000,
})

export async function getContact(id: string): Promise<IContact> {
  const res = await fetch(`${API_URL}/contact/${id}`)
  const contact: IContact = await res.json()
  return contact
}
