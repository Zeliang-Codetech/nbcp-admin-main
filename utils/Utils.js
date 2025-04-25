import moment from "moment";
import {
  DATE_TIME_FORMAT,
  ISO_DATE_FORMAT,
  ISO_DATE_TIME_FORMAT,
} from "./Constants";
import { message } from "antd";
import { ComplaintStatus } from "./Status";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export const showToast = (text) => {
  if (typeof text === "string") {
    message.success(text);
  } else {
    message.error("Something went wrong");
  }
};
export const showError = (text) => {
  if (typeof text === "string") {
    message.error(text);
  } else {
    message.error("Something went wrong");
  }
};

export const getComplaintStatus = (type) => {
  let name = "";
  let color = "";
  switch (type) {
    case ComplaintStatus.PENDING:
      name = "Pending";
      color = "#faad14"; // Yellow/amber color for pending
      break;
    case ComplaintStatus.RESOLVED:
      name = "Resolved";
      color = "#52c41a"; // Green color for resolved
      break;
    case ComplaintStatus.REJECTED:
      name = "Rejected";
      color = "#ff4d4f"; // Red color for rejected
      break;
    default:
      color = "#d9d9d9"; // Default gray
  }
  return { name, color };
};

export const getUserRole = (role) => {
  switch (role) {
    case 1:
      return "Admin";
    case 2:
      return "User";
    case 3:
      return "Agent";
    default:
      return "Unknown";
  }
};

export {};
