const isEmpty = text => {
  if (text.length == 0) return true;
  return false;
};

const isValidPassword = text => {
  if (text.length <= 5) return true;
  return false;
};

const isEmail = text => {
  let emailTestReg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailTestReg.test(text)) {
    return true;
  } else {
    return false;
  }
};

export {isEmail, isEmpty, isValidPassword};
