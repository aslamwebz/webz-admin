export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  stock: number
  status: 'in_stock' | 'low_stock' | 'out_of_stock'
  image?: string
  createdAt: string
  updatedAt: string
}

export const productCategories = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'home', label: 'Home & Garden' },
  { value: 'books', label: 'Books' },
  { value: 'beauty', label: 'Beauty & Personal Care' },
  { value: 'sports', label: 'Sports & Outdoors' },
  { value: 'toys', label: 'Toys & Games' },
  { value: 'other', label: 'Other' },
] as const

export const productStatuses = [
  { value: 'in_stock', label: 'In Stock' },
  { value: 'low_stock', label: 'Low Stock' },
  { value: 'out_of_stock', label: 'Out of Stock' },
] as const

// Mock data for development
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    category: 'electronics',
    stock: 45,
    status: 'in_stock',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    createdAt: '2023-06-15T10:30:00Z',
    updatedAt: '2023-06-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking',
    price: 249.99,
    category: 'electronics',
    stock: 8,
    status: 'low_stock',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    createdAt: '2023-06-10T14:20:00Z',
    updatedAt: '2023-06-12T09:15:00Z',
  },
  // Add more mock products as needed
]
