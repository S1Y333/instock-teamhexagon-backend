const knex = require("knex")(require("../knexfile"));

exports.validateEmail = (email) => {
  // Regular expression to check email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return false; // Invalid format
  }
  return true;
};

exports.validatePhoneNumber = (phoneNumber) => {
  // Regular expression to check phone number format
  const phoneRegex = /^\+\d{1,3}\s\(\d{3}\)\s\d{3}-\d{4}$/;
  return phoneRegex.test(phoneNumber);
};

exports.isNumber = (num) => {
  return !isNaN(num);
};

exports.sortQuery = (query, sortBy, orderMethod)  => {
  query.orderBy(sortBy, orderMethod);
}