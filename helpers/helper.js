import moment from "moment";
export function verifyIsLoggedIn(router) {
  const token = localStorage.getItem("Etoken");
  if (token) {
    // router.push("/");
  }
}
export const getFormatedDate = (date, format = "") => {
  if (format != "") {
    return moment(date).format(format);
  }

  if (typeof date?.getMonth === "function") {
    return moment(date).format("L");
  }

  if (date == undefined) {
    return moment().format("L");
  }

  if (typeof date === "string") {
    return moment(date).format("L");
  }
};