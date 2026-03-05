import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, CreditCard, Download } from "lucide-react"

export function SubscriptionSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Abonelik ve Faturalar</h3>
        <p className="text-sm text-muted-foreground">
          Mevcut planınızı görüntüleyin ve ödeme geçmişinizi inceleyin.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle>Pro Paket</CardTitle>
            <CardDescription>Küçük ve orta ölçekli işletmeler için.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₺299<span className="text-sm font-normal text-muted-foreground">/ay</span></div>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Sınırsız Fatura</li>
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> 5 Kullanıcı</li>
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Stok Takibi</li>
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> E-Fatura Entegrasyonu</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled>Mevcut Plan</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <CardDescription>Büyük ölçekli operasyonlar için.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₺999<span className="text-sm font-normal text-muted-foreground">/ay</span></div>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Her şey sınırsız</li>
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Özel Destek</li>
              <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> API Erişimi</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Yükselt</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8">
        <h4 className="text-md font-medium mb-4">Fatura Geçmişi</h4>
        <div className="rounded-md border bg-white">
          <div className="p-4 flex items-center justify-between border-b last:border-0">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-muted rounded-full">
                <CreditCard className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Pro Paket - Aylık</p>
                <p className="text-sm text-muted-foreground">01 Mart 2024</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-medium">₺299.00</span>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4 mr-2" /> PDF
              </Button>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between border-b last:border-0">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-muted rounded-full">
                <CreditCard className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Pro Paket - Aylık</p>
                <p className="text-sm text-muted-foreground">01 Şubat 2024</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-medium">₺299.00</span>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4 mr-2" /> PDF
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
