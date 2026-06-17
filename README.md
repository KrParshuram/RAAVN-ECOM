# RAAVN

> **Not your god. Not your villain.**
>
> A premium streetwear e-commerce platform built with Next.js, Clerk Authentication, Supabase, Redux Toolkit, and Tailwind CSS.

---

# Overview

RAAVN is a modern fashion commerce platform inspired by premium streetwear brands. It focuses on storytelling, minimalism, and exclusive product drops rather than traditional online shopping.

Instead of simply selling clothing, RAAVN presents each product as part of a larger narrative.

The platform provides:

- Premium product experience
- Limited edition drops
- Authentication
- Wishlist
- Shopping cart
- Recently viewed history
- User account dashboard
- Responsive mobile-first design

---

# Live Features

- Premium Landing Page
- Limited Drops
- Product Collections
- Product Details
- Shopping Cart
- Wishlist
- Recently Viewed
- User Authentication
- User Dashboard
- Responsive Design
- Smooth Animations
- Protected Routes

---

# Tech Stack

## Frontend

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons

---

## Backend

- Next.js Server Actions
- Supabase
- PostgreSQL

---

## Authentication

- Clerk

Features

- Login
- Sign Up
- User Profile
- Session Management
- Protected Routes

---

## State Management

Redux Toolkit

Stores

- Shopping Cart
- UI State

---

## Storage

Supabase Storage

Used for

- Product Images
- Collection Images

---

# Folder Structure

```
app/
│
├── account/
├── cart/
├── checkout/
├── collections/
├── drops/
├── login/
├── sign-up/
├── products/
├── recently-viewed/
├── wishlist/
│
├── globals.css
├── layout.tsx
└── page.tsx

components/
│
├── Header.tsx
├── Footer.tsx
├── Hero.tsx
├── ProductCard.tsx
├── RecentProducts.tsx
├── WishlistButton.tsx
├── CartButton.tsx
├── DropSection.tsx
└── ...

lib/
│
├── supabase.ts
├── cart.ts
├── wishlist.ts
├── recentlyViewed.ts
├── products.ts
└── drops.ts

store/
│
├── cartSlice.ts
├── store.ts
└── provider.tsx

public/

```

---

# Features

---

## Authentication

Powered by Clerk.

Features

- Secure Login
- Secure Sign Up
- User Avatar
- Session Handling
- Protected Pages

Protected Pages

- Account
- Wishlist
- Recently Viewed

---

## Product System

Each product contains

- Title
- Price
- Images
- Story
- Statement
- Sizes
- Slug

---

## Limited Drops

Products belong to drops.

Each drop contains

- Name
- Release Date
- Products
- Hero Images

Designed for limited edition releases.

---

## Shopping Cart

Built using Redux Toolkit.

Features

- Add Product
- Remove Product
- Update Quantity
- Persistent State
- Live Cart Counter

---

## Wishlist

Users can

- Save Products
- Remove Products
- Access Wishlist

Protected by authentication.

---

## Recently Viewed

Every visited product is automatically stored.

Features

- View History
- Continue Shopping
- Personal Recommendations

---

## Product Details

Every product includes

- Image Gallery
- Story
- Statement
- Price
- Available Sizes

---

## Responsive Design

Optimized for

- Desktop
- Tablet
- Mobile

---

## Animations

Built using Framer Motion.

Includes

- Hero Animations
- Menu Animations
- Hover Effects
- Fade Animations
- Scale Effects

---

# Design Philosophy

RAAVN is intentionally minimal.

Instead of overwhelming users with UI, the focus remains on

- Typography
- Imagery
- Storytelling
- Motion

Inspired by brands like

- Fear of God
- Aime Leon Dore
- Represent
- Corteiz
- Yeezy

---

# Authentication Flow

```

Guest
│
├── Login
├── Sign Up
│
▼

Authenticated User
│
├── Wishlist
├── Account
├── Recently Viewed
└── Checkout

```

---

# Database

Main Tables

```
products

drops

wishlists

recently_viewed

profiles

```

Relationships

```
Drop
│
└── Products

User
│
├── Wishlist
├── Recently Viewed
└── Orders

```

---

# Environment Variables

Create a `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

CLERK_SECRET_KEY=
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/yourusername/raavn.git
```

Go inside

```bash
cd raavn
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# Scripts

```bash
npm run dev

npm run build

npm run start

npm run lint
```

---

# Performance

Optimizations include

- Server Components
- Image Optimization
- Lazy Loading
- Route Segments
- Dynamic Rendering
- Optimized Fonts
- Suspense Boundaries

---

# Security

- Clerk Authentication
- Server-side Session Validation
- Protected Routes
- Supabase Row Level Security
- Secure API Access

---

# Current Features

- Authentication
- Landing Page
- Collections
- Product Details
- Wishlist
- Recently Viewed
- Shopping Cart
- Responsive Layout
- Account Dashboard

---

# Future Roadmap

## Commerce

- Stripe Payments
- Razorpay
- Orders
- Invoice Generation

---

## User Experience

- Product Reviews
- Ratings
- Size Guide
- Order Tracking

---

## Community

- User Profiles
- Community Feed
- Outfit Sharing
- Product Discussions

---

## AI

- Outfit Recommendations
- Personalized Feed
- Smart Search
- AI Fashion Assistant

---

## Admin

- Admin Dashboard
- Analytics
- Inventory
- Drop Management

---

# Screenshots

```
screenshots/

home.png

product.png

wishlist.png

account.png

cart.png

login.png

```

---

# Deployment

Recommended Platforms

- Vercel
- Supabase
- Clerk

Deployment is fully compatible with the Next.js App Router.

---

# Contributing

Contributions are welcome.

Steps

1. Fork the repository

2. Create a feature branch

```
git checkout -b feature/new-feature
```

3. Commit changes

```
git commit -m "Added feature"
```

4. Push

```
git push origin feature/new-feature
```

5. Open a Pull Request

---

# Author

**Parshuram Kumar**

B.Tech Computer Science Engineering

Full Stack Developer

Machine Learning Enthusiast

GitHub

LinkedIn

Portfolio

---

# License

This project is licensed under the MIT License.

---

# RAAVN

> "We don't chase trends.
>
> We create statements."

Built with ❤️ using Next.js, Clerk, Supabase and TypeScript.
