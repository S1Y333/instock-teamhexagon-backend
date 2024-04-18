

exports.validateEmail= (email) =>{
  // Regular expression to check email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return false; // Invalid format
  }
    return true;
}

exports.validatePhoneNumber =(phoneNumber)=> {
  // Regular expression to check phone number format
  const phoneRegex = /^\+\d{1,3}\s\(\d{3}\)\s\d{3}-\d{4}$/;
  return phoneRegex.test(phoneNumber);
}


