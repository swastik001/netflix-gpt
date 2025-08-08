const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const checkValidData = (email, password) => {
  if (!EMAIL_REGEX.test(email)) {
    return "Invalid email format";
  }
  if (!PASSWORD_REGEX.test(password)) {
    return "Password is not valid";
  }
  return null;
};
