import mongoose from "mongoose"

mongoose.set("useUnifiedTopology", true)
mongoose.set("useNewUrlParser", true)
mongoose.set("useFindAndModify", false)
mongoose.set("useCreateIndex", true)

const dbUri = process.env.DB_URI

export default async () => {
  try {
    await mongoose.connect(dbUri as string)
    console.log("Connected to MongoDb")
  } catch (error) {
    console.log(error)
  }
}
