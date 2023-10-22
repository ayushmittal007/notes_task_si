const mongoose = require("mongoose");

userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function(value) {
            // Using a regex to validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
          },
          message: props => `${props.value} is not a valid email address!`
        }
      },
  password: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("user", userSchema);
module.exports = { User };