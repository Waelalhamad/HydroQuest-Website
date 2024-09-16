const mongoose = require("mongoose")

const ConnectionDb = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/submarineDB")
        console.log("Connection Db Successfuly")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = ConnectionDb