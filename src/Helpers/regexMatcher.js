import toast from "react-hot-toast";

export function isEmail(string) {
  if (
    !string.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    toast.error("Invalid email id");
    return false;
  }
  return true;
}

export function isPassword(string) {
  if (!string.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
    toast.error(
      "Password should be 6–16 characters long and must contain at least one number and one special character"
    );
    return false;
  }
  return true;
}
