export interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  postalCode: string
  country: string
  status: 'active' | 'inactive' | 'banned'
  totalOrders: number
  totalSpent: number
  createdAt: string
  updatedAt: string
}

export const customerStatuses = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Banned', value: 'banned' },
] as const

// Mock data for development
export const mockCustomers: Customer[] = [
  {
    id: 'cus_001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'USA',
    status: 'active',
    totalOrders: 12,
    totalSpent: 2450.99,
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2023-06-20T14:25:00Z',
  },
  {
    id: 'cus_002',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    address: '456 Oak Ave',
    city: 'Los Angeles',
    state: 'CA',
    postalCode: '90001',
    country: 'USA',
    status: 'active',
    totalOrders: 8,
    totalSpent: 1875.50,
    createdAt: '2023-02-20T11:15:00Z',
    updatedAt: '2023-07-10T09:45:00Z',
  },
  {
    id: 'cus_003',
    firstName: 'Robert',
    lastName: 'Johnson',
    email: 'robert.j@example.com',
    phone: '+1 (555) 456-7890',
    address: '789 Pine St',
    city: 'Chicago',
    state: 'IL',
    postalCode: '60601',
    country: 'USA',
    status: 'inactive',
    totalOrders: 3,
    totalSpent: 450.25,
    createdAt: '2023-03-10T14:20:00Z',
    updatedAt: '2023-05-15T16:30:00Z',
  },
  {
    id: 'cus_004',
    firstName: 'Emily',
    lastName: 'Williams',
    email: 'emily.w@example.com',
    phone: '+1 (555) 789-0123',
    address: '321 Elm St',
    city: 'Houston',
    state: 'TX',
    postalCode: '77001',
    country: 'USA',
    status: 'banned',
    totalOrders: 0,
    totalSpent: 0,
    createdAt: '2023-04-05T09:45:00Z',
    updatedAt: '2023-06-25T11:20:00Z',
  },
  {
    id: 'cus_005',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.b@example.com',
    phone: '+1 (555) 234-5678',
    address: '567 Maple Dr',
    city: 'Phoenix',
    state: 'AZ',
    postalCode: '85001',
    country: 'USA',
    status: 'active',
    totalOrders: 5,
    totalSpent: 1200.75,
    createdAt: '2023-05-12T13:10:00Z',
    updatedAt: '2023-07-05T10:15:00Z',
  },
]
