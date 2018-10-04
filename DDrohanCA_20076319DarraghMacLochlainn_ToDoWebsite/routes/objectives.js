let donations = require('../models/objectives');
let express = require('express');
let router = express.Router();

router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(objectives,null,5));
}

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var objective = getByValue(objectives,req.params.id);

    if (objective != null)
        res.send(JSON.stringify(objective,null,5));
    else
        res.send('To-Do NOT Found!!');

}

function getByValue(array, id) {
    var result  = array.filter(function(obj){return obj.id == id;} );
    return result ? result[0] : null; // or undefined
}

function getTotalVotes(array) {
    let totalVotes = 0;
    array.forEach(function(obj) { totalVotes += obj.upvotes; });
    return totalVotes;
}

router.addObjective = (req, res) => {
    //Add a new objective to our list
    var id = Math.floor((Math.random() * 1000000) + 1); //Randomly generate an id
    var currentSize = objectives.length;

    objectives.push({"id" : id, "paymenttype" : req.body.paymenttype, "amount" : req.body.amount, "upvotes" : 0});

    if((currentSize + 1) == objectives.length)
        res.json({ message: 'Objective Added Successfully!'});
    else
        res.json({ message: 'Objective NOT Added!'});
}

router.incrementUpvotes = (req, res) => {
    // Find the relevant objective based on params id passed in
    // Add 1 to upvotes property of the selected objective based on its id
    var objective = getByValue(objective,req.params.id);

    if (objective != null) {
        objective.upvotes += 1;
        res.json({status : 200, message : 'UpVote Successful' , objective : objective });
    }
    else
        res.send('Objective NOT Found - UpVote NOT Successful!!');

}

router.deleteObjective = (req, res) => {
    //Delete the selected donation based on its id
    var objective = getByValue(objectives,req.params.id);
    var index = objectives.indexOf(objective);

    var currentSize = objectives.length;
    objectives.splice(index, 1);

    if((currentSize - 1) == objectives.length)
        res.json({ message: 'Objective Deleted!'});
    else
        res.json({ message: 'Objective NOT Deleted!'});
}

router.findTotalVotes = (req, res) => {

    let votes = getTotalVotes(donations);
    res.json({totalvotes : votes});
}

module.exports = router;