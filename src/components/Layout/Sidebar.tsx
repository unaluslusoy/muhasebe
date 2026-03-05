import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  FileText, 
  CreditCard, 
  Users, 
  Package, 
  Settings, 
  LogOut 
} from 'lucide-react'

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Faturalar', icon: FileText, path: '/dashboard/invoices' },
  { name: 'Gelir/Gider', icon: CreditCard, path: '/dashboard/expenses' },
  { name: 'Cari Hesaplar', icon: Users, path: '/dashboard/contacts' },
  { name: 'Stok', icon: Package, path: '/dashboard/inventory' },
  { name: 'Ayarlar', icon: Settings, path: '/dashboard/settings' },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
        <span className="text-2xl font-bold text-primary">MuhasebeSaaS</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors">
          <LogOut className="mr-3 h-5 w-5" />
          Çıkış Yap
        </button>
      </div>
    </div>
  )
}
