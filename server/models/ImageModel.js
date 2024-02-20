const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    tyep: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
});

const Image = mongoose.model("Image", imageSchema);
export default Image;
