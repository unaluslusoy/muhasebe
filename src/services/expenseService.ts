import { api } from './api'
import { Expense } from '@/types/expense'

export const expenseService = {
  getAll: async (): Promise<Expense[]> => {
    return api.get<Expense[]>('/expenses')
  },

  getById: async (id: string): Promise<Expense> => {
    return api.get<Expense>(`/expenses/${id}`)
  },

  create: async (expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>): Promise<Expense> => {
    return api.post<Expense>('/expenses', expense)
  },

  update: async (id: string, expense: Partial<Expense>): Promise<Expense> => {
    return api.put<Expense>(`/expenses/${id}`, expense)
  },

  delete: async (id: string): Promise<void> => {
    return api.delete(`/expenses/${id}`)
  },
}
