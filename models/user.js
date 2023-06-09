import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unqiue: [true, "Email уже зарегистрирован"],
    required: [true, "Email обязателен для заполнения"],
  },
  username: {
    type: String,
    required: [true, "Имя пользовательно обязательно для заполнения"],
    match: [
      /^(?=.{1,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 1-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);
export default User;
