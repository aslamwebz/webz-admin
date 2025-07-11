<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import MainNav from '@/components/ui/MainNav.vue'
import Overview from '@/components/ui/Overview.vue'
import RecentSales from '@/components/ui/RecentSales.vue'
import Search from '@/components/ui/Search.vue'
import UserNav from '@/components/ui/UserNav.vue'
import AppSidebar from '@/registry/new-york/blocks/Sidebar07/components/AppSidebar.vue'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/registry/new-york/ui/sidebar'
</script>

<template>
    <!-- Mobile view notice -->
    <div class="md:hidden p-4">
        <h2 class="text-lg font-semibold">Dashboard</h2>
        <p class="text-sm text-muted-foreground">
            This dashboard is best viewed on larger screens.
        </p>
    </div>
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
            <div class="flex h-svh flex-col">
                <div class="border-b">
                    <div class="flex h-16 items-center px-4">
                    <SidebarTrigger class="-ml-1" />
                    <MainNav class="mx-6" />
                    <div class="ml-auto flex items-center space-x-4">
                        <Search />
                        <UserNav />
                    </div>
                    </div>
                </div>
                <!-- Main content area -->
                <div class="flex-1 space-y-4 p-8 pt-6">
                    <div class="flex items-center justify-between">
                        <h1 class="text-3xl font-bold tracking-tight">
                            Dashboard
                        </h1>
                    </div>
                    <Tabs default-value="overview" class="space-y-4">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" class="space-y-4">
                            <!-- Dashboard metrics will go here -->
                            <div class="grid gap-4 md:grid-cols-1">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Welcome to the Dashboard</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p class="text-muted-foreground">
                                            This is your main dashboard. Add your content here.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                            <!-- Main content sections will go here -->
                            <div class="grid gap-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Overview</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Overview />
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

        </SidebarInset>
    </SidebarProvider>
</template>