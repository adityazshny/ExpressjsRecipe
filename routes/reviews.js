
const Subscriber = require('../Models/Review')
const express = require('express')

const router = express.Router()
var cors = require('cors')


router.get('/', async(req, res) => {
    console.log("testing in server reviews all")

    var userid = req.headers["reviewuserid"];
    var recipeid = req.headers["reviewrecipeid"];
    console.log(req.headers);
    console.log(userid)
    console.log(recipeid)

    var subscriber = new Subscriber();
    var filter ={}
    if (userid != null && recipeid != null) {
      subscriber.ReviewUserID = userid;
      subscriber.Reviewrecipeid = recipeid;
       filter = { ReviewUserID:subscriber.ReviewUserID, Reviewrecipeid:subscriber.Reviewrecipeid };
    }
  
    else if (recipeid != null) {
      subscriber.Reviewrecipeid = recipeid;
      filter = { Reviewrecipeid:subscriber.Reviewrecipeid}
    }
    else if( userid != null )
    {
      subscriber.ReviewUserID = userid;
      filter = { ReviewUserID:subscriber.ReviewUserID}
    }

    console.log(subscriber)
    console.log(filter)
        try {
  const subscribers = await Subscriber.find(filter);
  console.log(subscribers)
   res.json(subscribers)
   console.log("suceess")
    } catch (err) {
   res.status(500).json({ message: err.message })
    }
  })

  ////********************************************* */
// Create one Review from 
router.post('/', async (req, res) => {
  console.log("chck post review")
  var subscriber = new Subscriber({    
    ReviewUserID: req.body.ReviewUserID,
    Reviewrecipeid: req.body.Reviewrecipeid,
    
    ReviewText:req.body.ReviewText,
    ReviewRating:req.body.ReviewRating,
    ReviewUsername : req.body.ReviewUsername,
    ReviewRecipename : req.body.ReviewRecipename
  })
  console.log(req.body);
console.log("chck post review")
console.log(subscriber)
  try {   
    var filter = { ReviewUserID:req.body.ReviewUserID, Reviewrecipeid:req.body.Reviewrecipeid };
    console.log(filter)
    const subscribers = await Subscriber.find(filter);
    var subscriberreview = subscribers[0];
    console.log(subscribers)
    if(subscriberreview==null)
    {
    const newSubscriber = await subscriber.save();
    console.log(newSubscriber)
    res.status(201).json(newSubscriber)
    }
    else{
      res.status(422).json("Review already exists for this Recipe by User")
    }
  }
    catch (err) {
    res.status(400).json({ message: err.message })
  }
})

/////////////////
//edit a review
router.put('/', async(req, res) => {
  console.log('test review patch put')
  var subscriber = new Subscriber();
  //var subscribers = await Subscriber.find().where('EmailId').equals(req.body.EmailId)
  
  console.log(req.body);
     
  //console.log(subscribers)
    if (req.body.ReviewUserID != null) {
      subscriber.ReviewUserID = req.body.ReviewUserID
    }
  
    if (req.body.Reviewrecipeid != null) {
      subscriber.Reviewrecipeid = req.body.Reviewrecipeid
    }
    if (req.body.ReviewText != null) {
      subscriber.ReviewText = req.body.ReviewText
    }
    if (req.body.ReviewRating != null) {
      subscriber.ReviewRating = req.body.ReviewRating
    } 
    if (req.body.ReviewRecipename != null) {
      subscriber.ReviewRecipename = req.body.ReviewRecipename
    } 
    if (req.body.ReviewUsername != null) {
      subscriber.ReviewUsername = req.body.ReviewUsername
    } 
  
  console.log(subscriber)
    try {
     // const filter = { naCustomerIDme: '9' };
      //const update = { Lastname: 'patchtesting' };
      console.log("step2 put review")
      //console.log(subscriber)
      console.log("testinginbtw put");
     // console.log(req.params['id'])
      var filter = { ReviewUserID:req.body.ReviewUserID, Reviewrecipeid:req.body.Reviewrecipeid };
    var update = { $set: { ReviewText:subscriber.ReviewText, ReviewRating:subscriber.ReviewRating  } };
      let doc = await Subscriber.updateOne(filter, update );
      console.log("step3")
      res.json(doc)
    } catch (err){
      res.status(400).json({ message: err.message })
    }
  
  
  })

  // Delete one reviw
router.delete('/', async(req, res) => {
  try {
    console.log("inside delete review")
    var filter = { ReviewUserID:req.body.ReviewUserID, Reviewrecipeid:req.body.Reviewrecipeid };
  const subscribers = await Subscriber.find(filter);
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