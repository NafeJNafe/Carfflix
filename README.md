# Carfflix 🚗💨

**Carfflix** is a premium home-pickup vehicle maintenance platform. It bridges the gap between vehicle owners and professional garages by providing a seamless, on-demand logistics service for car repairs and servicing.

## 🌟 The Vision

The traditional car repair experience is inconvenient and time-consuming. Carfflix redefines this by allowing users to schedule a professional pickup of their vehicle from their doorstep. Whether it's routine maintenance or a specific mechanical issue, Carfflix ensures your car gets the attention it needs without disrupting your day.

## 🚀 Key Features

- **Home Pickup Service**: Schedule a date and time for your vehicle to be picked up and taken to the workshop.
- **Smart Appointment Scheduling**: Provide vehicle details (model, year, license plate) and describe "symptoms" or maintenance needs.
- **Google Maps Integration**: Select your preferred garage from an interactive map showing nearby authorized workshops. (Coming Soon)
- **Real-time Status**: Track your appointment from booking to completion.

## 🛠 Tech Stack

This project is built as a **Turborepo** monorepo:

- **Frontend**: React (Vite) + TailwindCSS + Lucide React
- **Backend**: Express.js + Node.js
- **Database**: PostgreSQL with Prisma ORM
- **Monorepo Management**: Turbo

---

## 🏃‍♂️ Getting Started

This project uses **Yarn** as the primary package manager.

### Prerequisites

- Node.js >= 18
- Yarn
- PostgreSQL instance

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   ```

### Development

Run all apps (client & server) in development mode:

```bash
yarn dev
```

### Build

To build all apps and packages:

```bash
yarn build
```

---

## 🗺 Roadmap (MVP to Final Product)

### Phase 1: MVP (Current) ✅
- Basic appointment flow.
- Client and Vehicle registration.
- Garage listing.
- Appointment confirmation view.

### Phase 2: UI/UX Excellence 🏗️ (Next Step)
- Overhaul the design with a premium, modern aesthetic.
- Interactive Google Maps selection for Garages.
- Improved validation and user feedback.

### Phase 3: Automation & Communication 📧
- Email confirmation system (NodeMailer/SendGrid).
- Garage-side dashboard to accept/confirm appointments.
- Status notification updates for the user.

---

## ⚖️ License

Private - All rights reserved.
