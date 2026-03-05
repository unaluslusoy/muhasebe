import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useNavigate } from 'react-router-dom'
import { CalendarIcon, Plus, Trash2 } from 'lucide-react'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Mock Data
const contacts = [
  { id: "1", name: "ABC Teknoloji A.Ş." },
  { id: "2", name: "Mehmet Yılmaz" },
  { id: "3", name: "XYZ Lojistik Ltd. Şti." },
]

const products = [
  { id: "1", name: "iPhone 15 Pro 128GB", price: 55000, vat: 20 },
  { id: "2", name: "Web Tasarım Hizmeti", price: 25000, vat: 20 },
  { id: "3", name: "Logitech MX Master 3S", price: 4999, vat: 20 },
]

const invoiceSchema = z.object({
  contactId: z.string().min(1, "Lütfen bir cari seçiniz."),
  issueDate: z.date(),
  dueDate: z.date(),
  items: z.array(z.object({
    productId: z.string().optional(),
    description: z.string().min(1, "Açıklama gereklidir."),
    quantity: z.coerce.number().min(1, "En az 1 olmalıdır."),
    unitPrice: z.coerce.number().min(0, "Fiyat 0'dan küçük olamaz."),
    taxRate: z.coerce.number().min(0).max(100),
  })).min(1, "En az bir kalem eklemelisiniz."),
  notes: z.string().optional(),
})

type InvoiceFormValues = z.infer<typeof invoiceSchema>

export default function CreateInvoice() {
  const navigate = useNavigate()
  
  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema) as any,
    defaultValues: {
      issueDate: new Date(),
      dueDate: new Date(),
      items: [
        { description: "", quantity: 1, unitPrice: 0, taxRate: 20 }
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: "items",
    control: form.control,
  })

  const watchedItems = form.watch("items")

  const calculateTotals = () => {
    let subtotal = 0
    let taxTotal = 0

    watchedItems.forEach(item => {
      const quantity = Number(item.quantity) || 0
      const price = Number(item.unitPrice) || 0
      const taxRate = Number(item.taxRate) || 0
      
      const lineTotal = quantity * price
      const lineTax = lineTotal * (taxRate / 100)

      subtotal += lineTotal
      taxTotal += lineTax
    })

    return { subtotal, taxTotal, total: subtotal + taxTotal }
  }

  const { subtotal, taxTotal, total } = calculateTotals()

  function onSubmit(data: InvoiceFormValues) {
    console.log(data)
    // Here you would save the invoice
    navigate('/dashboard/invoices')
  }

  const handleProductSelect = (index: number, productId: string) => {
    const product = products.find(p => p.id === productId)
    if (product) {
      form.setValue(`items.${index}.description`, product.name)
      form.setValue(`items.${index}.unitPrice`, product.price)
      form.setValue(`items.${index}.taxRate`, product.vat)
      form.setValue(`items.${index}.productId`, productId)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Yeni Satış Faturası</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Fatura Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="contactId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Müşteri</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Müşteri Seçiniz" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {contacts.map(contact => (
                          <SelectItem key={contact.id} value={contact.id}>
                            {contact.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="issueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fatura Tarihi</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Tarih seçiniz</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Vade Tarihi</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Tarih seçiniz</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hizmet ve Ürünler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="grid gap-4 md:grid-cols-12 items-end border-b pb-4 last:border-0 last:pb-0">
                  <div className="md:col-span-3">
                    <FormLabel className={index !== 0 ? "sr-only" : ""}>Ürün/Hizmet Seç</FormLabel>
                    <Select onValueChange={(val) => handleProductSelect(index, val)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seçiniz" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map(product => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="md:col-span-3">
                    <FormField
                      control={form.control}
                      name={`items.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={index !== 0 ? "sr-only" : ""}>Açıklama</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Hizmet açıklaması" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="md:col-span-1">
                    <FormField
                      control={form.control}
                      name={`items.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={index !== 0 ? "sr-only" : ""}>Miktar</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name={`items.${index}.unitPrice`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={index !== 0 ? "sr-only" : ""}>Birim Fiyat</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.01" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name={`items.${index}.taxRate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={index !== 0 ? "sr-only" : ""}>KDV (%)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="md:col-span-1">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => remove(index)}
                      disabled={fields.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => append({ description: "", quantity: 1, unitPrice: 0, taxRate: 20 })}
              >
                <Plus className="mr-2 h-4 w-4" /> Satır Ekle
              </Button>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Card className="w-full md:w-1/3">
              <CardContent className="pt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ara Toplam:</span>
                  <span>{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Toplam KDV:</span>
                  <span>{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(taxTotal)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                  <span>Genel Toplam:</span>
                  <span>{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(total)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Notlar</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Fatura notları..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate('/dashboard/invoices')}>
              İptal
            </Button>
            <Button type="submit" size="lg">
              Faturayı Kaydet
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
