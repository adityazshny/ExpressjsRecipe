
const Subscriber = require('../Models/UserModel')

const express = require('express')

const router = express.Router()
var cors = require('cors')




// Get all subscribers
router.get('/', async(req, res) => {
  console.log("testing in server all")
	  try {
const subscribers = await Subscriber.find();
console.log(subscribers)
 res.json(subscribers)
 console.log("suceess")
  } catch (err) {
 res.status(500).json({ message: err.message })
  }
})
////********************************************* */

//get reviews by User
router.get('/reviews', async(req, res) => {
  console.log("testing in server user for reviewsall");
  console.log(req.headers);
  var reviewuserid = req.headers["reviewuserid"];
  
  console.log(reviewuserid);
  
	  try {
const subscribers = await ReviewSubscriber.find(); //.where('ReviewUserID').equals(reviewuserid);
console.log(subscribers)
 res.json(subscribers)
 console.log("suceess")
  } catch (err) {
 res.status(500).json({ message: err.message })
  }
})
////********************************************* */
router.get('/login', async(req, res) => {
  console.log("Login")
  
  
  var emailid = req.headers["emailid"];
  var password = req.headers["password"];
  console.log(req.headers);
  console.log(emailid)
  console.log(password)
	  try {
      
      var subscribers = new Subscriber();
      subscribers = await Subscriber.find().where('EmailId').equals(emailid);
      subscribers = subscribers[0];
      console.log(subscribers)
    //  console.log(subscribers.Password)
      if(subscribers !=undefined)
      {
        if(subscribers.Password == password)
        {res.json(true)}
        else{
        res.json(false)}
      }
      else
      {
        res.json(false);
      }
      
  } catch (err) {
 res.status(500).json({ message: err.message })
  }
	
})
////********************************************* Unique email*/

router.get('/uniqueemail', async(req, res) => {
  console.log("uniqueemail")
  
  console.log(JSON.stringify(req.headers["emailid"]));
  var emailid = req.headers["emailid"];
  var password = req.headers["password"];
  console.log(emailid)
	  try {
      
      var subscribers = new Subscriber();
      subscribers = await Subscriber.find().where('EmailId').equals(emailid);
      subscribers = subscribers[0];
      console.log(subscribers);
      if(subscribers !=undefined)
      {
        res.json(true)
      }
      else
      {
        res.json(false);
      }
      
  } catch (err) {
 res.status(500).json({ message: err.message })
  }
	
})
////********************************************* */

//Get one subscriber
router.get('/:id', cors(),async(req, res) => {
console.log("testing in server one")

var useridvar = Number(req.params['id']);

console.log(req.params['id']);
console.log(useridvar);

  try{
   subscribers = await Subscriber.find().where('UserID').equals(useridvar);
   console.log(subscribers)
   subscribersf = subscribers[0];
  console.log(subscribersf)
  res.json(subscribersf)
}
  catch (err) {
    res.status(500).json({ message: err.message })
     }
})

///********************************

router.get('/getbyemail/:emailid', cors(),async(req, res) => {
  console.log("testing in server oneemail ")
  emailid = req.params['emailid'];
    try{
     subscribers = await Subscriber.find().where('EmailId').equals(emailid);
     subscribers = subscribers[0];
    console.log(subscribers)
    res.json(subscribers)
  }
    catch (err) {
      res.status(500).json({ message: err.message })
       }
  })

////********************************************* */
// Create one subscriber
router.post('/', async (req, res) => {
  var subscriber = new Subscriber({    
    UserID: req.body.UserID,
    Firstname: req.body.Firstname,
    Lastname: req.body.Lastname,
    EmailId: req.body.EmailId,
    Password:req.body.Password,
    Gender: req.body.Gender,
    City: req.body.City,
    Wishlist: req.body.Wishlist,
    Notifications: req.body.Notifications,
    SocialMediaHandles:{
      "twitter":"",
      "pinterest":"",
      "facebook":"",
      "perosnalblog":"",
    },
    ProfileUrl: req.body.ProfileUrl,
    Aboutyou:req.body.Aboutyou,
    FavRecipesId:req.body.FavRecipesId,
    Friends:req.body.Friends,
    SubmittedRecipes:req.body.SubmittedRecipes,
    Reviews:req.body.Reviews

  })
  console.log(req.body);
console.log("chck post")
console.log(subscriber)
  try {
    subscribers = await Subscriber.find().where('EmailId').equals(subscriber.EmailId);
    subscribers = subscribers[0];
    console.log(subscribers)
    if(subscribers == undefined)
    {
      const newSubscriber = await subscriber.save();
      console.log(newSubscriber)
      res.status(201).json(newSubscriber)
    }
    else{
      res.status(424).json("Duplicate email ID")
    }
    
    
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
////********************************************* */
// Update one subscriber
router.put('/', async(req, res) => {
console.log('test patch put')
var subscriber = new Subscriber();
var subscribers = await Subscriber.find().where('EmailId').equals(req.body.EmailId)

console.log(req.body);
   
//console.log(subscribers)
  if (req.body.UserID != null) {
    subscriber.UserID = req.body.UserID
  }

  if (req.body.Firstname != null) {
    subscriber.Firstname = req.body.Firstname
  }
  if (req.body.Lastname != null) {
    subscriber.Lastname = req.body.Lastname
  }

  if (req.body.EmailId != null) {
    subscriber.EmailId = req.body.EmailId
  } if (req.body.Gender != null) {
    subscriber.Gender = req.body.Gender
  }

  if (req.body.City != null) {
    subscriber.City = req.body.City
  } if (req.body.Password != null) {
    subscriber.Password = req.body.Password
  }

  if (req.body.Wishlist != null) {
    subscriber.Wishlist = req.body.Wishlist
  }
  if (req.body.Notifications != null) {
    subscriber.Notifications = req.body.Notifications
  }
  if (req.body.ProfileUrl != null) {
    subscriber.ProfileUrl = req.body.ProfileUrl
  }
  if (req.body.Aboutyou != null) {
    subscriber.Aboutyou = req.body.Aboutyou
  }
  if (req.body.SocialMediaHandles != null) {
    subscriber.SocialMediaHandles = req.body.SocialMediaHandles
    
  }
 

console.log(subscriber)
  try {
   // const filter = { naCustomerIDme: '9' };
    //const update = { Lastname: 'patchtesting' };
    console.log("step2")
    //console.log(subscriber)
    console.log("testinginbtw");
   // console.log(req.params['id'])
    var filter = { EmailId:req.body.EmailId };
  var update = { $set: {Password:subscriber.Password,Firstname:subscriber.Firstname ,Lastname:subscriber.Lastname,
    gender:subscriber.Gender ,City:subscriber.City, Wishlist:subscriber.Wishlist, Notifications:subscriber.Notifications,
    SocialMediaHandles:subscriber.SocialMediaHandles, Aboutyou:subscriber.Aboutyou, ProfileUrl:subscriber.ProfileUrl  } };
    let doc = await Subscriber.updateOne(filter, update );
    console.log("step3")
    res.json(doc)
  } catch (err){
    res.status(400).json({ message: err.message })
  }


})

// Delete one subscriber
router.delete('/:id', async(req, res) => {
  try {
    
  const subscribers = await Subscriber.find().where('CustomerID').equals(req.params['id'])
  res.subscriber = subscribers;
  console.log(subscribers)
  console.log(subscribers.id)
 console.log(subscribers[0]._id) 
 // res.json(subscribers)
    await Subscriber.findByIdAndDelete(subscribers[0]._id)
    res.json({ message: 'Deleted This Subscriber' })
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})




module.exports = router
