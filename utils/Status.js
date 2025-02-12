const Routes = Object.freeze({
  DASHBOARD: "dashboard",
  CLIENTS: "clients",
  MASTERS: "masters",
  USERS: "users",
  CATEGORIES: "categories",
  CITIES: "cities",
  COMPLAINTS: "complaints",
});

const QUERY_TAGS = Object.freeze({
  APP: "app",
  USER: "user",
  CLIENT: "client",
  CITY: "city",
  CATEGORY: "category",
  COMPLAINT: "complaint",
});

const ComplaintStatus = Object.freeze({
  PENDING: 0,
  APPROVED: 1,
  REJECTED: 2,
});

export { Routes, QUERY_TAGS, ComplaintStatus };
