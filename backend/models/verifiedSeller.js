// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const validator = require("validator");

// const Schema = mongoose.Schema;

// const verifiedSellerSchema = new Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   // Additional fields specific to verified sellers
//   isVerified: {
//     type: Boolean,
//     default: false,
//   },
//   // Add any other fields you need for verified sellers
// });

// // static signup method
// verifiedSellerSchema.statics.signup = async function (email, password) {
//   // Validation
//   if (!email || !password) {
//     throw Error("All fields must be filled");
//   }
//   if (!validator.isEmail(email)) {
//     throw Error("Email not valid");
//   }
//   if (!validator.isStrongPassword(password)) {
//     throw Error("Password not strong enough");
//   }

//   const exists = await this.findOne({ email });

//   if (exists) {
//     throw Error("Email already in use");
//   }

//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(password, salt);

//   const verifiedSeller = await this.create({ email, password: hash });

//   return verifiedSeller;
// };

// // static login method
// verifiedSellerSchema.statics.login = async function (email, password) {
//   if (!email || !password) {
//     throw Error("All fields must be filled");
//   }

//   const verifiedSeller = await this.findOne({ email });
//   if (!verifiedSeller) {
//     throw Error("Incorrect email");
//   }

//   const match = await bcrypt.compare(password, verifiedSeller.password);
//   if (!match) {
//     throw Error("Incorrect password");
//   }

//   return verifiedSeller;
// };

// module.exports = mongoose.model("VerifiedSeller", verifiedSellerSchema);
