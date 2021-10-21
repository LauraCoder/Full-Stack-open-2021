require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.SECRET
const USERPASSWORD = process.env.USERPASSWORD

module.exports = {
  MONGODB_URI,
  SECRET,
  USERPASSWORD
}