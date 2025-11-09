// role-based protected route configurations


export type UserRole = "ADMIN" | "DOCTOR" | "PATIENT";

// exact : ["/my-profile", "settings"]
//   patterns: [/^\/dashboard/, /^\/patient/], // Routes starting with /dashboard/* /patient/*

// To separate exact path matches vs pattern-based
export type RouteConfig = {
    exact: string[], // For exact path match
    patterns: RegExp[], // For nested routes
}

// Public authentication pages.
export const authRoutes = [
    "/login", 
    "/register", 
    "/forgot-password", 
    "/reset-password"
];

// For all logged-in users
export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/settings"],
    patterns: [], // [/password/change-password, /password/reset-password => /password/*]
}

export const doctorProtectedRoutes: RouteConfig = {
    patterns: [/^\/doctor/], // Routes starting with /doctor/* , /assitants, /appointments/*
    exact: [], // "/assistants"
}

export const adminProtectedRoutes: RouteConfig = {
    patterns: [/^\/admin/], // Routes starting with /admin/*
    exact: [], // "/admins"
}

export const patientProtectedRoutes: RouteConfig = {
    patterns: [/^\/dashboard/], // Routes starting with /dashboard/*
    exact: [], // "/dashboard"
}