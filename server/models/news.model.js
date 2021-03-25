const mongoose = require("mongoose")

const Schema = mongoose.Schema

const newsSchema = new Schema({
    Author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: String,
    image: String,
    title: String,
},
    {
        timestamps: true
    })

const News = mongoose.model("News", newsSchema)
module.exports = News