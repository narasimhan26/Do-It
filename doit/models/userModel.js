const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema ({
  email: {
    type: String,
    required: [true, "Please enter email"],
    trim: true
  },
  password: {
    type: String,
    required: [true, "Please enter Password"],
    trim: true
  }
});

module.exports = mongoose.model("Users", UsersSchema);