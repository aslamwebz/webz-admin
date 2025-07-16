<script setup lang="ts">
import MainNav from '@/components/ui/MainNav.vue'
import Search from '@/components/ui/Search.vue'
import UserNav from '@/components/ui/UserNav.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import TeamSwitcher from '@/components/TeamSwitcher.vue'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import ThemeSwitch from '@/components/theme/ThemeSwitch.vue'
import Dashboard from '@/pages/Dashboard.vue'

defineOptions({
  name: 'AdminPage',
})
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
            <div class="hidden flex-col md:flex">
                <div class="border-b">
                    <div class="flex h-16 items-center px-4">
                        <SidebarTrigger />
                        <TeamSwitcher />
                        <MainNav class="mx-6" />
                        <div class="ml-auto flex items-center space-x-4">
                            <Search />
                            <ThemeSwitch />
                            <UserNav />
                        </div>
                    </div>
                </div>
                <!-- Dynamic Content Area -->
                <main class="flex-1 overflow-auto p-6">
                    <router-view v-slot="{ Component }">
                        <component :is="Component" v-if="$route.matched.length > 1" />
                        <Dashboard v-else />
                    </router-view>
                </main>
            </div>
        </SidebarInset>
    </SidebarProvider>
</template>