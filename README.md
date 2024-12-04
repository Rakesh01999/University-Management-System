Here's a well-organized **README.md** template for your project based on the details you've shared:

---

# **Student Management System (Backend)**

A backend service for managing students, semesters, and other related entities, built using **Node.js**, **Express**, **Mongoose**, and **Zod** for validation.

---

## **Features**

### **Core Functionalities**
1. **Student Management**:
   - Create, read, update, and delete student profiles.
   - Store detailed student information such as:
     - Name, gender, date of birth.
     - Contact details (email, phone, emergency contact).
     - Guardian and local guardian information.
     - Admission semester (linked to `AcademicSemester`).

2. **Academic Semester Management**:
   - CRUD operations for academic semesters.
   - Supports fields such as title (e.g., `Fall 2024`), start date, and end date.

3. **Authentication**:
   - Password-based login for students.
   - JWT for secure user sessions.
   - Encrypted password storage using **bcrypt.js**.

4. **Validation**:
   - Request validation using **Zod**.
   - Ensures all required fields are properly structured and typed.

---

## **Project Structure**

### **Directory Overview**
```
root/
├── controllers/        # Controllers for handling request logic
├── models/             # Mongoose models (Student, AcademicSemester, etc.)
├── routes/             # API route definitions
├── middlewares/        # Middleware for authentication, error handling, etc.
├── utils/              # Utility functions (e.g., validation schemas)
├── config/             # Application configuration (DB, environment)
├── README.md           # Project documentation
├── package.json        # Project metadata and dependencies
└── .env.example        # Example environment variables file
```

---

## **API Endpoints**

### **Student API**
| Method | Endpoint             | Description                     | Request Body                                |
|--------|-----------------------|---------------------------------|--------------------------------------------|
| POST   | `/api/students`       | Create a new student            | `{ student: { ... } }`                     |
| GET    | `/api/students/:id`   | Get details of a specific student | N/A                                        |
| PUT    | `/api/students/:id`   | Update a student's information  | `{ student: { ... } }`                     |
| DELETE | `/api/students/:id`   | Delete a student                | N/A                                        |

### **Academic Semester API**
| Method | Endpoint                | Description                     | Request Body                                |
|--------|--------------------------|---------------------------------|--------------------------------------------|
| POST   | `/api/semesters`         | Create a new academic semester  | `{ title: "Fall 2024", startDate, endDate }`|
| GET    | `/api/semesters`         | List all academic semesters     | N/A                                        |
| GET    | `/api/semesters/:id`     | Get details of a specific semester | N/A                                    |
| PUT    | `/api/semesters/:id`     | Update semester details         | `{ title, startDate, endDate }`           |
| DELETE | `/api/semesters/:id`     | Delete a semester               | N/A                                        |

---

## **Setup and Installation**

### **Prerequisites**
- Node.js (v14+)
- MongoDB (local or cloud instance)
- Postman or any REST API client for testing.

### **Steps**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/student-management-system.git
   cd student-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the project root.
   - Add the following variables:
     ```env
     PORT=5000
     MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/yourDB
     JWT_SECRET=your_jwt_secret
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Test the APIs using Postman or any other API client.

---

## **Validation Rules**

### **Student Schema (Zod)**
```typescript
const StudentSchema = z.object({
    id: z.string(),
    password: z.string(),
    name: z.object({
        firstName: z.string(),
        middleName: z.optional(z.string()),
        lastName: z.string(),
    }),
    gender: z.enum(['male', 'female']),
    dateOfBirth: z.string(),
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: z.string(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: z.object({
        fatherName: z.string(),
        fatherOccupation: z.string(),
        fatherContactNo: z.string(),
        motherName: z.string(),
        motherOccupation: z.string(),
        motherContactNo: z.string(),
    }),
    localGuardian: z.object({
        name: z.string(),
        occupation: z.string(),
        contactNo: z.string(),
        address: z.string(),
    }),
    profileImg: z.string().url(),
    isActive: z.string(),
    admissionSemester: z.string().refine((value) => ObjectId.isValid(value), { message: "Invalid ObjectId" })
});
```

---

## **Known Issues**

1. **`Cast to ObjectId failed`**:
   - Ensure the `admissionSemester` field receives a valid ObjectId from the `AcademicSemester` collection.

2. **Validation Errors**:
   - Check that all required fields are included in the request body.

---

## **Future Enhancements**
- Add pagination and filtering to list endpoints.
- Improve error handling for better user feedback.
- Integrate student performance tracking.
- Implement role-based authentication for admin, student, and guest users.

---

## **License**
This project is licensed under the MIT License. Feel free to use and contribute!

---
