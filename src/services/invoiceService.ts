import { api } from './api'
import { Invoice } from '@/types/invoice'

export const invoiceService = {
  getAll: async (): Promise<Invoice[]> => {
    return api.get<Invoice[]>('/invoices')
  },

  getById: async (id: string): Promise<Invoice> => {
    return api.get<Invoice>(`/invoices/${id}`)
  },

  create: async (invoice: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>): Promise<Invoice> => {
    return api.post<Invoice>('/invoices', invoice)
  },

  update: async (id: string, invoice: Partial<Invoice>): Promise<Invoice> => {
    return api.put<Invoice>(`/invoices/${id}`, invoice)
  },

  delete: async (id: string): Promise<void> => {
    return api.delete(`/invoices/${id}`)
  },
}
