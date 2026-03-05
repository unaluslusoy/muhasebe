import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import DashboardLayout from './components/Layout/DashboardLayout'
import InvoicesList from './pages/Invoices/InvoicesList'
import CreateInvoice from './pages/Invoices/CreateInvoice'
import InvoiceDetails from './pages/Invoices/InvoiceDetails'
import ExpensesList from './pages/Expenses/ExpensesList'
import ContactsList from './pages/Contacts/ContactsList'
import InventoryList from './pages/Inventory/InventoryList'
import Settings from './pages/Settings/Settings'
import { AuthProvider } from '@/contexts/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="invoices" element={<InvoicesList />} />
            <Route path="invoices/new" element={<CreateInvoice />} />
            <Route path="invoices/:id" element={<InvoiceDetails />} />
            <Route path="expenses" element={<ExpensesList />} />
            <Route path="contacts" element={<ContactsList />} />
            <Route path="inventory" element={<InventoryList />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
