import { API_URL } from '../../constant'
import { IContact } from './Contact.types'

export const contactDetailQuery = (id: string) => ({
  queryKey: ['contacts', 'detail', id],
  queryFn: async () => getContact(id),
})

export async function getContact(id: string): Promise<IContact> {
  try {
    const res = await fetch(`${API_URL}/contact/${id}`)
    const contact: IContact = await res.json()
    return contact
  } catch (error) {
    console.error(error)
    return {} as IContact
  }
}
