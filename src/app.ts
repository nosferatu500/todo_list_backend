import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import router from "./routes"

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(router)

const uri: string = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-shard-00-00.ufxlm.mongodb.net:27017,cluster0-shard-00-01.ufxlm.mongodb.net:27017,cluster0-shard-00-02.ufxlm.mongodb.net:27017/${process.env.MONGO_DB}?ssl=true&replicaSet=atlas-12rdsz-shard-0&authSource=admin&retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose.set("useFindAndModify", false)

mongoose.connect(uri, options).then(() => 
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
).catch(error => {
    throw error
  })
