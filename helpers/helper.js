import moment from "moment";
import { toast } from "sonner";
export function verifyIsLoggedIn(router) {
  const token1 = localStorage.getItem('Etoken[A]') ;
  const token2 = localStorage.getItem('Etoken[E]') ;
  const token3 = localStorage.getItem('Etoken[C]') ;
  
  if (!(token1 || token2 || token3)) {
    router.push("/login");
  }

  // if(!localStorage.getItem('Etoken[A]')){
  //   // toast.error("Please login first!")
  //   // router.push("/login")
  // }

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