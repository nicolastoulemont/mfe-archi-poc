export interface IContact {
  id: number
  createdAt: Date
  first?: string
  last?: string
  avatar: string
  twitter: string
  notes: string
  favorite: boolean
}
