<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# MovaStudio - Digital Agency Website

This is a Next.js 15 website for a digital agency that provides three main services:
1. Website Creation
2. Content Creation  
3. Content Editing

## Technology Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js (planned)
- **Database**: Prisma with PostgreSQL (planned)
- **Email**: Nodemailer
- **Utilities**: clsx, tailwind-merge

## Project Structure
- `/src/app` - App Router pages and API routes
- `/src/components` - Reusable UI components
- `/src/lib` - Utility functions
- API routes handle form submissions and email sending

## Key Features
- Responsive design with Tailwind CSS
- Service selection forms for each service type
- Email integration for form submissions
- User authentication system (to be implemented)
- Admin panel for managing requests (to be implemented)

## Development Guidelines
- Use TypeScript for all new files
- Follow Next.js App Router conventions
- Use Tailwind CSS for styling
- Implement proper error handling for API routes
- Use environment variables for sensitive data
- Follow accessibility best practices
