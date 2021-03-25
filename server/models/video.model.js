const mongoose = require("mongoose")

const Schema = mongoose.Schema

const videoSchema = new Schema({
    Author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: String,
    videoURL: String,
    title: String,
},
    {
        timestamps: true
    })

const Video = mongoose.model("Video", videoSchema)
module.exports = Video