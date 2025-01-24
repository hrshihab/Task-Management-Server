import bcrypt from 'bcrypt';
import { Schema, model, Model } from 'mongoose';
import config from '../../config';
import { TUser } from './user.interface';

interface UserModel extends Model<TUser> {
  isUserExistsByCustomEmail(email: string): Promise<TUser | null>;
  isUserExistsByCustomId(userId: string): Promise<TUser | null>;
  isPasswordMatched(inputPassword: string, storedPassword: string): Promise<boolean>;
  // isJWTIssuedBeforePasswordChanged(passwordChangedTimestamp: Date, jwtIssuedTimestamp: number): Promise<boolean>;

}

const userSchema = new Schema<TUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
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
    role: {
      type: String,
      enum: ['Admin', 'Owner', 'Member'],
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (userId: string) {
  return this.findById(userId);
};

userSchema.statics.isUserExistsByCustomEmail = async function (email: string) {
  return this.findOne({ email });
};

userSchema.statics.isPasswordMatched = async function (inputPassword: string, storedPassword: string) {
  return bcrypt.compare(inputPassword, storedPassword);
};

// userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
//   passwordChangedTimestamp: Date,
//   jwtIssuedTimestamp: number,
// ) {
//   const passwordChangedTime =
//     new Date(passwordChangedTimestamp).getTime() / 1000;
//   return passwordChangedTime > jwtIssuedTimestamp;
// };

export const User = model<TUser, UserModel>('User', userSchema);
