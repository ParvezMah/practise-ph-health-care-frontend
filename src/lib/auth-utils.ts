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

export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((route: string) => route === pathname);
}


export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
    if (routes.exact.includes(pathname)) {
        return true;
    }
    return routes.patterns.some((pattern: RegExp) => pattern.test(pathname))
    // if pathname === /dashboard/my-appointments => matches /^\/dashboard/ => true
}

export const getRouteOwner = (pathname: string): "ADMIN" | "DOCTOR" | "PATIENT" | "COMMON" | null => {
    if (isRouteMatches(pathname, adminProtectedRoutes)) {
        return "ADMIN";
    }
    if (isRouteMatches(pathname, doctorProtectedRoutes)) {
        return "DOCTOR";
    }
    if (isRouteMatches(pathname, patientProtectedRoutes)) {
        return "PATIENT";
    }
    if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "COMMON";
    }
    return null;
}

export const getDefaultDashboardRoute = (role: UserRole): string => {
    if (role === "ADMIN") {
        return "/admin/dashboard";
    }
    if (role === "DOCTOR") {
        return "/doctor/dashboard";
    }
    if (role === "PATIENT") {
        return "/dashboard";
    }
    return "/";
}