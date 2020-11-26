const mongoose = require('mongoose')

const Measure = new mongoose.Schema(
    { 
        measuretype:
        {
        type:{String,String}
        }
});
const Equipment = new mongoose.Schema(
    { 
        equipmentid:{type:Number},
    name:{type:String},
    image:{type:String},
    });

    const Ingredient = new mongoose.Schema(
    {   ingredientid: Number, 
        aisle:String,
        image:String,
        consistency:String,
        name:String,
        original:String,
        originalString:String,
        originalName:String,
        amount:Number,
        unit:String,
        meta:[String],
        metaInformation:[String],
        measures:[Measure],

     });

     const InstructionStep = new mongoose.Schema(
        {
         number:Number,
         step:String,
         ingredients:[Ingredient],
         equipment:[Equipment]
     });

         
     const analyzedInstruction = new mongoose.Schema(
{
    name:String,
    steps:[InstructionStep]

});

const subscriberSchema = new mongoose.Schema({
    Recipeid:String,
    vegetarian:Boolean,
    vegan:Boolean,
    glutenFree:Boolean,
    veryHealthy:Boolean,
    dairyFree:Boolean,
cheap:Boolean,
veryPopular:Boolean,
sustainable:Boolean,
weightWatcherSmartPoints:Number,
gaps:String,
lowFodmap:Boolean,
aggregateLikes:Number,
spoonacularScore:Number,
healthScore:Number,
creditsText:String,
license:String,
sourceName:String,
pricePerServing:Number,
extendedIngredients:[Ingredient],
title:String,
readyInMinutes:Number,
servings:Number,
sourceUrl:String,
image:String,
imageType:String,
summary:String,
cuisines:[String],
dishTypes:[String],
diets:[String],
occasions:[String],
winePairing:[String],
instructions:[String],
analyzedInstructions:[analyzedInstruction],

originalId:String,
spoonacularSourceUrl:String,
UserID:String
});

module.exports = mongoose.model('Recipe', subscriberSchema)