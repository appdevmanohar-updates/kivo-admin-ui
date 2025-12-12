# KIVO Admin Portal

A premium admin dashboard for the KIVO fashion marketplace, built with React, Vite, and Tailwind CSS.

## Features

- **Dashboard**: Overview of key metrics and pending tasks.
- **Product Management**: Review, approve, or reject seller products with a detailed modal view.
- **Order Management**: Track orders and assign delivery partners.
- **Seller Management**: Monitor seller performance and status.
- **Branding**: Custom KIVO Gold & Accent color scheme.

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Lucide React (Icons)
- Vite

## Setup & Running Locally

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Visit `http://localhost:5173`

## Troubleshooting

- **"Unexpected token" errors**: Ensure you are using a Node version >= 16. If using VS Code, ensure the workspace is using the TypeScript version from `node_modules`.
- **Tailwind not loading**: This project includes both a `tailwind.config.js` for build processes AND a CDN link in `index.html` for instant previewing without a build step. For production, remove the CDN link and ensure the PostCSS build pipeline is active.

## Future Integrations

- **Supabase**: 
  - Replace `services/dataService.tsx` with Supabase client calls.
  - Map `types.ts` to Supabase Database definitions.
  - Add Row Level Security (RLS) policies for Admin access.

## Deployment (Vercel)

1. Push code to GitHub.
2. Import project into Vercel.
3. Framework Preset: `Vite`.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Deploy.

## Project Structure

- `src/components`: Reusable UI components (Layout, Cards, Buttons).
- `src/pages`: Main view components (Dashboard, Products, etc.).
- `src/services`: Mock data context and logic.
- `src/types.ts`: TypeScript interfaces.
- `src/constants.ts`: Mock data.
