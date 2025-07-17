<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, MessageSquare, FileText, Search, AlertCircle, ArrowRight } from 'lucide-vue-next'
import { ref } from 'vue'

const searchQuery = ref('')

const faqs = [
  {
    question: 'How do I update my account information?',
    answer: 'You can update your account information from the Account Settings page. Navigate to Settings > Account to make changes to your profile.',
    category: 'Account'
  },
  {
    question: 'How can I change my password?',
    answer: 'To change your password, go to Account Settings > Security. You\'ll need to enter your current password and then your new password twice to confirm.',
    category: 'Security'
  },
  {
    question: 'How do I manage my subscription?',
    answer: 'You can manage your subscription, including upgrading, downgrading, or canceling, from the Billing page under Settings.',
    category: 'Billing'
  },
  {
    question: 'How do I export my data?',
    answer: 'Data export options are available in Account Settings > Data. You can export your data in various formats including CSV and JSON.',
    category: 'Data'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans. You can manage your payment methods in the Billing section.',
    category: 'Billing'
  },
  {
    question: 'How can I contact support?',
    answer: 'You can reach our support team by emailing support@example.com or by using the contact form below. We typically respond within 24 hours.',
    category: 'Support'
  }
]

const filteredFaqs = ref(faqs)
const activeCategory = ref('All')

const filterByCategory = (category: string) => {
  activeCategory.value = category
  if (category === 'All') {
    filteredFaqs.value = faqs
  } else {
    filteredFaqs.value = faqs.filter(faq => faq.category === category)
  }
}

const categories = ['All', 'Account', 'Billing', 'Security', 'Data', 'Support']
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-5xl">
    <!-- Hero Section -->
    <div class="text-center space-y-4 mb-12">
      <h1 class="text-4xl font-bold tracking-tight">How can we help you?</h1>
      <p class="text-xl text-muted-foreground max-w-3xl mx-auto">
        Find answers to common questions or get in touch with our support team.
      </p>
      
      <!-- Search Bar -->
      <div class="relative max-w-2xl mx-auto mt-8">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search help articles..."
          class="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        />
      </div>
    </div>

    <!-- Categories -->
    <div class="flex flex-wrap justify-center gap-2 mb-12">
      <Button
        v-for="category in categories"
        :key="category"
        @click="filterByCategory(category)"
        :variant="activeCategory === category ? 'default' : 'outline'"
        class="rounded-full"
      >
        {{ category }}
      </Button>
    </div>

    <!-- FAQ Section -->
    <div class="space-y-6 mb-16">
      <h2 class="text-2xl font-semibold">Frequently Asked Questions</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <Card v-for="(faq, index) in filteredFaqs" :key="index" class="hover:shadow-md transition-shadow">
          <CardHeader class="pb-2">
            <CardTitle class="text-lg">{{ faq.question }}</CardTitle>
            <CardDescription>{{ faq.category }}</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">{{ faq.answer }}</p>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Contact Section -->
    <Card class="bg-muted/50">
      <CardHeader class="text-center">
        <MessageSquare class="h-10 w-10 mx-auto text-primary" />
        <CardTitle>Still need help?</CardTitle>
        <CardDescription class="max-w-2xl mx-auto">
          Our support team is here to help you with any questions or issues you might have.
        </CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col md:flex-row justify-center gap-6 pt-2">
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
            <Mail class="h-6 w-6 text-primary" />
          </div>
          <h3 class="font-medium mb-1">Email Us</h3>
          <p class="text-sm text-muted-foreground mb-3">We'll respond as soon as possible</p>
          <Button variant="outline" size="sm" class="gap-2">
            support@example.com
            <ArrowRight class="h-4 w-4" />
          </Button>
        </div>
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
            <MessageSquare class="h-6 w-6 text-primary" />
          </div>
          <h3 class="font-medium mb-1">Chat with us</h3>
          <p class="text-sm text-muted-foreground mb-3">Available 9am-5pm EST</p>
          <Button size="sm" class="gap-2">
            Start Chat
            <ArrowRight class="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Documentation Section -->
    <div class="mt-16 text-center">
      <h2 class="text-2xl font-semibold mb-6">Documentation</h2>
      <div class="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card class="hover:shadow-md transition-shadow">
          <CardHeader>
            <div class="inline-flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 text-primary mb-4">
              <FileText class="h-5 w-5" />
            </div>
            <CardTitle class="text-lg">Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground mb-4">Learn the basics and set up your account.</p>
            <Button variant="link" class="p-0 h-auto font-normal">Read guide <ArrowRight class="ml-1 h-4 w-4" /></Button>
          </CardContent>
        </Card>
        <Card class="hover:shadow-md transition-shadow">
          <CardHeader>
            <div class="inline-flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 text-primary mb-4">
              <AlertCircle class="h-5 w-5" />
            </div>
            <CardTitle class="text-lg">Troubleshooting</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground mb-4">Find solutions to common issues and errors.</p>
            <Button variant="link" class="p-0 h-auto font-normal">View solutions <ArrowRight class="ml-1 h-4 w-4" /></Button>
          </CardContent>
        </Card>
        <Card class="hover:shadow-md transition-shadow">
          <CardHeader>
            <div class="inline-flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 text-primary mb-4">
              <MessageSquare class="h-5 w-5" />
            </div>
            <CardTitle class="text-lg">API Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground mb-4">Integrate with our API and build custom solutions.</p>
            <Button variant="link" class="p-0 h-auto font-normal">View API docs <ArrowRight class="ml-1 h-4 w-4" /></Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
