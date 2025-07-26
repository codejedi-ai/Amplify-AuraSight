# Authentication Setup

This Amplify app now includes a complete authentication system with the following features:

## Features

- **Email-based Authentication**: Users can sign up and sign in using their email address
- **Protected Todo Management**: Users can only access and manage their own todos
- **Modern UI**: Clean, responsive interface using Amplify UI components
- **Secure Backend**: Todos are protected by user-based authorization rules

## How to Use

1. **Sign Up**: New users can create an account using their email address
2. **Sign In**: Existing users can sign in with their email and password
3. **Manage Todos**: Once authenticated, users can create, view, and manage their personal todos
4. **Sign Out**: Users can sign out using the button in the top navigation bar

## Technical Implementation

### Frontend Components

- **AuthWrapper**: Handles authentication state and provides the sign-in/sign-up interface
- **TodoApp**: Manages todo CRUD operations (only accessible when authenticated)

### Backend Configuration

- **Authentication**: Configured for email-based login in `amplify/auth/resource.ts`
- **Data Authorization**: Todos are protected with owner-based authorization in `amplify/data/resource.ts`

### Security Features

- User authentication required to access todos
- Each user can only see and modify their own todos
- Secure session management with automatic token refresh

## Development

To run the app locally:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Deployment

The app is ready for deployment with Amplify hosting. The authentication and data resources will be automatically provisioned in your AWS account. 