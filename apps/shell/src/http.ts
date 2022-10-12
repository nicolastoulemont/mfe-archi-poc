import { PORTS_MAP } from '@poc/ports-map'
import { matchSorter } from 'match-sorter'
import sortBy from 'sort-by'

export interface Contact {
  id: number
  createdAt: Date
  first?: string
  last?: string
  avatar: string
  twitter: string
  notes: string
  favorite: boolean
}

export const API_URL = `http://localhost:${PORTS_MAP.CONTACT.DEV_API}`

export async function getContacts(query?: any) {
  const res = await fetch(`${API_URL}/contacts${query ? `?search=${query}` : ''}`)
  const contacts: Contact[] = await res.json()
  if (query) {
    return matchSorter(contacts, query, { keys: ['first', 'last'] })
  }
  return contacts.sort(sortBy('last', 'createdAt'))
}

export async function createContact() {
  const res = await fetch(`${API_URL}/contact`, { method: 'post' })
  const contact: Pick<Contact, 'id' | 'createdAt'> = await res.json()
  return contact
}
