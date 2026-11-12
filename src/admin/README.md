# SUBNET Admin Module

This directory is an independent scaffold for the administrator sign-in and dashboard experience. It reuses the existing SUBNET logo and does not replace consumer application components or styles.

## Routes

- `/admin/login` — dedicated Admin sign-in interface scaffold.
- `/admin/dashboard` — dashboard layout and section placeholders.
- `/admin/profile` — administrator profile page with session-only mock editing.
- `/admin/settings` — settings placeholder for future administrator controls.

The login page includes a client-side registration form mode; demo sign-in opens the dashboard without validating credentials. Routes are currently unprotected. Dashboard analytics, activity, notifications and service health are demonstration data only. Profile edits are held in page state only; authentication, account creation, authorization, loading/error handling, and backend integrations are not implemented. Password management is reserved for a future Keycloak integration.

## Structure

```text
admin/
├── assets/
│   ├── icons/
│   └── images/
│       └── posters/
├── components/
│   ├── common/
│   │   ├── AdminButton.jsx
│   │   └── AdminCard.jsx
│   ├── dashboard/
│   │   ├── ContentPerformance.jsx
│   │   ├── DashboardHero.jsx
│   │   ├── OverviewCards.jsx
│   │   ├── RecentActivity.jsx
│   │   ├── StreamingAnalytics.jsx
│   │   ├── SubscriptionOverview.jsx
│   │   └── SystemHealth.jsx
│   └── layout/
│       ├── AdminHeader.jsx
│       ├── AdminLayout.jsx
│       └── AdminSidebar.jsx
├── data/
│   ├── mockAdminProfile.js
│   └── mockAnalytics.js
├── pages/
│   ├── AdminAuth.jsx
│   ├── AdminDashboard.jsx
│   ├── AdminProfile.jsx
│   └── AdminSettings.jsx
├── routes/
│   └── AdminRoutes.jsx
└── styles/
    └── admin.css
```

Admin-only styles are imported from `routes/AdminRoutes.jsx` and scoped under `.admin-module`. Add Admin image assets in `assets/images/` when they are available.
