
const Subscriber = require('../Models/Recipemodel')
const express = require('express')

const router = express.Router()
var cors = require('cors');
const Recipemodel = require('../Models/Recipemodel');


router.get('/', async(req, res) => {
    console.log("testing in server recipeptah")
        try {
  const subscribers = await Subscriber.find();
  //console.log(subscribers)
   res.json(subscribers)
   console.log("suceess");

   Subscriber.count({}, function( err, count){
    console.log( "Number of users:", count );

})


    } catch (err) {
   res.status(500).json({ message: err.message })
    }
  });

    ///*****************testrandom
    router.get('/start', cors(),async(req, res) =>  {
      console.log("inside start");
      var count = req.headers["count"];
      var pagenum = req.headers["pagenum"];

      console.log(count)
      count = Number(count)
      pagenum = Number(pagenum)
      console.log(count)
      console.log(pagenum)
     // filter = { ReviewUserID:subscriber.ReviewUserID, Reviewrecipeid:subscriber.Reviewrecipeid };
      //var subscriberfinal=[];
        try{
  
          const subscribers = await Subscriber.find().          
          skip((pagenum)*(count)).limit(count);
  
         
         
       // console.log(subscribers)
        res.json(subscribers)
      }
        catch (err) {
          res.status(500).json({ message: err.message })
           }
      })
  ///*****************testsearch
  router.get('/search', cors(),async(req, res) =>  {
    console.log("inside search")
    var keywords = req.headers["keywords"];
    keyword_array = keywords.split(" ")
    console.log(keyword_array)
    var filter ={}
   // filter = { ReviewUserID:subscriber.ReviewUserID, Reviewrecipeid:subscriber.Reviewrecipeid };
    var subscriberfinal=[];
      try{
        for (let index = 0; index < keyword_array.length; index++) {
          var singlekeyword =  keyword_array[index] ;
          filter = {title: new RegExp(singlekeyword,  'i')};
          console.log(filter);
          subscribers = await Subscriber.find(filter);
          console.log("after await")
         // console.log(subscribers);
          subscriberfinal.push(subscribers)

        }

       
       
   //   console.log(subscriberfinal)
      res.json(subscriberfinal)
    }
      catch (err) {
        res.status(500).json({ message: err.message })
         }
    })

///*****************
  router.get('/:id', cors(),async(req, res) =>  {
    console.log("testing in server onereipepath")
    recipeid = req.params['id'];
    
   // console.log(recipeid);
      try{
       subscribers = await Subscriber.find().where('Recipeid').equals(recipeid);
       subscribers = subscribers[0];
   //   console.log(subscribers)
      res.json(subscribers)
    }
      catch (err) {
        res.status(500).json({ message: err.message })
         }
    })

  

//////***************************** */
    router.post('/', async (req, res) => {
        var subscriber = new Subscriber({              
            Recipeid: req.body.Recipeid,
    vegetarian: req.body.vegetarian,
    vegan: req.body.vegan,
    glutenFree: req.body.glutenFree,
    veryHealthy: req.body.veryHealthy,
    dairyFree: req.body.dairyFree,
cheap: req.body.cheap,
veryPopular: req.body.veryPopular,
sustainable: req.body.sustainable,
weightWatcherSmartPoints: req.body.weightWatcherSmartPoints,
gaps: req.body.gaps,
lowFodmap: req.body.lowFodmap,
aggregateLikes: req.body.aggregateLikes,
spoonacularScore: req.body.spoonacularScore,
healthScore: req.body.healthScore,
creditsText: req.body.creditsText,
license: req.body.license,
sourceName: req.body.sourceName,
pricePerServing: req.body.pricePerServing,
extendedIngredients: req.body.extendedIngredients,
title: req.body.title,
readyInMinutes: req.body.readyInMinutes,
servings: req.body.servings,
sourceUrl: req.body.sourceUrl,
image: req.body.image,
imageType: req.body.imageType,
summary: req.body.summary,
cuisines: req.body.cuisines,
dishTypes: req.body.dishTypes,
diets: req.body.diets,
occasions: req.body.occasions,
winePairing: req.body.winePairing,
instructions: req.body.instructions,
analyzedInstructions: req.body.analyzedInstructions,

originalId: req.body.originalId,
spoonacularSourceUrl: req.body.spoonacularSourceUrl,
UserID: req.body.UserID


        })
        
      console.log("chck post recipe")
    //  console.log(subscriber)
        try {

          console.log("tyty1")
          subscribersret = await Subscriber.find().where('dbcolumn').sort({'Recipeid': -1}).limit(1);
          console.log("tyty2")
           subscribersrets = subscribersret[0];
          // console.log("type int rty");
          // console.log(subscribersrets);
          // console.log("type int rty1");
          // //console.log(Number(subscribersrets.Recipeid))
          // console.log("type int rty2");
         recipeid = Number(subscribersrets.Recipeid) +1;
         //recipeid =0;
          console.log("tyty3")
          console.log(recipeid)

          subscriber.Recipeid = String(recipeid);
          console.log("tyty4")
         // console.log(subscriber)
          if(subscriber != undefined)
          {
            const newSubscriber = await subscriber.save();
           // console.log(newSubscriber)
            res.status(201).json(newSubscriber)
          }
          else{
            res.status(424).json("Some error")
          }
          
          
        } catch (err) {
          res.status(400).json({ message: err.message })
        }
      })
      ////********************************************* */
      
      router.delete('/:id', async(req, res) => {
        try {
          
        const subscribers = await Subscriber.find().where('dbcolumn').equals(req.params['id'])
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

      ///****************** */

      module.exports = router