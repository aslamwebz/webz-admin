import type { Customer } from './customer'

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
  total: number
}

export interface Order {
  id: string
  orderNumber: string
  customerId: string
  customer?: Customer
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded'
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer' | 'cash_on_delivery'
  shippingAddress: {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    postalCode: string
    country: string
    phone: string
  }
  billingAddressSame: boolean
  billingAddress?: {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  notes?: string
  createdAt: string
  updatedAt: string
  shippedAt?: string
  deliveredAt?: string
  cancelledAt?: string
}

export const orderStatuses = [
  { label: 'Pending', value: 'pending' },
  { label: 'Processing', value: 'processing' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'Refunded', value: 'refunded' },
] as const

export const paymentStatuses = [
  { label: 'Pending', value: 'pending' },
  { label: 'Paid', value: 'paid' },
  { label: 'Failed', value: 'failed' },
  { label: 'Refunded', value: 'refunded' },
  { label: 'Partially Refunded', value: 'partially_refunded' },
] as const

export const paymentMethods = [
  { label: 'Credit Card', value: 'credit_card' },
  { label: 'PayPal', value: 'paypal' },
  { label: 'Bank Transfer', value: 'bank_transfer' },
  { label: 'Cash on Delivery', value: 'cash_on_delivery' },
] as const

// Mock data for development
export const mockOrders: Order[] = [
  {
    id: 'ord_001',
    orderNumber: 'ORD-2023-1001',
    customerId: 'cus_001',
    items: [
      {
        productId: 'prod_001',
        productName: 'Premium T-Shirt',
        quantity: 2,
        price: 29.99,
        total: 59.98,
      },
      {
        productId: 'prod_003',
        productName: 'Wireless Earbuds',
        quantity: 1,
        price: 99.99,
        total: 99.99,
      },
    ],
    subtotal: 159.97,
    tax: 14.40,
    shipping: 9.99,
    discount: 0,
    total: 184.36,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA',
      phone: '+1 (555) 123-4567',
    },
    billingAddressSame: true,
    notes: 'Please leave the package at the front door.',
    createdAt: '2023-06-15T10:30:00Z',
    updatedAt: '2023-06-20T14:25:00Z',
    shippedAt: '2023-06-17T09:15:00Z',
    deliveredAt: '2023-06-19T15:45:00Z',
  },
  {
    id: 'ord_002',
    orderNumber: 'ORD-2023-1002',
    customerId: 'cus_002',
    items: [
      {
        productId: 'prod_002',
        productName: 'Classic Jeans',
        quantity: 1,
        price: 59.99,
        total: 59.99,
      },
      {
        productId: 'prod_004',
        productName: 'Smart Watch',
        quantity: 1,
        price: 199.99,
        total: 199.99,
      },
    ],
    subtotal: 259.98,
    tax: 23.40,
    shipping: 0,
    discount: 20.00,
    total: 263.38,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'paypal',
    shippingAddress: {
      firstName: 'Jane',
      lastName: 'Smith',
      address: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      postalCode: '90001',
      country: 'USA',
      phone: '+1 (555) 987-6543',
    },
    billingAddressSame: false,
    billingAddress: {
      firstName: 'Jane',
      lastName: 'Smith',
      address: '789 Business St',
      city: 'Los Angeles',
      state: 'CA',
      postalCode: '90005',
      country: 'USA',
    },
    notes: 'Gift wrapping requested.',
    createdAt: '2023-07-10T14:20:00Z',
    updatedAt: '2023-07-10T14:20:00Z',
  },
  {
    id: 'ord_003',
    orderNumber: 'ORD-2023-1003',
    customerId: 'cus_005',
    items: [
      {
        productId: 'prod_005',
        productName: 'Running Shoes',
        quantity: 1,
        price: 89.99,
        total: 89.99,
      },
    ],
    subtotal: 89.99,
    tax: 8.10,
    shipping: 4.99,
    discount: 0,
    total: 103.08,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'credit_card',
    shippingAddress: {
      firstName: 'Michael',
      lastName: 'Brown',
      address: '567 Maple Dr',
      city: 'Phoenix',
      state: 'AZ',
      postalCode: '85001',
      country: 'USA',
      phone: '+1 (555) 234-5678',
    },
    billingAddressSame: true,
    createdAt: '2023-07-15T11:30:00Z',
    updatedAt: '2023-07-15T11:30:00Z',
  },
]
