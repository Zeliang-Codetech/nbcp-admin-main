import { DATE_FORMAT, ISO_DATE_FORMAT } from "./Constants";
import {} from "./Status";
import moment from "moment";
const dateFormat = "DD/MM/YYYY";
const unixToDate = (value) => moment(value).format(dateFormat);
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};
const ParseFloat = (number, digits = 2) => {
  if (typeof number !== "number" || isNaN(number)) return 0.0;
  return parseFloat(number.toFixed(digits));
};
function convertJsonToFormData(object) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(object)) {
    if (value === undefined) {
      continue;
    }
    if (key === "image") {
      if (value[0]?.originFileObj !== undefined) {
        formData.append(key, value[0]?.originFileObj);
      }
      continue;
    }
    if (key === "images") {
      for (let [index, image] of value.entries()) {
        if (image?.originFileObj) {
          formData.append("images", image.originFileObj);
        }
      }
      continue;
    }
    if (Array.isArray(value)) {
      value.forEach((item) => {
        formData.append(key, item);
      });
    } else {
      formData.append(key, value);
    }
  }
  return formData;
}

function isObjectEmpty(obj) {
  try {
    if (typeof obj !== "object" || obj === null) {
      throw new Error("Invalid input: Not an object");
    }
    return Object.keys(obj).length === 0;
  } catch (error) {
    return true;
  }
}
// Serialize an object to JSON and encode it for URL use
function serializeObject(obj) {
  return encodeURIComponent(JSON.stringify(obj));
}
// Deserialize a JSON string from a URL query parameter
function deserializeObject(queryParam) {
  return queryParam ? JSON.parse(decodeURIComponent(queryParam)) : null;
}

function convertToISODate(value) {
  try {
    const parsedDate = moment(value, DATE_FORMAT, true);
    if (!parsedDate.isValid()) {
      throw new Error("Invalid date format");
    }
    return parsedDate.format(ISO_DATE_FORMAT);
  } catch (error) {
    return null;
  }
}
export {
  unixToDate,
  normFile,
  ParseFloat,
  convertJsonToFormData,
  isObjectEmpty,
  serializeObject,
  deserializeObject,
  convertToISODate,
};
