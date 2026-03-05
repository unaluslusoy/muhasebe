import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Download, Printer, Send, Edit, MoreVertical } from 'lucide-react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { InvoicePDF } from './components/InvoicePDF'
import { Invoice } from '@/types/invoice'

// Mock Data for a single invoice
const mockInvoice: Invoice = {
  id: "1",
  number: "INV2024001",
  type: "sales",
  contactId: "1",
  contactName: "ABC Teknoloji A.Ş.",
  issueDate: "2024-03-01",
  dueDate: "2024-03-15",
  status: "sent",
  currency: "TRY",
  items: [
    {
      id: "101",
      productName: "Web Tasarım Hizmeti",
      quantity: 1,
      unitPrice: 25000.00,
      taxRate: 20,
      total: 25000.00
    },
    {
      id: "102",
      productName: "Hosting Yıllık",
      quantity: 1,
      unitPrice: 3500.00,
      taxRate: 20,
      total: 3500.00
    }
  ],
  subtotal: 28500.00,
  taxTotal: 5700.00,
  total: 34200.00,
  notes: "Ödeme 15 gün içinde yapılmalıdır. Gecikme durumunda %5 vade farkı uygulanır.",
  createdAt: "2024-03-01",
  updatedAt: "2024-03-01"
}

export default function InvoiceDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  // In a real app, fetch invoice by ID
  const invoice = mockInvoice

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/dashboard/invoices')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              {invoice.number}
              <Badge variant={invoice.status === 'paid' ? 'default' : 'secondary'}>
                {invoice.status === 'paid' ? 'Ödendi' : invoice.status === 'sent' ? 'Gönderildi' : 'Taslak'}
              </Badge>
            </h2>
            <p className="text-sm text-muted-foreground">
              Oluşturulma: {format(new Date(invoice.issueDate), 'dd MMMM yyyy')}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <PDFDownloadLink
            document={<InvoicePDF invoice={invoice} />}
            fileName={`fatura-${invoice.number}.pdf`}
          >
            {({ loading }) => (
              <Button variant="outline" disabled={loading}>
                <Download className="mr-2 h-4 w-4" />
                {loading ? 'Hazırlanıyor...' : 'PDF İndir'}
              </Button>
            )}
          </PDFDownloadLink>
          
          <Button variant="outline">
            <Send className="mr-2 h-4 w-4" /> E-posta Gönder
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" /> Düzenle
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                İptal Et
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fatura Detayları</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">Gönderen</h3>
                  <p className="font-medium">Örnek Teknoloji A.Ş.</p>
                  <p className="text-sm">Fenerbahçe Mah. Bağdat Cad.</p>
                  <p className="text-sm">No:123 Kadıköy/İstanbul</p>
                  <p className="text-sm mt-1">V.D.: Kadıköy - 1234567890</p>
                </div>
                <div className="text-right">
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">Alıcı</h3>
                  <p className="font-medium">{invoice.contactName}</p>
                  <p className="text-sm">Müşteri Adresi Buraya Gelecek</p>
                  <p className="text-sm">İstanbul/Türkiye</p>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ürün / Hizmet</TableHead>
                    <TableHead className="text-right">Miktar</TableHead>
                    <TableHead className="text-right">Birim Fiyat</TableHead>
                    <TableHead className="text-right">KDV</TableHead>
                    <TableHead className="text-right">Tutar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoice.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.productName}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">
                        {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: invoice.currency }).format(item.unitPrice)}
                      </TableCell>
                      <TableCell className="text-right">%{item.taxRate}</TableCell>
                      <TableCell className="text-right font-medium">
                        {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: invoice.currency }).format(item.total)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex justify-end mt-6">
                <div className="w-1/2 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ara Toplam</span>
                    <span>{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: invoice.currency }).format(invoice.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Toplam KDV</span>
                    <span>{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: invoice.currency }).format(invoice.taxTotal)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Genel Toplam</span>
                    <span>{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: invoice.currency }).format(invoice.total)}</span>
                  </div>
                </div>
              </div>

              {invoice.notes && (
                <div className="mt-8 p-4 bg-muted/50 rounded-md">
                  <h4 className="font-semibold text-sm mb-1">Notlar</h4>
                  <p className="text-sm text-muted-foreground">{invoice.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Fatura Özeti</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Fatura No</p>
                <p className="font-medium">{invoice.number}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Düzenleme Tarihi</p>
                <p className="font-medium">{format(new Date(invoice.issueDate), 'dd MMMM yyyy')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Vade Tarihi</p>
                <p className="font-medium">{format(new Date(invoice.dueDate), 'dd MMMM yyyy')}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Kalan Tutar</p>
                <p className="font-bold text-xl text-red-600">
                  {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: invoice.currency }).format(invoice.total)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">İşlem Geçmişi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4 text-sm">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-green-500 shrink-0" />
                  <div>
                    <p className="font-medium">Fatura Oluşturuldu</p>
                    <p className="text-muted-foreground text-xs">01 Mart 2024 - 14:30</p>
                    <p className="text-muted-foreground text-xs">Ahmet Yılmaz tarafından</p>
                  </div>
                </div>
                <div className="flex gap-4 text-sm">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 shrink-0" />
                  <div>
                    <p className="font-medium">E-posta Gönderildi</p>
                    <p className="text-muted-foreground text-xs">01 Mart 2024 - 14:35</p>
                    <p className="text-muted-foreground text-xs">info@abcteknoloji.com adresine</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
