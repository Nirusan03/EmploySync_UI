# DigiRecruitez - Job Recruitment System

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Routing](#routing)
- [Components](#components)
- [License](#license)

## Introduction
DigiRecruitez is a modern job recruitment system designed for recruiters to manage job postings, applicant tracking, and meeting scheduling with ease.

## Features
- **User Authentication**: Secure login for recruiters.
- **Job Management**: Post, edit, and delete job listings.
- **Applicant Tracking**: View and manage applications for each job.
- **Meeting Scheduling**: Set up and manage interview meetings.
- **Responsive UI**: Designed with Tailwind CSS and Angular Material.
- **Secure API Integration**: Communicates with a Node.js backend.

## Technologies Used
- **Frontend**: Angular, TypeScript, Tailwind CSS, Angular Material
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **State Management**: LocalStorage (for auth token management)

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js (v16+)
- Angular CLI
- MongoDB

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/digirecruitez.git
   cd digirecruitez
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the Angular application:**
   ```bash
   ng serve
   ```

4. **Run the Node.js backend (if applicable):**
   ```bash
   cd backend
   node server.js
   ```

5. **Access the application:**
   - Open `http://localhost:4200` in your browser.

## Project Structure
```bash
├── src
│   ├── app
│   │   ├── components
│   │   │   ├── login
│   │   │   ├── company
│   │   │   ├── sidebar
│   │   │   ├── recruiter-job-applicant-view
│   │   │   ├── recruiter-request-view
│   │   │   ├── recruiter-meeting-details-dialog
│   │   │   └── recruiter-post-job
│   │   ├── services
│   │   ├── app.routes.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── assets
│   ├── environments
│   ├── index.html
│   ├── styles.css
│   └── main.ts
```

## Usage
### Login
- Navigate to `http://localhost:4200/login`
- Enter your credentials and click **Log in**
- On success, you will be redirected to the **Company** page.

### Posting a Job
- Click **Post Jobs** from the sidebar.
- Fill in the job details and save.

### Viewing Applications
- Click **Requests** from the sidebar.
- Select a job and view applicants.
- Shortlist applicants as needed.

### Scheduling Meetings
- Navigate to the **Shortlisted** tab.
- Click **Schedule** to add a meeting.
- Enter meeting details and save.

## API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/api/v1/auth/login` | User login |
| `GET` | `/api/v1/users/get/applicants` | Fetch job applicants |
| `POST` | `/api/v1/jobs/create` | Create a job posting |
| `GET` | `/api/v1/organization/:id/jobs` | Fetch job postings |

## Authentication
- The application uses **JWT-based authentication**.
- Token is stored in `localStorage`.
- Protected routes require authentication.

## Routing
| Path | Component | Purpose |
|------|----------|---------|
| `/login` | `LoginComponent` | User authentication |
| `/company` | `CompanyComponent` | Company details page |
| `/requests` | `RecruiterRequestViewComponent` | View job requests |
| `/requests/:jobId/applicants` | `RecruiterJobApplicantViewComponent` | View applicants for a job |
| `/requests/:jobId/meeting-details` | `RecruiterMeetingDetailsDialogComponent` | Schedule meeting |
| `/post-job/step-1` | `RecruiterPostJobForm1Component` | Job posting step 1 |

## Components
### **LoginComponent**
Handles user authentication and redirects to the **Company** page.

### **CompanyComponent**
Displays company details and allows editing company information.

### **SidebarComponent**
Provides navigation and user profile access.

### **RecruiterRequestViewComponent**
Lists job requests and allows navigation to applicants.

### **RecruiterJobApplicantViewComponent**
Displays job applicants and allows scheduling meetings.

### **RecruiterMeetingDetailsDialogComponent**
Handles scheduling interview meetings.

## License
This project is licensed under the **MIT License**.
