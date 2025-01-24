# 📝 TaskFlow Solutions - Backend

Welcome to the **TaskFlow Solutions** backend! This project is a RESTful API designed to streamline task and organization management for a growing organization. It includes authentication, organization creation, task management, and notification functionalities.

## 🚀 Live Server
**API Base URL:** [TaskFlow Backend](https://task-management-server-delta-beige.vercel.app/)

## 📜 Postman API Documentation
Explore the endpoints in detail: [Postman Documentation](https://documenter.getpostman.com/view/31300739/2sAYQfDV2g)


---

## 📌 Requirements Analysis [Documents](https://docs.google.com/document/d/1ArA0CrhXVUP8d4UlJnwrGLES0ZLupxa-LBlmOQicaF0/edit?usp=sharing)

### **Functional Requirements:**

#### Authentication & Authorization:
- **User Registration and Login**: Secure authentication with JWT.
- **Role-Based Access Control**:
  - **Admin/Owner**: Manage organizations, invite users, and handle tasks.
  - **Member**: View and update assigned tasks.

#### Organization Management:
- **Admin**:
  - Create and manage organizations.
  - Send invitations to users.
- **Users**:
  - Accept or decline organization invitations.

#### Task Management:
- **CRUD Operations**:
  - Create, read, update, and delete tasks.
- **Task Assignment**:
  - Assign tasks to individuals or groups.
- **Task Filtering**:
  - Filter tasks by priority (High, Medium, Low).
- **Deadlines and Notifications**:
  - Validate task deadlines.
  - Send notifications for approaching deadlines.

### **Models**
- **User**: 
  - `_id`, `username`, `email`, `password`, `role`, `status`, `createdAt`, `updatedAt`.
- **Organization**: 
  - `_id`, `name`, `admin`, `members`, `createdAt`, `updatedAt`.
- **Task**: 
  - `_id`, `title`, `description`, `priority`, `assignees`, `deadline`, `status`, `createdBy`, `organization`, `createdAt`, `updatedAt`.
- **Invitation**: 
  - `_id`, `organization`, `assignedTo`, `status`, `createdAt`, `updatedAt`.

### **Endpoints**
#### User Authentication:
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh-token`

#### Organization Management:
- `POST /organizations/create`
- `POST /organizations/:id/invite`
- `GET /organizations/:id/invitations`
- `PATCH /invitations/:id/respond`

#### Task Management:
- `POST /tasks/create-task`
- `POST /tasks/create-group-task`
- `GET /tasks/get-task`
- `POST /tasks/complete-task/:taskId`

---

## 🛠️ Tech Stack
- **Framework**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Validation**: Zod
- **Notifications**: Node-cron
- **Hashing**: Bcrypt

---

## 🏃‍♂️ How to Run the Project Locally

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/your-username/taskflow-backend.git
   cd taskflow-backend
   ```

2. **Install Dependencies**  
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**  
   Create a `.env` file in the root directory and configure the following variables:
   ```bash
   # Create a .env file and configure the following variables:
    echo "PORT=5000" >> .env
    echo "DATABASE_URL=your_database_url_here" >> .env
    echo "BCRYPT_SALT_ROUNDS=12" >> .env
    echo "DEFAULT_PASS=your_default_password_here" >> .env
    echo "JWT_ACCESS_SECRET=your_jwt_access_secret_here" >> .env
    echo "JWT_ACCESS_EXPIRES_IN=1d" >> .env
    echo "JWT_REFRESH_SECRET=your_jwt_refresh_secret_here" >> .env
    echo "JWT_REFRESH_EXPIRES_IN=1d" >> .env
    echo "NODE_ENV=production" >> .env
   ```

4. **Run the Server**  
   Start the development server with:
   ```bash
   npm start
   ```

5. **Testing the Endpoints**  
   Use the provided Postman Documentation for testing the endpoints.

---

## 📖 Project Workflow

### Authentication & Authorization:
- Users can register, log in, and securely authenticate with JWT.
- Admin/Owner roles manage the organization, while Members manage assigned tasks.

### Organization Management:
- Admin creates an organization and invites users via email simulation.
- Users can accept or decline invitations.

### Task Management:
- Admins create tasks, assign them to users or groups, and set priorities.
- Tasks can be filtered by priority and have deadlines with notifications.

### Notification System:
- Cron jobs send reminders for tasks nearing deadlines.

---

## 🤝 Contribution Guidelines

1. **Fork the Repository**  
   Create a new branch for your feature.

2. **Commit Your Changes**  
   Use proper commit messages.

3. **Submit a Pull Request**  
   For review.

---

## 📧 Contact

If you have any questions or need further clarification, feel free to reach out.
- hrshihab10@gmail.com
