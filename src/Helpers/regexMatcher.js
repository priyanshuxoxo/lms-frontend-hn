import toast from "react-hot-toast";

export function isEmail(string) {
  if (
    !string.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  )
    return toast.error("Invalid email id");
}
export function isPassword(string) {
  if (
    !string.password.match(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    )
  )
    return toast.error(
      "password should be atleast 6-16 character long and must contain atleast one number and special character"
    );
}
