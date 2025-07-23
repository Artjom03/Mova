# MovaStudio - Digital Agency Website

A modern, responsive website built with Next.js for a digital agency offering website creation, content creation, and content editing services.

## Features

- **Service Selection**: Users can choose from three main services
- **Dynamic Forms**: Customized forms for each service type
- **Email Integration**: Form submissions are automatically emailed to the agency
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **User Authentication**: Login and registration system (planned)
- **Admin Panel**: Manage service requests (planned)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Email**: Nodemailer
- **Authentication**: NextAuth.js (planned)
- **Database**: Prisma with PostgreSQL (planned)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd MovaStudio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.local` and update with your email credentials
   - Configure SMTP settings for email functionality

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # App Router pages and layouts
│   ├── api/               # API routes
│   │   └── services/      # Service form handlers
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── services/          # Services page with forms
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable UI components
│   └── ui/               # Base UI components
└── lib/                  # Utility functions
```

## Services

### 1. Website Creation
- Professional responsive websites
- Custom design and development
- E-commerce solutions
- Portfolio and business sites

### 2. Content Creation
- Blog posts and articles
- Marketing copy
- Social media content
- SEO-optimized content

### 3. Content Editing
- Proofreading and copy editing
- Content optimization
- SEO improvements
- Rewriting and restructuring

## Email Configuration

To enable email functionality, update your `.env.local` file with:

```env
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=contact@movastudio.com
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Future Enhancements

- [ ] User authentication with NextAuth.js
- [ ] Database integration with Prisma
- [ ] Admin dashboard for managing requests
- [ ] Payment integration
- [ ] File upload functionality
- [ ] Real-time notifications
- [ ] Client portal

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and proprietary.

## Support

For questions or support, contact: support@movastudio.com
