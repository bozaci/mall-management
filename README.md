# Mall Management

## Table of Contents

1. [Introduction](#introduction)
2. [Technologies Used](#technologies-used)
3. [Project Setup](#project-setup)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running the Project](#running-the-project)
3. [Folder Structure](#folder-structure)
5. [Contributing](#contributing)
6. [License](#license)

---

## Introduction

**Mall Management** is a comprehensive solution built on **KeystoneJS**, designed to efficiently manage shopping malls. It offers features like store management, customer engagement, and detailed analytics, making mall operations seamless.

## Technologies Used

- **Framework**: KeystoneJS
- **Frontend**: Next.js, TypeScript, SCSS
- **Database**: MySQL (via Prisma ORM)
- **Others**: GraphQL API

## Project Setup

### Prerequisites

Ensure the following tools are installed on your system:

- Node.js (v16 or later)
- npm or yarn (latest version)
- MySQL (running instance)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/bozaci/mall-management.git
   cd mall-management
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file by copying the `.env.example` file:

   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your specific configuration:

   ```env
   # Database
   DATABASE_URL=YOUR_MYSQL_DATABASE_URL

   # Session
   SESSION_SECRET=YOUR_SESSION_SECRET_KEY
   ```

5. Initialize the database schema:

   ```bash
   npx prisma db push
   ```

### Running the Project

1. Start the KeystoneJS server:

   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000` to access the admin UI.

## Folder Structure

```plaintext
mall-management/
├── admin/
│   ├── components/
│   │   ├── helpers/
│   │   └── ui/
│   ├── graphql/
│   │   └── queries/
│   ├── lib/
│   │   └── analytics/
│   ├── pages/
│   ├── utils/
│   └── config.ts
├── lists/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── .env.example
├── keystone.ts
├── schema.ts
├── package.json
├── README.md
├── initial_database.sql
└── schema.graphql
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
