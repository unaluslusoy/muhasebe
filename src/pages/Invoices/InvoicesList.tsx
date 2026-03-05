import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useQuery } from '@tanstack/react-query'
import { invoiceService } from '@/services/invoiceService'
import { Badge } from '@/components/ui/badge'

export default function InvoicesList() {
  const navigate = useNavigate()

  const { data: invoices, isLoading, error } = useQuery({
    queryKey: ['invoices'],
    queryFn: invoiceService.getAll
  })

  if (isLoading) return <div>Yükleniyor...</div>
  if (error) return <div>Hata oluştu: {error.message}</div>

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500">Ödendi</Badge>
      case 'sent':
        return <Badge variant="secondary">Gönderildi</Badge>
      case 'overdue':
        return <Badge variant="destructive">Gecikmiş</Badge>
      case 'draft':
        return <Badge variant="outline">Taslak</Badge>
      case 'cancelled':
        return <Badge variant="destructive">İptal</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Faturalar</h2>
        <Link to="/dashboard/invoices/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Yeni Fatura
          </Button>
        </Link>
      </div>
      <div className="rounded-md border bg-white">
        <Table>
          <TableCaption>Son faturalarınızın listesi.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Fatura No</TableHead>
              <TableHead>Müşteri</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead>Vade</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="text-right">Tutar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices?.map((invoice) => (
              <TableRow 
                key={invoice.id} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => navigate(`/dashboard/invoices/${invoice.id}`)}
              >
                <TableCell className="font-medium">{invoice.number}</TableCell>
                <TableCell>{invoice.contactName}</TableCell>
                <TableCell>{new Date(invoice.issueDate).toLocaleDateString('tr-TR')}</TableCell>
                <TableCell>{new Date(invoice.dueDate).toLocaleDateString('tr-TR')}</TableCell>
                <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                <TableCell className="text-right">
                  {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: invoice.currency }).format(invoice.total)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
