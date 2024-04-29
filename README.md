# MyTeam

## Libraries && frameworks

- react-pdf/renderer (creating PDFs)
- react-email (creating emails)
- resend (sending emails)
- next-auth (authentication)
- trcp (type safe backend apis)
- drizzle (ORM)
- NeonDb (Pb serverless db)
- downloadjs (downloading files)
- TailwindCss (styles)
- ShadCn (for components)
- zod (for validation)
- zustand (state manager)

## Code guidelines

- We create 1 state file for each page in the same page

## DB Migration Guide

After you have created changes in schema file, run the following to apply changes:

- run pnpm generate-migration
- run pnpm apply-migrations

Look in the dev DB that everything works. Make sure that the changes will not affect prodDB to much (the CI will apply the changes to prod db).

TODO: This should only affect dev DB (implement branching from Neon)

## Required ENVS:

- DB
  DATABASE_URL

- NEXT AUTH
  NEXTAUTH_SECRET
  NEXTAUTH_URL

- GOOGLE OAUTH
  AUTH_GOOGLE_ID
  AUTH_GOOGLE_SECRET

- FACEBOOK OAUTH
  AUTH_FACEBOOK_ID
  AUTH_FACEBOOK_SECRET

- RESEND API KEY
  AUTH_RESEND_KEY
