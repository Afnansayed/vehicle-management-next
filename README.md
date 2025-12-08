# In your project directory
echo "# Project Name: vehicle-management-next
## Live URL
[https://vehicle-management-next.vercel.app/]

## Features
- User registration and authentication
- Secure password hashing using bcrypt
- JWT-based authentication system
- RESTful API endpoints
- PostgreSQL database integration
- TypeScript for type safety

## Technology Stack
- **Runtime:** Node.js with TypeScript
- **Web Framework:** Express.js
- **Database:** PostgreSQL
- **Password Security:** bcrypt
- **Authentication:** jsonwebtoken (JWT)

## Setup & Usage Instructions

### Prerequisites
- Node.js (v24 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Afnansayed/vehicle-management-next.git]
   cd [vehicle-management-next]
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a \`.env\` file in the root directory and add the following configuration:
   ```env
   PORT=5000
   CONNECTION_STRING=postgresql://neondb_owner:npg_KN1aL6vCtYRW@ep-sparkling-mountain-adzh9vib-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   JWT_SECRET=a9388472c9ec2deb78107203d34278b5ab4b10bd304191859f5f79af1734e94f02af915db45f5db78a30bc35abb92ee5962500d4b339e41f6e60ccb7b64fabd0
   ```

4. **Set up the database:**
   - Ensure your PostgreSQL database is running
   - The connection will be established automatically using the connection string

5. **Run the application in development mode:**
   ```bash
   npm run dev
   ```

6. **Build and run for production:**
   ```bash
   npm run build
   npm run dev
   ```

### API Usage

Once running, the API will be available at \`http://localhost:5000\`

**Example endpoints:**
- \`POST /api/v1/auth/signup\` - User registration
- \`POST /api/v1/auth/signin\` - User login

### Security Notes
- The JWT secret provided is for example purposes. In production, generate a new secure secret
- Never commit the \`.env\` file to version control
- Consider using environment-specific configuration for different deployment stages




