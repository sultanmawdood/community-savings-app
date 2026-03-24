# Community Savings App (Digital ROSCA)

A complete, production-ready frontend web application for managing community savings with share-based contributions, payment verification, loans, and monthly giveaways.

## Features

### Member Features
- **My Savings Dashboard**: View total shares, value, and penalties
- **Pay Shares**: Submit payments with MoMo details and screenshot upload
- **Request Loan**: Request loans with guarantor selection and real-time validation

### Accountant Features
- **Verify Payments**: Review and verify/flag payment submissions
- **Loan Approvals**: View and manage loan requests

### Admin Features
- **Dashboard**: Overview of total members, shares, and giveaway pool
- **User Management**: View and manage all users
- **Run Giveaway**: Spin to select monthly winner with animation

## Tech Stack

- **React** (Vite)
- **Tailwind CSS** (Mobile-first design)
- **Framer Motion** (Animations)
- **Lucide React** (Icons)
- **React Dropzone** (File uploads)

## Installation

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

## Build for Production

```bash
npm run build
```

## Role Switching

Use the role dropdown in the navbar to switch between:
- Member
- Accountant
- Admin

Each role has different navigation menus and permissions.

## Key Concepts

- **1 Share = 2,000 RWF**
- **Penalty Rate = 5% per day**
- **Giveaway Winner = 95% of pool**
- **Loan Maximum = Borrower + Guarantor savings**

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── data/           # Mock data
└── App.jsx         # Main application
```
