const mongoose = require('mongoose')


const subscriberSchema = new mongoose.Schema(
    { 
        Reviewrecipeid:{type:String},
        ReviewUserID:{type:String},
        ReviewText:{type:String},
        ReviewRating:{type:String},
        ReviewRecipename:{type:String},
      ReviewUsername:{type:String},
    });


    module.exports = mongoose.model('Reviews', subscriberSchema)