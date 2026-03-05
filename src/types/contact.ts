export type ContactType = 'customer' | 'supplier' | 'both'
export type ContactStatus = 'active' | 'inactive'

export interface Contact {
  id: string
  name: string
  type: ContactType
  taxNumber?: string
  taxOffice?: string
  email?: string
  phone?: string
  address?: string
  balance: number
  currency: string
  status: ContactStatus
  createdAt: string
  updatedAt: string
}

export interface CreateContactDto {
  name: string
  type: ContactType
  taxNumber?: string
  taxOffice?: string
  email?: string
  phone?: string
}
