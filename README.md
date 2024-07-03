# Admin Panel Application

This is a MERN (MongoDB, Express.js, React.js, Node.js) stack Admin Panel application with user authentication and admin panel functionalities.

## Prerequisites

Before running this application locally, ensure you have the following installed:

- Node.js (v12.x or later)
- MongoDB (Make sure MongoDB server is running)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sDEV-eloper/Admin-Panel-Assessment
   cd Admin-Panel-Assessment
   cd client && npm install
   cd .. && npm install

2. **Run Server and Client:**

   ```bash
   
   cd client
   npm run dev

   cd .. 
   cd server
   nodemon server.js
   
3. **Create .env to server directory:**

PORT=5000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>

