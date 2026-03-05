import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CreateExpenseDialog } from './components/CreateExpenseDialog'
import { Expense } from '@/types/expense'
import { format } from 'date-fns'
import { expenseService } from '@/services/expenseService'

const categoryLabels: Record<string, string> = {
  rent: "Kira",
  utilities: "Fatura",
  office: "Ofis",
  salary: "Maaş",
  tax: "Vergi",
  other: "Diğer"
}

export default function ExpensesList() {
  const queryClient = useQueryClient()

  const { data: expenses, isLoading, error } = useQuery({
    queryKey: ['expenses'],
    queryFn: expenseService.getAll
  })

  const createExpenseMutation = useMutation({
    mutationFn: expenseService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
    }
  })

  const handleCreateExpense = (data: any) => {
    const newExpense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'> = {
      description: data.description,
      amount: data.amount,
      currency: "TRY",
      date: format(data.date, "yyyy-MM-dd"),
      category: data.category,
      status: data.status,
      supplierId: data.supplierId
    }
    createExpenseMutation.mutate(newExpense)
  }

  if (isLoading) return <div>Yükleniyor...</div>
  if (error) return <div>Hata oluştu: {error.message}</div>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gelir / Gider</h2>
        <CreateExpenseDialog onExpenseCreated={handleCreateExpense} />
      </div>
      <div className="rounded-md border bg-white">
        <Table>
          <TableCaption>Gider listesi.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Tarih</TableHead>
              <TableHead>Açıklama</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Tedarikçi</TableHead>
              <TableHead className="text-right">Tutar</TableHead>
              <TableHead className="text-center">Durum</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses?.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.date}</TableCell>
                <TableCell className="font-medium">{expense.description}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {categoryLabels[expense.category] || expense.category}
                  </Badge>
                </TableCell>
                <TableCell>{expense.supplierName || '-'}</TableCell>
                <TableCell className="text-right font-medium text-red-600">
                  - {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: expense.currency }).format(expense.amount)}
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant={expense.status === 'paid' ? 'default' : expense.status === 'pending' ? 'secondary' : 'destructive'} 
                    className={expense.status === 'paid' ? 'bg-green-500 hover:bg-green-600' : ''}>
                    {expense.status === 'paid' ? 'Ödendi' : expense.status === 'pending' ? 'Bekliyor' : 'İptal'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
