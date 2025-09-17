# Claim Processing System - Wiki

## 📋 Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Features & Functionality](#features--functionality)
- [Technical Stack](#technical-stack)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [UI Components & Pages](#ui-components--pages)
- [Database Schema](#database-schema)
- [Development Guide](#development-guide)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

The Claim Processing System is a full-stack web application designed for managing insurance claims and user administration. It provides a modern, responsive interface for claim processing with comprehensive user management capabilities.

### Key Capabilities
- **Claim Management**: Create, view, edit, and delete insurance claims
- **User Administration**: Complete CRUD operations for user management
- **Role-Based Access**: Admin and user role differentiation
- **Real-time Data**: Live updates and validation
- **Professional UI**: Material-UI components with responsive design

---

## 🏗️ Architecture

### System Architecture
```
┌─────────────────┐    HTTP/REST API    ┌─────────────────┐
│   React Client  │ ◄─────────────────► │  Express Server │
│   (Port 3000)   │                     │   (Port 4000)   │
└─────────────────┘                     └─────────────────┘
                                                   │
                                                   ▼
                                        ┌─────────────────┐
                                        │   LowDB JSON    │
                                        │   Database      │
                                        └─────────────────┘
```

### Directory Structure
```
TestingAI/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Main application pages
│   │   ├── App.js          # Main app component
│   │   └── index.js        # Entry point
│   ├── public/             # Static assets
│   └── package.json        # Client dependencies
├── server/                 # Express Backend
│   ├── index.js            # Server entry point
│   ├── db.json             # JSON database file
│   └── package.json        # Server dependencies
└── WIKI.md                 # This documentation
```

---

## ✨ Features & Functionality

### 🏠 Dashboard (Claim Summary)
- **Comprehensive Claim View**: Display all claims in a professional table format
- **Enhanced Navigation**: Material-UI Paper-based menu bar with elevation
- **Table Sorting**: Click any column header to sort (ascending/descending)
- **Pagination**: 10 claims per page with Material-UI pagination controls
- **Action Icons**: Professional edit/delete icons with tooltips
- **Responsive Design**: Adapts to different screen sizes

### 📝 Claim Management
- **Multi-Step Form**: 3-step claim creation process
  - Step 1: Client Information
  - Step 2: Claim Details  
  - Step 3: Review & Submit
- **Form Validation**: Real-time validation with error messages
- **Field Requirements**: All fields mandatory with proper formatting
- **Edit Functionality**: Modify existing claims with pre-populated data
- **Delete Confirmation**: Safety dialog before claim deletion

### 👥 User Management
- **Separated Interface**: Distinct sections for adding users and managing existing ones
- **User Creation**: Add new users with username/password/role
- **User Listing**: Paginated table showing all users (5 per page)
- **Role Management**: Admin/User role assignment and modification
- **Edit Users**: Modal dialog for updating user roles
- **Delete Users**: Confirmation dialog for safe user removal
- **Professional UI**: Material-UI components with consistent styling

### 🎨 UI/UX Enhancements
- **Consistent Headers**: Unified design across all pages with navigation
- **Professional Styling**: Material-UI Paper containers with elevation
- **Form Validation**: Real-time feedback with regex patterns for email/phone
- **Loading States**: Progress indicators during API calls
- **Success/Error Messages**: User feedback for all operations
- **Responsive Layout**: Mobile-friendly design patterns

---

## 🛠️ Technical Stack

### Frontend Technologies
- **React 18.x**: Modern functional components with hooks
- **Material-UI (MUI) 5.x**: Professional component library
- **React Router**: Client-side routing and navigation
- **Fetch API**: HTTP client for API communication
- **CSS-in-JS**: Material-UI's sx prop styling system

### Backend Technologies
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **LowDB**: Lightweight JSON database
- **CORS**: Cross-origin resource sharing middleware
- **ES Modules**: Modern JavaScript module system

### Development Tools
- **npm**: Package management
- **Webpack**: Module bundler (via Create React App)
- **Babel**: JavaScript transpiler
- **ESLint**: Code linting and formatting

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/vipin61rana-lab/TestingAI.git
   cd TestingAI
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd server
   npm start
   ```
   - Server runs on: http://localhost:4000
   - API endpoints available at: http://localhost:4000/api/*

2. **Start the Frontend Client**
   ```bash
   cd client
   npm start
   ```
   - Client runs on: http://localhost:3000
   - Automatically opens in browser

### Access Points
- **Main Application**: http://localhost:3000
- **API Base URL**: http://localhost:4000/api
- **Database File**: `server/db.json` (auto-created with seed data)

---

## 📚 API Documentation

### Base URL
```
http://localhost:4000/api
```

### Claims Endpoints

#### GET /claims
- **Description**: Retrieve all claims
- **Response**: Array of claim objects
- **Example**:
  ```json
  [
    {
      "id": 1,
      "clientName": "John Doe",
      "email": "john@example.com",
      "phone": "123-456-7890",
      "claimType": "Auto",
      "claimAmount": 5000,
      "description": "Vehicle accident claim",
      "status": "Pending",
      "dateCreated": "2025-09-17T10:00:00Z"
    }
  ]
  ```

#### POST /claims
- **Description**: Create a new claim
- **Body**: Claim object without ID
- **Response**: Created claim with assigned ID

#### PUT /claims/:id
- **Description**: Update an existing claim
- **Parameters**: `id` - Claim ID
- **Body**: Updated claim data
- **Response**: Updated claim object

#### DELETE /claims/:id
- **Description**: Delete a claim
- **Parameters**: `id` - Claim ID
- **Response**: Success message

### Users Endpoints

#### GET /users
- **Description**: Retrieve all users
- **Response**: Array of user objects
- **Example**:
  ```json
  [
    {
      "username": "admin",
      "role": "admin"
    },
    {
      "username": "user1",
      "role": "user"
    }
  ]
  ```

#### POST /users
- **Description**: Create a new user
- **Body**: 
  ```json
  {
    "username": "newuser",
    "password": "password123",
    "role": "user"
  }
  ```
- **Response**: Created user object (password excluded)

#### PUT /users/:username
- **Description**: Update user role
- **Parameters**: `username` - Username to update
- **Body**: 
  ```json
  {
    "role": "admin"
  }
  ```
- **Response**: Updated user object

#### DELETE /users/:username
- **Description**: Delete a user
- **Parameters**: `username` - Username to delete
- **Response**: Success message

### Error Responses
All endpoints return appropriate HTTP status codes:
- **200**: Success
- **201**: Created
- **400**: Bad Request
- **404**: Not Found
- **500**: Internal Server Error

---

## 🖥️ UI Components & Pages

### Page Structure

#### 1. Claim Summary (`/`)
- **File**: `client/src/pages/ClaimSummary.js`
- **Features**:
  - Enhanced Paper navigation bar with elevation
  - Sortable table columns with TableSortLabel
  - Pagination with 10 items per page
  - Professional action icons (Edit/Delete)
  - Responsive design with grid layout

#### 2. New Claim (`/new-claim`)
- **File**: `client/src/pages/NewClaim.js`
- **Features**:
  - Multi-step form with navigation
  - Comprehensive form validation
  - Email/phone regex validation
  - Step-by-step progression blocking
  - Consistent header design

#### 3. Edit Claim (`/edit-claim/:id`)
- **File**: `client/src/pages/EditClaim.js`
- **Features**:
  - Pre-populated form fields
  - Same validation as new claim
  - Update functionality
  - Navigation back to summary

#### 4. Add User (`/add-user`)
- **File**: `client/src/pages/AddUser.js`
- **Features**:
  - Separated sections with Paper containers
  - User creation form with validation
  - Paginated user listing (5 per page)
  - Edit/delete modals with confirmation
  - Role management dropdown

#### 5. Admin Users (`/admin-users`)
- **File**: `client/src/pages/AdminUsers.js`
- **Features**:
  - Consistent header styling
  - User overview and management
  - Administrative controls

### Material-UI Components Used
- **Paper**: Container components with elevation
- **TextField**: Form inputs with validation
- **Button**: Action buttons with variants
- **Table**: Data display with sorting
- **Pagination**: Page navigation controls
- **Dialog**: Modal dialogs for confirmations
- **IconButton**: Action icons (Edit/Delete)
- **Typography**: Text styling and hierarchy
- **Grid**: Responsive layout system
- **Box**: Layout and spacing utility

---

## 💾 Database Schema

### Claims Table Structure
```json
{
  "id": "number (auto-increment)",
  "clientName": "string (required)",
  "email": "string (required, email format)",
  "phone": "string (required, phone format)",
  "claimType": "string (required)",
  "claimAmount": "number (required)",
  "description": "string (required)",
  "status": "string (default: 'Pending')",
  "dateCreated": "ISO string (auto-generated)"
}
```

### Users Table Structure
```json
{
  "username": "string (required, unique)",
  "password": "string (required, not returned in API)",
  "role": "string (required: 'user' | 'admin')"
}
```

### Seed Data
The application automatically creates seed data on startup:

**Claims (5 records)**:
1. Auto Insurance - John Doe
2. Health Insurance - Jane Smith
3. Home Insurance - Bob Johnson
4. Life Insurance - Alice Brown
5. Travel Insurance - Charlie Wilson

**Users (2 records)**:
1. admin (role: admin)
2. user1 (role: user)

---

## 👨‍💻 Development Guide

### Code Structure Guidelines

#### React Components
- **Functional Components**: Use React hooks (useState, useEffect)
- **Material-UI Styling**: Use sx prop for component styling
- **State Management**: Local state with useState for form data
- **API Integration**: Fetch API for HTTP requests
- **Error Handling**: Try-catch blocks with user feedback

#### Express Server
- **ES Modules**: Modern import/export syntax
- **Middleware**: CORS for cross-origin requests
- **Database**: LowDB for JSON file storage
- **Error Handling**: Proper HTTP status codes
- **Data Validation**: Server-side validation for all inputs

### Key Files Explained

#### `server/index.js`
- Express server setup with middleware
- API route definitions
- LowDB database initialization
- Seed data creation
- Error handling middleware

#### `client/src/App.js`
- React Router setup
- Route definitions
- Main application structure

#### `client/src/pages/ClaimSummary.js`
- Main dashboard component
- Table with sorting and pagination
- Enhanced navigation bar
- API integration for claims

#### `client/src/pages/AddUser.js`
- User management interface
- Separated sections design
- CRUD operations for users
- Modal dialogs for edit/delete

### Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Check for updates
npm outdated
```

### Adding New Features

1. **Backend API Endpoint**:
   ```javascript
   app.get('/api/new-endpoint', (req, res) => {
     // Implementation
   });
   ```

2. **Frontend Component**:
   ```javascript
   import React, { useState } from 'react';
   import { Paper, Typography } from '@mui/material';
   
   function NewComponent() {
     return (
       <Paper elevation={3}>
         <Typography variant="h5">New Feature</Typography>
       </Paper>
     );
   }
   ```

3. **Add Route**:
   ```javascript
   <Route path="/new-feature" element={<NewComponent />} />
   ```

---

## 🔧 Troubleshooting

### Common Issues

#### Port Already in Use
**Problem**: `EADDRINUSE: address already in use :::3000` or `:::4000`

**Solution**:
```bash
# Kill processes on port 3000
lsof -ti:3000 | xargs kill -9

# Kill processes on port 4000
lsof -ti:4000 | xargs kill -9
```

#### Module Not Found
**Problem**: `Module not found` errors

**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Database File Issues
**Problem**: Database not updating or missing seed data

**Solution**:
```bash
# Delete and restart server to regenerate
rm server/db.json
cd server && npm start
```

#### CORS Errors
**Problem**: Cross-origin request blocked

**Solution**: Ensure server includes CORS middleware:
```javascript
app.use(cors());
```

### Performance Tips

1. **React Optimization**:
   - Use React.memo for expensive components
   - Implement proper key props in lists
   - Avoid inline functions in render methods

2. **API Optimization**:
   - Implement pagination for large datasets
   - Add request caching where appropriate
   - Use proper HTTP status codes

3. **Database Optimization**:
   - Consider indexing for large datasets
   - Implement data validation
   - Regular backup strategies

### Monitoring & Logging

#### Client-Side Debugging
- Open browser DevTools (F12)
- Check Console for errors
- Network tab for API calls
- React Developer Tools extension

#### Server-Side Debugging
- Check terminal output for errors
- Add console.log statements
- Use Node.js debugger
- Monitor API response times

---

## 📞 Support & Resources

### Documentation Links
- [React Documentation](https://reactjs.org/docs)
- [Material-UI Documentation](https://mui.com/)
- [Express.js Documentation](https://expressjs.com/)
- [LowDB Documentation](https://github.com/typicode/lowdb)

### Repository Information
- **Repository**: https://github.com/vipin61rana-lab/TestingAI
- **Owner**: vipin61rana-lab
- **Branch**: main

### Version Information
- **Node.js**: v14+
- **React**: 18.x
- **Material-UI**: 5.x
- **Express**: 4.x
- **LowDB**: 7.x

---

## 📝 Changelog

### Recent Updates
- ✅ Enhanced UI with professional Material-UI components
- ✅ Added comprehensive form validation
- ✅ Implemented table sorting and pagination
- ✅ Created separated user management interface
- ✅ Added edit/delete functionality for users and claims
- ✅ Consistent header design across all pages
- ✅ Responsive design improvements

### Future Enhancements
- [ ] Authentication and session management
- [ ] Advanced search and filtering
- [ ] Data export functionality
- [ ] Email notifications
- [ ] Audit logging
- [ ] Advanced reporting features

---

*Last Updated: September 17, 2025*