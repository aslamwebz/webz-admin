<script setup lang="ts">
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Zap, ArrowRight } from 'lucide-vue-next'

const features = [
  {
    name: 'Everything in Free, plus:',
    items: [
      'Unlimited products and categories',
      'Advanced analytics and reports',
      'Priority customer support',
      'API access',
      'Custom branding',
      'Bulk import/export',
      'Advanced user permissions',
      'Workflow automations'
    ]
  },
  {
    name: 'Pro Benefits',
    items: [
      'No transaction fees',
      '99.9% uptime guarantee',
      'Dedicated account manager',
      'Custom integrations',
      'White-label reports',
      'Training sessions',
      'Early access to new features'
    ]
  }
]

const testimonials = [
  {
    quote: "Upgrading to Pro was the best decision for our growing business. The advanced analytics alone are worth it.",
    author: "Sarah Johnson",
    role: "E-commerce Manager, StyleHub"
  },
  {
    quote: "The priority support has saved us countless hours. Response times are incredible!",
    author: "Michael Chen",
    role: "CTO, TechGadgets"
  }
]

const faqs = [
  {
    question: "Can I upgrade at any time?",
    answer: "Yes, you can upgrade to Pro at any time. Your billing cycle will be prorated based on your current subscription."
  },
  {
    question: "Is there a free trial for Pro?",
    answer: "We offer a 14-day free trial for the Pro plan. No credit card required to start the trial."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period."
  }
]
</script>

<template>
  <div class="space-y-16">
    <!-- Hero Section -->
    <div class="text-center space-y-4 py-12">
      <Badge variant="outline" class="text-sm font-medium px-3 py-1">
        <Zap class="h-4 w-4 mr-2" />
        Upgrade to Pro
      </Badge>
      <h1 class="text-4xl font-bold tracking-tight">
        Ready to take your business to the next level?
      </h1>
      <p class="text-xl text-muted-foreground max-w-3xl mx-auto">
        Unlock powerful features and grow your business with our Pro plan.
      </p>
    </div>

    <!-- Pricing Section -->
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
      <!-- Free Plan -->
      <Card>
        <CardHeader>
          <CardTitle>Free</CardTitle>
          <div class="flex items-baseline mt-2">
            <span class="text-4xl font-bold">$0</span>
            <span class="text-muted-foreground">/month</span>
          </div>
          <CardDescription>Perfect for getting started</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <ul class="space-y-2">
            <li class="flex items-center">
              <Check class="h-4 w-4 text-green-500 mr-2" />
              Up to 10 products
            </li>
            <li class="flex items-center">
              <Check class="h-4 w-4 text-green-500 mr-2" />
              Basic analytics
            </li>
            <li class="flex items-center">
              <Check class="h-4 w-4 text-green-500 mr-2" />
              Email support
            </li>
            <li class="flex items-center">
              <Check class="h-4 w-4 text-green-500 mr-2" />
              1GB storage
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button variant="outline" class="w-full" disabled>
            Current Plan
          </Button>
        </CardFooter>
      </Card>

      <!-- Pro Plan -->
      <Card class="border-2 border-primary relative">
        <div class="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge class="px-3 py-1 text-sm font-medium">
            <Zap class="h-4 w-4 mr-1" />
            POPULAR
          </Badge>
        </div>
        <CardHeader>
          <CardTitle>Pro</CardTitle>
          <div class="flex items-baseline mt-2">
            <span class="text-4xl font-bold">$29</span>
            <span class="text-muted-foreground">/month</span>
          </div>
          <CardDescription>For growing businesses</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <ul class="space-y-2">
            <li class="flex items-center">
              <Check class="h-4 w-4 text-green-500 mr-2" />
              Unlimited products
            </li>
            <li class="flex items-center">
              <Check class="h-4 w-4 text-green-500 mr-2" />
              Advanced analytics
            </li>
            <li class="flex items-center">
              <Check class="h-4 w-4 text-green-500 mr-2" />
              Priority support
            </li>
            <li class="flex items-center">
              <Check class="h-4 w-4 text-green-500 mr-2" />
              API access
            </li>
            <li class="flex items-center">
              <Check class="h-4 w-4 text-green-500 mr-2" />
              10GB storage
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button class="w-full group">
            Upgrade to Pro
            <ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>

      <!-- Enterprise Plan -->
      <Card>
        <CardHeader>
          <CardTitle>Enterprise</CardTitle>
          <div class="flex items-baseline mt-2">
            <span class="text-4xl font-bold">Custom</span>
          </div>
          <CardDescription>For large organizations</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <ul class="space-y-2">
            <li class="flex items-center">
              <Check class="h-4 w-4 text-green-500 mr-2" />
              Everything in Pro, plus:
            </li>
            <li class="flex items-center">
              <Check class="h-4 w-4 text-green-500 mr-2" />
              Unlimited storage
            </li>
            <li class="flex items-center">
              <Check class="h-4 w-4 text-green-500 mr-2" />
              Dedicated support
            </li>
            <li class="flex items-center">
              <Check class="h-4 w-4 text-green-500 mr-2" />
              Custom integrations
            </li>
            <li class="flex items-center">
              <Check class="h-4 w-4 text-green-500 mr-2" />
              SLA & security review
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button variant="outline" class="w-full">
            Contact Sales
          </Button>
        </CardFooter>
      </Card>
    </div>

    <!-- Features Section -->
    <div class="max-w-6xl mx-auto space-y-12">
      <div class="text-center space-y-4">
        <h2 class="text-3xl font-bold tracking-tight">Everything you need to grow</h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          Our Pro plan gives you all the tools you need to scale your business efficiently.
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2">
        <div v-for="(section, index) in features" :key="index" class="space-y-4">
          <h3 class="text-lg font-medium">{{ section.name }}</h3>
          <ul class="space-y-3">
            <li v-for="(item, i) in section.items" :key="i" class="flex items-start">
              <Check class="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Testimonials -->
    <div class="bg-muted/50 py-16">
      <div class="max-w-4xl mx-auto px-4">
        <h2 class="text-2xl font-bold text-center mb-12">Loved by businesses worldwide</h2>
        <div class="grid gap-8 md:grid-cols-2">
          <Card v-for="(testimonial, index) in testimonials" :key="index" class="h-full">
            <CardContent class="pt-6">
              <blockquote class="space-y-4">
                <p class="text-muted-foreground italic">"{{ testimonial.quote }}"</p>
                <footer class="text-sm">
                  <div class="font-medium">{{ testimonial.author }}</div>
                  <div class="text-muted-foreground">{{ testimonial.role }}</div>
                </footer>
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="max-w-3xl mx-auto space-y-8">
      <h2 class="text-2xl font-bold text-center">Frequently asked questions</h2>
      <div class="space-y-4">
        <div v-for="(faq, index) in faqs" :key="index" class="border-b pb-4">
          <h3 class="font-medium">{{ faq.question }}</h3>
          <p class="text-muted-foreground mt-1">{{ faq.answer }}</p>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-primary/5 rounded-lg p-8 text-center space-y-4 max-w-3xl mx-auto">
      <h2 class="text-2xl font-bold">Ready to upgrade?</h2>
      <p class="text-muted-foreground">Join thousands of businesses growing with our Pro plan.</p>
      <div class="flex justify-center gap-4 pt-4">
        <Button size="lg" class="group">
          Get Started Now
          <ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
        <Button variant="outline" size="lg">
          Contact Sales
        </Button>
      </div>
    </div>
  </div>
</template>
