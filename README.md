# Jobsmart.lk

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`. It is prefilled with the public URL and publishable key for the `jobsmart.lk` Supabase project (`akodimhrmizbvexwqrnd`).
3. The `supabase/migrations/0001_jobs.sql` schema is already installed in that project. For a fresh Supabase project, run this migration once in its SQL Editor.
4. Start the site with `npm run dev`; create a production build with `npm run build`.

For static hosting, use `dist/` as the publish directory and `npm run build` as the build command. The included `_redirects` file supports Cloudflare Pages and Netlify SPA routes; `vercel.json` provides the equivalent Vercel rewrite. Set both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the hosting provider's build environment before deploying. These are build-time client settings; adding them after build requires rebuilding the site.

The job directory uses Supabase PostgREST and Supabase Auth. The live project currently has zero jobs; the migration adds only the 10 job categories and 25 Sri Lankan districts used by the job form. Public visitors can read only published jobs. Creating, editing, publishing, and deleting jobs requires an authenticated account whose server-managed `app_metadata.admin_role` is `admin` or `super_admin`; this check is enforced by database RLS policies, not only by the interface. Do not use editable user metadata for roles. Create your admin user under Supabase Authentication first, then an authorized project owner can set the claim in the SQL Editor with `update auth.users set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"admin_role":"admin"}'::jsonb where email = 'admin@example.com';` (replace the email; use `super_admin` only for the intended owner account). The user must sign out and back in to refresh the JWT role claim.

The public `jobsmart-assets` Storage bucket has copies of the four website image assets. It serves direct object URLs and does not allow clients to list files; uploads, edits, and deletes are restricted to authenticated admins. The hosting ZIP still includes the original files under `public/assets/aistudio/` and the app continues to serve those bundled copies, so the site design remains available independently of Storage.

## Supabase credentials

Use the project URL and publishable key (or legacy anon key) in the client environment. The included `.env.example` contains the correct public project settings. A service-role key is not used or needed by this job-directory implementation and must never be exposed in a browser environment.

## Migration scope

This change retires the local SQLite/D1 application API and removes its hardcoded jobs and bootstrap credentials. The existing advertiser request processing, file uploads, contact inbox, activity log, and admin account management still need an equivalent Supabase migration before they can be used as persistent production features. The retired API returns HTTP 503 for those legacy routes so they do not silently write to local storage or SQLite.
