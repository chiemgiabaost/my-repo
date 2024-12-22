# Ecommerce Admin

This project is an admin dashboard for an e-commerce platform built with **Next.js**. It leverages technologies like **MongoDB**, **AWS S3**, and **TailwindCSS** to provide a robust and scalable admin interface.

---

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Scripts](#scripts)
4. [Usage](#usage)
5. [Technologies Used](#technologies-used)
6. [Contributing](#contributing)
7. [License](#license)

---

## Features

- User authentication with **NextAuth.js**
- Database management using **MongoDB** and **Mongoose**
- File uploads to **AWS S3**
- Responsive UI with **TailwindCSS**
- Drag-and-drop functionality using **Sortable.js**
- Alerts and notifications with **SweetAlert2**

---

## Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **Yarn** (preferred over npm for dependency management)
- A configured **MongoDB** instance
- AWS credentials for **S3**

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ecommerce-admin.git
   cd ecommerce-admin
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following. You can find or generate credentials in the respective service dashboards: AWS credentials from the AWS Management Console, MongoDB URI from the MongoDB Atlas dashboard, and others as required.

   ```env
   MONGODB_URI=<your_mongo_connection_string>
   NEXTAUTH_URL=<your_project_url>
   AWS_ACCESS_KEY_ID=<your_aws_access_key>
   AWS_SECRET_ACCESS_KEY=<your_aws_secret_key>
   S3_BUCKET_NAME=<your_s3_bucket_name>
   ```

4. Run the development server:
   ```bash
   yarn dev
   ```

---

## Scripts

Here are the scripts available in the project:

- `yarn dev`: Starts the development server on [http://localhost:3000](http://localhost:3000).
- `yarn build`: Builds the application for production.
- `yarn start`: Starts the production server.
- `yarn lint`: Lints the codebase using ESLint.

---

## Usage

1. Start the development server:
   ```bash
   yarn install
   ```
   ```bash
   yarn dev
   ```
2. Access the dashboard at [http://localhost:3000](http://localhost:3000).
3. Use the admin dashboard to manage products, orders, and other e-commerce features.

---

## Technologies Used

- **Frontend**: React, Next.js, TailwindCSS, Styled Components
- **Backend**: Next.js API routes, MongoDB, Mongoose, TypeORM
- **File Storage**: AWS S3
- **Utilities**: Axios, Multiparty, React-SortableJS, SweetAlert2

---

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Create a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

