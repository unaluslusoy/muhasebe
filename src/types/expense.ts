export type ExpenseCategory = 'rent' | 'utilities' | 'office' | 'salary' | 'tax' | 'other'
export type ExpenseStatus = 'paid' | 'pending' | 'cancelled'

export interface Expense {
  id: string
  description: string
  amount: number
  currency: string
  date: string
  category: ExpenseCategory
  supplierId?: string
  supplierName?: string
  status: ExpenseStatus
  receiptUrl?: string
  createdAt: string
  updatedAt: string
}

export interface CreateExpenseDto {
  description: string
  amount: number
  date: string
  category: ExpenseCategory
  supplierId?: string
  status: ExpenseStatus
}
