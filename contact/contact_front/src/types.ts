export type LoaderType<T extends (...args: any) => any> = Awaited<ReturnType<ReturnType<T>>>

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
