import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

enum Gender {
  Male = "male",
  Female = "female",
}

interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  mobileNumber: string;
  gender: Gender;
  address: {
    name: string;
    street: string;
    landmark: string;
    zip: string;
    state: string;
    city: string;
    country: string;
    addressType: string;
  };
  createdAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUser>({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
  },
  address: {
    name: {
      type: String,
    },
    street: {
      type: String,
    },
    landmark: {
      type: String,
    },
    zip: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    addressType: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
