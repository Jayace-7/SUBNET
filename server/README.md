# SUBNET Server

This directory contains the backend project structure for the SUBNET streaming platform. It is intentionally separate from the existing React frontend in the repository root.

## Directory responsibilities

- `src/config/` - application configuration and environment-variable handling.
- `src/controllers/` - HTTP request handlers and response formatting.
- `src/middleware/` - auth, validation, security, logging, and error middleware.
- `src/routes/` - route definitions for future API modules.
- `src/services/` - business logic for users, media, subscriptions, and notifications.
- `src/repositories/` - database access abstraction and persistence logic.
- `src/integrations/` - external service integrations grouped by provider.
  - `keycloak/` - Keycloak authentication integration placeholder.
  - `tmdb/` - TMDB metadata integration placeholder.
  - `opensubtitles/` - OpenSubtitles integration placeholder.
  - `payments/` - payment processing integration placeholder.
- `src/modules/` - domain-specific modules and feature groups when they need more structure than a route/service split.
- `src/validators/` - request and payload validation schemas for future use.
- `src/db/` - database infrastructure, migrations, and connection management.
- `src/utils/` - reusable helper functions and backend utilities.
- `src/app.js` - Express application bootstrap.
- `src/server.js` - server startup and listening configuration.
- `tests/` - future backend unit and integration tests.
- `docs/` - backend documentation and design notes.

## Notes

This stage creates the project skeleton only. The backend is not yet connected to Supabase, PostgreSQL, or any third-party API. The structure is intentionally kept lightweight to support progressive implementation in later stages.
