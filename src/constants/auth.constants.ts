export const passwordRegexp =
  /^(?=.*[A-ZА-ЯЁ])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-zА-Яа-яЁё\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/;

export const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

export const usernameRegexp = /^(?![_.])[a-zA-Z0-9._]{3,20}$/;

export const fullnameRegexp = /^(?!\s)(?!.*\s$).{3,50}$/;
