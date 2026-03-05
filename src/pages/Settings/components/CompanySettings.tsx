import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Building2, Save } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const companyFormSchema = z.object({
  companyName: z.string().min(2, {
    message: "Firma adı en az 2 karakter olmalıdır.",
  }),
  taxNumber: z.string().min(10, {
    message: "Vergi numarası en az 10 karakter olmalıdır.",
  }),
  taxOffice: z.string().min(2, {
    message: "Vergi dairesi gereklidir.",
  }),
  address: z.string().min(10, {
    message: "Adres en az 10 karakter olmalıdır.",
  }),
  phone: z.string().optional(),
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz." }),
  website: z.string().url({ message: "Geçerli bir URL giriniz." }).optional().or(z.literal('')),
})

type CompanyFormValues = z.infer<typeof companyFormSchema>

// Mock Data
const defaultValues: CompanyFormValues = {
  companyName: "Örnek Teknoloji A.Ş.",
  taxNumber: "1234567890",
  taxOffice: "Kadıköy VD",
  address: "Fenerbahçe Mah. Bağdat Cad. No:123 Kadıköy/İstanbul",
  phone: "+90 216 123 45 67",
  email: "info@ornekteknoloji.com",
  website: "https://www.ornekteknoloji.com",
}

export function CompanySettings() {
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues,
  })

  function onSubmit(data: CompanyFormValues) {
    console.log(data)
    // Save settings logic here
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Firma Bilgileri</h3>
        <p className="text-sm text-muted-foreground">
          Faturalarda görünecek firma bilgilerinizi buradan düzenleyebilirsiniz.
        </p>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Genel Bilgiler</CardTitle>
              <CardDescription>
                Firmanızın temel iletişim ve vergi bilgileri.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Firma Ünvanı</FormLabel>
                      <FormControl>
                        <Input placeholder="Şirketinizin tam ünvanı" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-posta Adresi</FormLabel>
                      <FormControl>
                        <Input placeholder="info@sirket.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="taxNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vergi / TC No</FormLabel>
                      <FormControl>
                        <Input placeholder="1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="taxOffice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vergi Dairesi</FormLabel>
                      <FormControl>
                        <Input placeholder="Vergi Dairesi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefon</FormLabel>
                      <FormControl>
                        <Input placeholder="+90 555 123 45 67" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Web Sitesi</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adres</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tam adresiniz..."
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
          
          <div className="flex justify-end">
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" /> Değişiklikleri Kaydet
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
