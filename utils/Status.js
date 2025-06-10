const Routes = Object.freeze({
  DASHBOARD: "dashboard",
  CLIENTS: "clients",
  MASTERS: "masters",
  USERS: "users",
  CATEGORIES: "categories",
  CITIES: "cities",
  COMPLAINTS: "complaints",
  ABOUT_US: "about_us",
  BULLETIN: "bulletin",
  SUPPORT: "support", // Added for Help & Support
});

const QUERY_TAGS = Object.freeze({
  APP: "app",
  USER: "user",
  CLIENT: "client",
  CITY: "city",
  CATEGORY: "category",
  COMPLAINT: "complaint",
  ABOUT_US: "about_us",
  BULLETIN: "bulletin",
  HELP_SUPPORT: "help_support", // Added for Help & Support
});

const ComplaintStatus = Object.freeze({
  RESOLVED: 0,
  PENDING: 1,
  REJECTED: 2,
});

const UserRole = Object.freeze({
  ADMIN: 1,
  USER: 2,
  AGENT: 3,
});

export { Routes, QUERY_TAGS, ComplaintStatus, UserRole };
