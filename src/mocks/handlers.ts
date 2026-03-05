import { http, HttpResponse } from 'msw'
import { Contact } from '@/types/contact'
import { Product } from '@/types/inventory'
import { Invoice } from '@/types/invoice'
import { Expense } from '@/types/expense'

// Mock Data
const contacts: Contact[] = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    type: "customer",
    taxNumber: "1234567890",
    email: "ahmet@example.com",
    phone: "5551234567",
    address: "İstanbul",
    balance: 1500.00,
    currency: "TRY",
    status: "active",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01"
  },
  {
    id: "2",
    name: "Mehmet Demir",
    type: "supplier",
    taxNumber: "9876543210",
    email: "mehmet@example.com",
    phone: "5559876543",
    address: "Ankara",
    balance: -500.00,
    currency: "TRY",
    status: "active",
    createdAt: "2024-01-02",
    updatedAt: "2024-01-02"
  }
]

const products: Product[] = [
  {
    id: "1",
    name: "Web Tasarım Hizmeti",
    code: "SRV-001",
    type: "service",
    buyPrice: 0,
    sellPrice: 15000.00,
    vatRate: 20,
    unit: "adet",
    stockQuantity: 0,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01"
  },
  {
    id: "2",
    name: "Laptop Standı",
    code: "PRD-001",
    type: "product",
    buyPrice: 250.00,
    sellPrice: 450.00,
    vatRate: 20,
    unit: "adet",
    stockQuantity: 50,
    createdAt: "2024-01-02",
    updatedAt: "2024-01-02"
  }
]

const invoices: Invoice[] = [
  {
    id: "1",
    number: "INV2024001",
    type: "sales",
    contactId: "1",
    contactName: "Ahmet Yılmaz",
    issueDate: "2024-03-01",
    dueDate: "2024-03-15",
    status: "sent",
    currency: "TRY",
    items: [
      {
        id: "101",
        productId: "1",
        productName: "Web Tasarım Hizmeti",
        quantity: 1,
        unitPrice: 15000.00,
        taxRate: 20,
        total: 15000.00
      }
    ],
    subtotal: 15000.00,
    taxTotal: 3000.00,
    total: 18000.00,
    createdAt: "2024-03-01",
    updatedAt: "2024-03-01"
  }
]

const expenses: Expense[] = [
  {
    id: "1",
    description: "Ofis Kirası",
    amount: 5000.00,
    currency: "TRY",
    date: "2024-03-01",
    category: "rent",
    status: "paid",
    createdAt: "2024-03-01",
    updatedAt: "2024-03-01"
  }
]

export const handlers = [
  // Contacts
  http.get('/api/contacts', () => {
    return HttpResponse.json(contacts)
  }),
  http.get('/api/contacts/:id', ({ params }) => {
    const contact = contacts.find(c => c.id === params.id)
    if (!contact) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(contact)
  }),
  http.post('/api/contacts', async ({ request }) => {
    const newContact = await request.json() as Contact
    newContact.id = Math.random().toString(36).substr(2, 9)
    contacts.push(newContact)
    return HttpResponse.json(newContact, { status: 201 })
  }),

  // Inventory
  http.get('/api/products', () => {
    return HttpResponse.json(products)
  }),
  http.get('/api/products/:id', ({ params }) => {
    const product = products.find(p => p.id === params.id)
    if (!product) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(product)
  }),
  http.post('/api/products', async ({ request }) => {
    const newProduct = await request.json() as Product
    newProduct.id = Math.random().toString(36).substr(2, 9)
    products.push(newProduct)
    return HttpResponse.json(newProduct, { status: 201 })
  }),

  // Invoices
  http.get('/api/invoices', () => {
    return HttpResponse.json(invoices)
  }),
  http.get('/api/invoices/:id', ({ params }) => {
    const invoice = invoices.find(i => i.id === params.id)
    if (!invoice) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(invoice)
  }),
  http.post('/api/invoices', async ({ request }) => {
    const newInvoice = await request.json() as Invoice
    newInvoice.id = Math.random().toString(36).substr(2, 9)
    invoices.push(newInvoice)
    return HttpResponse.json(newInvoice, { status: 201 })
  }),

  // Expenses
  http.get('/api/expenses', () => {
    return HttpResponse.json(expenses)
  }),
  http.get('/api/expenses/:id', ({ params }) => {
    const expense = expenses.find(e => e.id === params.id)
    if (!expense) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(expense)
  }),
  http.post('/api/expenses', async ({ request }) => {
    const newExpense = await request.json() as Expense
    newExpense.id = Math.random().toString(36).substr(2, 9)
    expenses.push(newExpense)
    return HttpResponse.json(newExpense, { status: 201 })
  }),

  // Auth
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = await request.json() as any
    // Simple mock authentication
    if (email === 'admin@example.com' && password === 'password') {
      return HttpResponse.json({
        user: {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin'
        },
        token: 'mock-jwt-token'
      })
    }
    return new HttpResponse(null, { status: 401 })
  }),

  http.post('/api/auth/register', async ({ request }) => {
    const { name, email } = await request.json() as any
    return HttpResponse.json({
      user: {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role: 'user'
      },
      token: 'mock-jwt-token'
    })
  }),

  http.post('/api/auth/logout', () => {
    return new HttpResponse(null, { status: 200 })
  }),

  http.get('/api/auth/me', ({ request }) => {
    const authHeader = request.headers.get('Authorization')
    if (authHeader) {
      return HttpResponse.json({
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin'
      })
    }
    return new HttpResponse(null, { status: 401 })
  }),
]
