import * as mongoose from 'mongoose'
const Schema = mongoose.Schema

const TestSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
      trim: true,
    },
    Type: {
      type: String,
      required: true,
    },
    Year: {
      type: String,
      required: true,
      trim: true,
    },
    imdbID: {
      type: String,
      required: true,
      trim: true,
    },
    Poster: {
      type: String,
      required: true,
      trim: true,
    },
    api1: {
      type: Boolean,
      required: true,
      trim: true,
    },
    api2: {
      type: Boolean,
      required: true,
      trim: true,
    },
    api3: {
      type: Boolean,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    useNestedStrict: true,
  },
)

export default mongoose.model('Test', TestSchema)
