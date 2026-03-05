import { api } from './api'
import { Product } from '@/types/inventory'

export const inventoryService = {
  getAll: async (): Promise<Product[]> => {
    return api.get<Product[]>('/products')
  },

  getById: async (id: string): Promise<Product> => {
    return api.get<Product>(`/products/${id}`)
  },

  create: async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    return api.post<Product>('/products', product)
  },

  update: async (id: string, product: Partial<Product>): Promise<Product> => {
    return api.put<Product>(`/products/${id}`, product)
  },

  delete: async (id: string): Promise<void> => {
    return api.delete(`/products/${id}`)
  },
}
