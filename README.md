# BlogHub

This is a full-stack blog application that allows users to create accounts, log in, and create, edit, or delete blog posts. The application is built with a React frontend and a Node.js/Express backend, and it uses MongoDB for data storage. The app is deployed using Fly.io.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (sign up, log in, log out)
- Create, edit, and delete blog posts
- View a list of all blog posts
- View individual blog post details
- Responsive design

## Technologies

- **Frontend:**
  - React
  - Redux Toolkit
  - React Bootstrap
  - React Router
- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose
- **Deployment:**
  - Fly.io

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Fly.io account (for deployment)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/BlogHub.git
2. **Navigate to the project directory:**
   ```bash
   cd BlogHub
3. **Install dependencies for the frontend**
   ```bash
   cd frontend
   npm install
4. **Install dependencies for the backend:**
   ```bash
   cd ../backend
   npm install

## Running Locally

1. **Set up environment variables:** Create a `.env` file in the `backend` directory with the following content:
   ```bash
   PORT=5000
   MONGO_URI=your_monogdb_connection_string
   SECRET_KEY=your_secret_key

3. **Start the backend server:**
   ```bash
   npm start

4. **Start the frontend development server:**
   ```bash
   cd ../frontend
   npm run dev

  The frontend server will start on `http://localhost:3000`


## Deployment

The website is continuously integrated and deployed using GitHub Workflows. Changes pushed to the main branch are automatically built and deployed. You can view the live website at [BlogHub](https://bloglistappnikolasfrontend.fly.dev/)

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## Contact

For any questions or issues, please contact [nikolas.gustavson4@gmail.com](mailto:nikolas.gustavson4@gmail.com).

## License
This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/license/MIT) file for details.
