# Webz Admin Dashboard

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.5.17-42b883?logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-06B6D4?logo=tailwind-css)](https://tailwindcss.com/)

A modern, responsive admin dashboard built with Vue 3, TypeScript, and Tailwind CSS. Webz Admin provides a clean and intuitive interface for managing your application's data with features like user management, product catalog, order processing, and more.

![Webz Admin Dashboard](https://webz-admin.vercel.app/)

## ✨ Features

- 🎨 **Modern UI** - Clean, responsive design with dark/light mode support
- 📊 **Dashboard Overview** - Visualize your data with beautiful charts and statistics
- 👥 **User Management** - Manage users, roles, and permissions
- 🛍️ **Product Catalog** - Full CRUD operations for products and categories
- 📦 **Order Management** - Process and track orders with ease
- 🔍 **Advanced Search & Filtering** - Find what you need quickly
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- ⚡ **Blazing Fast** - Built with Vite for optimal performance
- 🔒 **Secure** - Authentication and authorization ready

## 🚀 Tech Stack

- **Frontend Framework**: Vue 3 with Composition API
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom theming
- **State Management**: Pinia
- **Routing**: Vue Router
- **UI Components**: Custom components built with Radix UI primitives
- **Icons**: Lucide Icons
- **Data Visualization**: Chart.js
- **Data Tables**: TanStack Table
- **Form Handling**: Vue Form with Zod validation
- **Type Safety**: TypeScript

## 🛠️ Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn
- Git

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/aslamwebz/webz-admin.git
cd webz-admin
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the development server

```bash
npm run dev
# or
yarn dev
```

### 4. Build for production

```bash
npm run build
# or
yarn build
```

## 📁 Project Structure

```
src/
├── assets/          # Static assets (images, fonts, etc.)
├── components/      # Reusable UI components
├── composables/     # Vue 3 composables
├── layouts/         # Layout components
├── pages/           # Page components
│   ├── auth/       # Authentication pages
│   ├── dashboard/  # Dashboard pages
│   ├── products/   # Product management
│   ├── orders/     # Order management
│   ├── customers/  # Customer management
│   └── settings/   # Application settings
├── router/         # Vue Router configuration
├── stores/         # Pinia stores
├── styles/         # Global styles
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## 🎨 Theming

Webz Admin supports both light and dark modes. The theme can be toggled from the settings page or programmatically using the `useTheme` composable.

```typescript
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Vue.js](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)

---

Made with ❤️ by [Aslam Webz](https://github.com/aslamwebz)

