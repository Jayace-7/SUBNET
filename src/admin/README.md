# SUBNET Admin Module

This directory is an independent scaffold for the administrator sign-in and dashboard experience. It reuses the existing SUBNET logo and does not replace consumer application components or styles.

## Routes

- `/admin/login` — dedicated Admin sign-in interface scaffold.
- `/admin/dashboard` — dashboard layout and section placeholders.

The login page includes a client-side registration form mode; switching modes only changes the displayed form. Both routes are currently unprotected. Authentication, account creation, authorization, loading/error handling, analytics data, and backend integrations are not implemented.

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
│   └── mockAnalytics.js
├── pages/
│   ├── AdminAuth.jsx
│   └── AdminDashboard.jsx
├── routes/
│   └── AdminRoutes.jsx
└── styles/
    └── admin.css
```

Admin-only styles are imported from `routes/AdminRoutes.jsx` and scoped under `.admin-module`. Add Admin image assets in `assets/images/` when they are available.
