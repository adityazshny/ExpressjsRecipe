const mongoose = require('mongoose')
const Reviewmodel = require('../Models/Review')

//var order = new mongoose.Schema({ Ordername: String, Orderprice:Number });



const subscriberSchema = new mongoose.Schema({
  UserID: {
    type: String
  },
  Firstname: {
    type: String    
  },
  Lastname: {
    type: String
  },
  EmailId: {
    type: String    
  },
  Password: {
    type: String    
  },
  Gender: {
    type: String
  },
  City: {
    type: String
  },
  Wishlist:
  {
	  type:[Number]
  },
    Notifications:
  {
	  type:[String]
  },
  ProfileUrl:
  {
	  type: String
  },
  Aboutyou:
  {
	  type: String
  },
  SocialMediaHandles:
  {
   type:{String,String}
  },
  FavRecipesId:{
    type:[String]
  },
  Friends:{
    type:[String]
  },
  SubmittedRecipes:{
    type:[String]
  }
})


module.exports = mongoose.model('User', subscriberSchema)