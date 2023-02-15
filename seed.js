require("dotenv/config")
const mongoose = require("mongoose")
const User = require("./models/User.model")
const bcrypt = require("bcryptjs")


const mongoURI = process.env.MONGODB_URI
mongoose.connect(mongoURI)
	.then(db => console.log("Connected to database"))
	.catch(err => console.log(err))


const users = [{

    username: "Cherian",
    password: process.env.ADMINPASS,
    role: "admin"
}]



users.forEach(user => {
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(user.password, salt)
    user.password = hash
    User.create(user)
})

