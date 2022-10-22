import { matchSorter } from 'match-sorter'
import { API_URL } from '../../constant'
import { IContact } from '../../types'

export const contactListQuery = (q: string | null) => ({
  queryKey: ['contacts', 'list', q],
  queryFn: async () => getContacts(q),
  staleTime: 30 * 1000,
})

export async function getContacts(query?: any) {
  const res = await fetch(`${API_URL}/contacts${query ? `?search=${query}` : ''}`)
  const contacts: IContact[] = await res.json()
  if (query) {
    return matchSorter(contacts, query, { keys: ['first', 'last'] })
  }
  return contacts
}

export async function createContact() {
  const res = await fetch(`${API_URL}/contacts`, { method: 'post' })
  const contact: Pick<IContact, 'id' | 'createdAt'> = await res.json()
  return contact
}
