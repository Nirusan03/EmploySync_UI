# DigiRecruitez - Job Recruitment System

## Backend Repository
[EmploySyncBackend](https://github.com/itzmalith/EmploySyncBackend)

## Table of Contents
- [DigiRecruitez - Job Recruitment System](#digirecruitez---job-recruitment-system)
  - [Backend Repository](#backend-repository)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
  - [Project Structure](#project-structure)
  - [Usage](#usage)
    - [Recruiter Flow](#recruiter-flow)
    - [Applicant Flow](#applicant-flow)
  - [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Routing](#routing)
  - [Components](#components)
  - [License](#license)

## Introduction
DigiRecruitez is a modern job recruitment platform that facilitates seamless job posting, applicant management, team collaboration, and meeting scheduling. The system is built for recruiters and applicants to connect in a streamlined and secure manner.

## Features
- **User Authentication**: Secure login/signup for applicants and recruiters
- **Job Management**: Multi-step job posting, edit and delete jobs
- **Applicant Tracking**: Apply, shortlist, and view applicant details
- **Meeting Scheduling**: Setup and manage interview meetings
- **Team Management**: Recruiters can view team members of the same organization
- **Notification System**: Applicants receive job updates
- **Responsive UI**: Powered by Tailwind CSS and Angular Material

## Technologies Used
- **Frontend**: Angular, TypeScript, Tailwind CSS, Angular Material
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **State Management**: LocalStorage for storing tokens and session data

## Installation
### Prerequisites
- Node.js (v16+)
- Angular CLI
- MongoDB

### Setup
1. **Clone the repository**
```bash
git clone https://github.com/yourusername/digirecruitez.git
cd digirecruitez
```

2. **Install dependencies**
```bash
npm install
```

3. **Run Angular app**
```bash
ng serve
```

4. **Run backend server**
```bash
cd backend
node server.js
```

5. **Access the application**
- Open [http://localhost:4200](http://localhost:4200)

## Project Structure
```bash
src/
├── app/
│   ├── login/
│   ├── signup/
│   ├── company/
│   ├── sidebar/
│   ├── recruiter-team/
│   ├── recruiter-view-job/
│   ├── recruiter-request-view/
│   ├── recruiter-job-applicant-view/
│   ├── recruiter-meeting-details-dialog/
│   ├── recruiter-post-job-form-1/
│   ├── recruiter-post-job-form-2/
│   ├── recruiter-post-job-form-3/
│   ├── recruiter-post-job-form-4/
│   ├── applicant-apply-job/
│   ├── applicant-applied-job/
│   ├── applicant-job-view/
│   ├── applicant-user-profile/
│   ├── applicant-notification/
│   └── services/
├── assets/
├── environments/
├── index.html
├── styles.css
└── main.ts
```

## Usage
### Recruiter Flow
- **Login** or **Sign up** with organization details
- **Post Job** via multi-step form
- **View Applicants** under Requests > View Applicants
- **Shortlist** and **Schedule Interviews**
- **Manage Team Members** under Team section

### Applicant Flow
- **Signup/Login** to browse job listings
- **Apply to Jobs** using toggle
- **Track Applications** under "Applied Jobs"
- **View Notifications** and job details

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/auth/login` | Login user |
| `POST` | `/api/v1/auth/signup` | Register new user |
| `GET`  | `/api/v1/users/get/applicants` | Get applicants list |
| `POST` | `/api/v1/job/:jobId/apply` | Apply to a job |
| `GET`  | `/api/v1/organization/:orgId/jobs` | Get all jobs for organization |
| `POST` | `/api/v1/organization/:orgId/jobs` | Create a new job |

## Authentication
- JWT-based login system
- Tokens are stored in localStorage
- Route guards protect recruiter and applicant routes

## Routing
| Path | Component | Description |
|------|-----------|-------------|
| `/login` | LoginComponent | Recruiter/applicant login |
| `/signup` | SignupComponent | Account registration |
| `/company` | CompanyComponent | Organization details |
| `/team` | RecruiterTeamComponent | List of recruiter team members |
| `/jobs` | RecruiterViewJobComponent | All posted jobs |
| `/requests` | RecruiterRequestViewComponent | View job applicants |
| `/requests/:jobId/applicants` | RecruiterJobApplicantViewComponent | Applicant details |
| `/requests/:jobId/meeting-details` | RecruiterMeetingDetailsDialogComponent | Schedule meeting |
| `/post-job/step-1` | RecruiterPostJobForm1Component | Job title, position, type |
| `/post-job/step-2` | RecruiterPostJobForm2Component | Salary & skills |
| `/post-job/step-3` | RecruiterPostJobForm3Component | Experience & questions |
| `/post-job/step-4` | RecruiterPostJobForm4Component | Job description and submit |
| `/apply-job` | ApplicantApplyJobComponent | Browse and apply jobs |
| `/applied-jobs` | ApplicantAppliedJobComponent | Track applications |
| `/job-view/:jobId` | ApplicantJobViewComponent | Job details preview |
| `/user-profile` | ApplicantUserProfileComponent | Applicant profile |
| `/notifications` | ApplicantNotificationComponent | View notifications |

## Components
- **LoginComponent**: Handles secure login logic
- **SignupComponent**: Allows users to register with organization
- **CompanyComponent**: Recruiter organization info
- **SidebarComponent**: Navigation for both roles
- **RecruiterViewJobComponent**: Shows posted jobs
- **RecruiterRequestViewComponent**: View incoming job requests
- **RecruiterJobApplicantViewComponent**: Applicant listing by job
- **RecruiterMeetingDetailsDialogComponent**: Schedule interview meeting
- **RecruiterPostJobForm1-4**: Multi-step form to post jobs
- **ApplicantApplyJobComponent**: Apply to listed jobs
- **ApplicantNotificationComponent**: Notifications tab for applicants
- **ApplicantUserProfileComponent**: Personal profile page

## License
This project is licensed under the **MIT License**.

