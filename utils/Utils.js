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
  switch (type) {
    case ComplaintStatus.PENDING:
      name = "Pending";
      break;
    case ComplaintStatus.APPROVED:
      name = "Approved";
      break;
    case ComplaintStatus.REJECTED:
      name = "Rejected";
      break;
    default:
  }
  return name;
};
export {};
