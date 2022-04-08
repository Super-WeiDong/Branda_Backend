const express = require("express");
const router = express.Router();
let Ship = require("../models/Ship");

/**
 * tell Express.js that when it receives a POST request at the URL /newShip/, to do this code.
 */
router.post("/newShip/", function(req, res){
  // look up documents in MongoDB by name.
  Ship.findOne({name: req.body.name}, function(error,doc){
    // if there was an error
    if(error){
      console.error("Error finding ship",error);
      res.status(500).send(error);
    }
    // if no document was found
    else if(!doc){
      // create a new instance of the Ship model, using the request body as the data.
      new Ship(req.body).save((err, doc) => {
        /**
         * this error/document fat-arrow function is required.
         * on an error, handle it. else send the newly created document back to the client.
         */
        if(err){
          console.error("Error saving new ship",err);
          res.status(500).send(err);
        }
        else{
          res.send(doc);
        }
      });
    }
    // a document was found, return it instead.
    else{
      res.send(doc);
    }
  });
});

/**
 * get a ship by name
 */
router.get("/getShip/name", function(req, res){
  // look up documents in MongoDB by name.
  Ship.findOne({name: req.body.name}, function(error,doc){
    // if there was an error
    if(error){
      console.error("Error finding ship",error);
      res.status(500).send(error);
    }
    // if no ship was found
    else if(!doc){
      // if no ship with the given name is found, return HTTP code 404.
      res.status(404).send(error);
    }
    // if a ship with that name is already present in the database,return the existing entry.
    else{
      res.send(doc);
    }
  });
});

/**
 * return all the ships in the database with the specified model of secondary battery.
 */
router.get("/getShip/secondaryBattery", function(req, res){
  // look up documents in MongoDB by name.
  Ship.find({secondaryBattery: req.body.secondaryBattery}, function(error,doc){
    // if there was an error
    if(error){
      console.error("Error finding ship",error);
      res.status(500).send(error);
    }
    // if no document was found
    else if(!doc){
      // if no ship with the given name is found, return HTTP code 404.
      res.status(404).send(error);
    }
    // if a ship with that name is already present in the database,return the existing entry.
    else{
      res.send(doc);
    }
  });
});

/**
 * Update a ship's characteristic
 */
router.patch("/updateShip", function(req, res){
  if(!req.body.name){
    res.status(400);
  }
  // look up documents in MongoDB by name.
  Ship.findOneAndUpdate({name: req.body.name},{launched:req.body.launched},function(error,doc){
    // if there was an error
    if(error){
      console.error("Error finding ship",error);
      res.status(500).send(error);
    }
    // if no document was found
    else if(!doc){
      // if no ship with the given name is found, return HTTP code 404.
      res.status(404).send(error);
    }
    // if a ship with that name is already present in the database,return the existing entry.
    else{
      Ship.find({name: req.body.name}, function(error,doc){
        res.send(doc);
      });
    }
  });
});

module.exports = router;