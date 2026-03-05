export type ProductType = 'product' | 'service'
export type ProductUnit = 'adet' | 'kg' | 'lt' | 'm' | 'saat'

export interface Product {
  id: string
  name: string
  code: string
  type: ProductType
  buyPrice: number
  sellPrice: number
  vatRate: number
  stockQuantity: number
  unit: ProductUnit
  createdAt: string
  updatedAt: string
}

export interface CreateProductDto {
  name: string
  code: string
  type: ProductType
  buyPrice: number
  sellPrice: number
  vatRate: number
  stockQuantity: number
  unit: ProductUnit
}
