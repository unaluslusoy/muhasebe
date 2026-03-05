import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" to="/">
          <span className="font-bold text-xl">MuhasebeSaaS</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="/features">
            Özellikler
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="/pricing">
            Fiyatlandırma
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="/about">
            Hakkımızda
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="/login">
            Giriş Yap
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  İşletmeniz İçin Modern Ön Muhasebe
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Fatura kesin, gelir-gider takibi yapın, stok yönetin. Hepsi tek bir platformda.
                </p>
              </div>
              <div className="space-x-4">
                <Link to="/register">
                  <Button size="lg">Hemen Başla</Button>
                </Link>
                <Link to="/features">
                  <Button variant="outline" size="lg">Daha Fazla Bilgi</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Kolay Fatura</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Saniyeler içinde profesyonel faturalar oluşturun ve müşterilerinize gönderin.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Gelir Gider Takibi</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Nakit akışınızı kontrol altında tutun. Nereye ne harcadığınızı bilin.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Stok Yönetimi</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Ürün ve hizmetlerinizi kaydedin, stok durumunu anlık takip edin.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2025 MuhasebeSaaS. Tüm hakları saklıdır.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="/terms">
            Kullanım Şartları
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="/privacy">
            Gizlilik Politikası
          </Link>
        </nav>
      </footer>
    </div>
  )
}
