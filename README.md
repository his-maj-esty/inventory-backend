# Inventory Backend

## Project Overview

This project is the backend for the Inventory system. It is built using Node.js, Express, and Drizzle ORM. The project also leverages Turso for database management.

## Prerequisites

Before setting up the project, ensure that you have the following installed:

- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher)
- **Turso CLI** (for managing your database)

## Setting Up the Project

### 1. Clone the Repository

```bash
git clone https://github.com/his-maj-esty/inventory-backend
cd inventory-backend
```

### 2. Install Dependencies

Install the necessary dependencies using npm:

```bash
npm install
```

### 3. Obtain Database URL and Token

To connect to your Turso database, you'll need to obtain the database URL and token:

1. Go to [turso.tech](https://turso.tech) and log in to your account.
2. Create a new database or select an existing one.
3. Obtain the **Database URL** and **Database Token** from the dashboard.

### 4. Set Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

```bash
DB_URL=<your-database-url>
DB_AUTH_TOKEN=<your-database-token>
```

### 5. Generate and Migrate the Database

Run the following commands to generate the database schema and apply migrations:

```bash
npm run db:generate
npm run db:migrate
```

### 6. Start the Development Server

To start the development server, run:

```bash
npm run dev
```

