import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNo: {
      type: String,
      required: true,
      unique: true,
    },
    contactPerson: {
      name: {
        type: String,
        required: true,
      },
      mobile: {
        type: String,
        required: true,
      },
      email: { type: String, required: true },
    },
    type: {
      type: String,
      options: ["ADMIN", "NON_ADMIN", "CLIENT"],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
