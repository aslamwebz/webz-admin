<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CreditCard, Check, Zap } from 'lucide-vue-next'

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for getting started',
    features: [
      'Up to 10 products',
      'Basic analytics',
      'Email support',
      '1GB storage'
    ],
    buttonText: 'Current Plan',
    buttonVariant: 'outline',
    popular: false
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'For growing businesses',
    features: [
      'Unlimited products',
      'Advanced analytics',
      'Priority support',
      '10GB storage',
      'API access',
      'Export capabilities'
    ],
    buttonText: 'Upgrade to Pro',
    buttonVariant: 'default',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'Unlimited products',
      'Advanced analytics',
      '24/7 support',
      'Unlimited storage',
      'API access',
      'Dedicated account manager',
      'Custom integrations'
    ],
    buttonText: 'Contact Sales',
    buttonVariant: 'outline',
    popular: false
  }
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold tracking-tight">Billing</h2>
      <p class="text-muted-foreground">
        Manage your subscription and payment methods.
      </p>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card v-for="(plan, index) in plans" :key="index" 
        :class="[
          'flex flex-col',
          plan.popular ? 'border-2 border-primary' : ''
        ]">
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle>{{ plan.name }}</CardTitle>
            <Badge v-if="plan.popular" variant="secondary" class="flex items-center gap-1">
              <Zap class="h-3 w-3" />
              Popular
            </Badge>
          </div>
          <div class="text-4xl font-bold">{{ plan.price }}</div>
          <CardDescription>{{ plan.description }}</CardDescription>
        </CardHeader>
        <CardContent class="flex-grow">
          <ul class="space-y-2">
            <li v-for="(feature, i) in plan.features" :key="i" class="flex items-center">
              <Check class="mr-2 h-4 w-4 text-green-500" />
              <span class="text-sm">{{ feature }}</span>
            </li>
          </ul>
        </CardContent>
        <div class="p-6 pt-0">
          <Button :variant="plan.buttonVariant as any" class="w-full">
            {{ plan.buttonText }}
          </Button>
        </div>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>Add or update your payment methods</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="flex items-center justify-between rounded-lg border p-4">
          <div class="flex items-center space-x-4">
            <CreditCard class="h-8 w-8 text-muted-foreground" />
            <div>
              <p class="font-medium">Visa ending in 4242</p>
              <p class="text-sm text-muted-foreground">Expires 12/25</p>
            </div>
          </div>
          <Button variant="outline">Update</Button>
        </div>
        <Button variant="outline" class="w-full">
          <CreditCard class="mr-2 h-4 w-4" />
          Add Payment Method
        </Button>
      </CardContent>
    </Card>
  </div>
</template>
