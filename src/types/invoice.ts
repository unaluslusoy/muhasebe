import { Contact } from '@/types/contact'
import { Product } from '@/types/inventory'

export type InvoiceType = 'sales' | 'purchase'
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'

export interface InvoiceItem {
  id: string
  productId?: string
  productName: string
  quantity: number
  unitPrice: number
  taxRate: number
  total: number
}

export interface Invoice {
  id: string
  number: string
  type: InvoiceType
  contactId: string
  contactName: string
  issueDate: string
  dueDate: string
  status: InvoiceStatus
  items: InvoiceItem[]
  subtotal: number
  taxTotal: number
  total: number
  currency: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface CreateInvoiceDto {
  type: InvoiceType
  contactId: string
  issueDate: string
  dueDate: string
  items: {
    productId?: string
    productName: string
    quantity: number
    unitPrice: number
    taxRate: number
  }[]
  notes?: string
}
