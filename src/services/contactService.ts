import { api } from './api'
import { Contact } from '@/types/contact'

export const contactService = {
  getAll: async (): Promise<Contact[]> => {
    return api.get<Contact[]>('/contacts')
  },

  getById: async (id: string): Promise<Contact> => {
    return api.get<Contact>(`/contacts/${id}`)
  },

  create: async (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contact> => {
    return api.post<Contact>('/contacts', contact)
  },

  update: async (id: string, contact: Partial<Contact>): Promise<Contact> => {
    return api.put<Contact>(`/contacts/${id}`, contact)
  },

  delete: async (id: string): Promise<void> => {
    return api.delete(`/contacts/${id}`)
  },
}
