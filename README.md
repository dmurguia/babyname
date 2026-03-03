# BabyName Studio

A production-ready frontend application for exploring baby name trends through natural language queries and structured data analysis.

## Features

- **Natural Language Queries**: Ask questions about baby name trends in plain English
- **Structured Analysis**: Filter by gender, analyze top names by decade, view name timelines
- **Data Visualization**: Interactive charts powered by Recharts
- **Saved Queries**: Save and rerun your favorite queries
- **Responsive Design**: Desktop 3-column layout, mobile tabbed interface
- **Type-Safe**: Full TypeScript implementation with Zod runtime validation
- **Production Ready**: ESLint, Prettier, Vitest, and comprehensive error handling

## Tech Stack

- **React 18** with TypeScript
- **Vite** for blazing-fast builds
- **TanStack Query** for data fetching and caching
- **Recharts** for data visualization
- **Zod** for runtime response validation
- **Vitest** and React Testing Library for testing

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://your-backend-url
```

Replace `https://your-backend-url` with your actual FastAPI backend URL.

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Testing

Run tests:

```bash
npm test
```

### Linting and Formatting

```bash
npm run lint
npm run format
```

## Project Structure

```
src/
├── components/        # Reusable UI components
├── hooks/            # Custom React hooks
├── lib/              # Core utilities and API client
│   ├── api.ts        # API client with Zod validation
│   ├── types.ts      # TypeScript type definitions
│   ├── validators.ts # Zod schemas
│   ├── utils.ts      # Utility functions
│   └── mock-data.ts  # Mock data for offline mode
├── pages/            # Page components
├── styles/           # Global styles
└── test/             # Test setup and test files
```

## API Endpoints

The application connects to these backend endpoints:

- `GET /health` - Health check with dataset info
- `POST /chat/query` - Natural language query
- `POST /analysis/top-names-by-decade` - Top names analysis
- `POST /analysis/name-timeline` - Name popularity timeline
- `GET /saved-queries` - List saved queries
- `POST /saved-queries` - Create saved query
- `DELETE /saved-queries/{id}` - Delete saved query

## Design System

The application uses a premium editorial design with:

- **Colors**: Deep navy, warm cream, muted teal accents
- **Typography**: Playfair Display (serif) for headings, Inter (sans-serif) for body
- **Spacing**: 8px grid system
- **Motion**: Subtle animations and transitions for enhanced UX

## Deployment

### Vercel

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Deploy:

```bash
vercel
```

3. Set environment variables in Vercel dashboard:
   - `VITE_API_BASE_URL`

### Netlify

1. Install Netlify CLI:

```bash
npm i -g netlify-cli
```

2. Build and deploy:

```bash
npm run build
netlify deploy --prod --dir=dist
```

3. Set environment variables in Netlify dashboard:
   - `VITE_API_BASE_URL`

### Other Platforms

The application is a static site and can be deployed to any static hosting service:

- Build: `npm run build`
- Upload the `dist` folder
- Configure environment variables as needed

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `https://api.example.com` |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

See LICENSE file for details.

## Development Notes

### Mock Data Mode

If the backend is unavailable, the application includes mock data in `src/lib/mock-data.ts` that can be used for development and testing.

### Type Safety

All API responses are validated at runtime using Zod schemas. This ensures type safety even when the backend returns unexpected data.

### State Management

- Server state: TanStack Query
- Local state: React hooks
- Persistent state: localStorage via custom hooks

### Performance

- Code splitting with React.lazy
- Image optimization
- Memoization where appropriate
- Efficient re-renders with React Query caching
