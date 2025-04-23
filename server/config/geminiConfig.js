require("dotenv").config();

module.exports = {
  API_KEY: process.env.GEMINI_API_KEY,
  BASE_URL: process.env.GEMINI_API_BASE_URL,
  MODEL: "gemini-2.0-flash",
};
