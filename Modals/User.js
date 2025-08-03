import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  channelname: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  joinedOn: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("user", userSchema);