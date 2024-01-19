import mongoose from 'mongoose'

let isConnected = false

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if(!process.env.MONGODB_URL) return console.log('MONGO_DB Url not found')
    if(isConnected) return console.log('MONGO_DB already connected')

    try {
        await mongoose.connect(process.env.MONGODB_URL)
        isConnected = true
        console.log('Connected to  mongoDB')
    } catch (error) {
        console.log(error)
    }

}
