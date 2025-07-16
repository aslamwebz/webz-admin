export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  isActive: boolean
  productCount: number
  createdAt: string
  updatedAt: string
}

export const mockCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest gadgets and electronic devices',
    isActive: true,
    productCount: 42,
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2023-06-20T14:22:00Z'
  },
  {
    id: 'cat-2',
    name: 'Clothing',
    slug: 'clothing',
    description: 'Fashionable clothing for all occasions',
    isActive: true,
    productCount: 128,
    createdAt: '2023-02-10T09:15:00Z',
    updatedAt: '2023-07-05T11:45:00Z'
  },
  {
    id: 'cat-3',
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Everything for your home and garden',
    isActive: true,
    productCount: 87,
    createdAt: '2023-03-05T14:20:00Z',
    updatedAt: '2023-07-10T16:30:00Z'
  },
  {
    id: 'cat-4',
    name: 'Books',
    slug: 'books',
    description: 'Books for all ages and interests',
    isActive: true,
    productCount: 215,
    createdAt: '2023-01-20T11:05:00Z',
    updatedAt: '2023-06-15T10:12:00Z'
  },
  {
    id: 'cat-5',
    name: 'Beauty & Personal Care',
    slug: 'beauty',
    description: 'Products for personal care and beauty',
    isActive: true,
    productCount: 94,
    createdAt: '2023-04-12T13:25:00Z',
    updatedAt: '2023-07-08T09:30:00Z'
  },
  {
    id: 'cat-6',
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    description: 'Equipment for sports and outdoor activities',
    isActive: true,
    productCount: 63,
    createdAt: '2023-02-28T15:40:00Z',
    updatedAt: '2023-07-12T14:15:00Z'
  },
  {
    id: 'cat-7',
    name: 'Toys & Games',
    slug: 'toys-games',
    description: 'Fun for kids and families',
    isActive: true,
    productCount: 176,
    createdAt: '2023-03-15T10:10:00Z',
    updatedAt: '2023-07-01T16:20:00Z'
  }
]
