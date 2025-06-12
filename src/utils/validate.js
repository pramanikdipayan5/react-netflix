export const CheckValidData = (email, passowrd, name = null) => {
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const isPasswordValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(passowrd);
  if (name) {
    const isNameValid = /^([a-zA-Z]+[ \-']{0,1}){1,3}$/.test(name);
    if (!isNameValid) {
        return "Name is not valid";
    }
  }
  if (!isEmailValid) {
    return "Email ID is not valid";
  }
  if (!isPasswordValid) {
    return "Password is not valid";
  }
}