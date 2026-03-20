import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    maxLength: 200,
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minLength: 20,
  },
  status: {
    type: String,
    required: true,
    enum: ["draft", "published", "archived"],
    default: "draft",
  },
  views: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  tags: {
    type: [
      {
        type: String,
        trim: true,
        minLength: 2,
      },
    ],
    validate: {
      validator: function (arr) {
        return arr.length <= 5;
      },
      message: "Tags can contain at most 5 items",
    },
    default: [],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;