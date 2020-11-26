
const Subscriber = require('../Models/UserModel')
const express = require('express')

const router = express.Router()
var cors = require('cors')

router.get('/getUserID' ,async(req, res) => {
    console.log("testing od method")
    try {
      var mysort = { UserID: -1 };
    const subscribers = await Subscriber.find().sort(mysort).limit(1);
    res.subscriber = subscribers;
   // console.log(subscribers)
   
   // res.json(subscribers)
   console.log(subscribers[0].UserID)
   
      res.json(subscribers[0].UserID)
    } catch(err) {
      res.status(500).json({ message: err.message })
    }
  })

  module.exports = router

  