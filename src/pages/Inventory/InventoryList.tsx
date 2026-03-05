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
import { CreateProductDialog } from './components/CreateProductDialog'
import { Product } from '@/types/inventory'
import { inventoryService } from '@/services/inventoryService'

export default function InventoryList() {
  const queryClient = useQueryClient()

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: inventoryService.getAll
  })

  const createProductMutation = useMutation({
    mutationFn: inventoryService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    }
  })

  const handleCreateProduct = (data: any) => {
    const newProduct: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
      name: data.name,
      code: data.code,
      type: data.type,
      buyPrice: data.buyPrice,
      sellPrice: data.sellPrice,
      vatRate: data.vatRate,
      stockQuantity: data.stockQuantity,
      unit: data.unit
    }
    createProductMutation.mutate(newProduct)
  }

  if (isLoading) return <div>Yükleniyor...</div>
  if (error) return <div>Hata oluştu: {error.message}</div>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Stok Yönetimi</h2>
        <CreateProductDialog onProductCreated={handleCreateProduct} />
      </div>
      <div className="rounded-md border bg-white">
        <Table>
          <TableCaption>Ürün ve hizmet listesi.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Kod</TableHead>
              <TableHead>Ürün Adı</TableHead>
              <TableHead>Tip</TableHead>
              <TableHead className="text-right">Alış Fiyatı</TableHead>
              <TableHead className="text-right">Satış Fiyatı</TableHead>
              <TableHead className="text-center">KDV</TableHead>
              <TableHead className="text-right">Stok</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium text-muted-foreground">{product.code}</TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <Badge variant={product.type === 'product' ? 'default' : 'secondary'}>
                    {product.type === 'product' ? 'Ürün' : 'Hizmet'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(product.buyPrice)}
                </TableCell>
                <TableCell className="text-right font-bold">
                  {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(product.sellPrice)}
                </TableCell>
                <TableCell className="text-center">%{product.vatRate}</TableCell>
                <TableCell className="text-right">
                  {product.type === 'service' ? '-' : `${product.stockQuantity} ${product.unit}`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
