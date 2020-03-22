express = require("express");

var router = express.Router();

var burger = require("../models/burgerModel.js");

router.get("/", function(req, res){
    burger.selectAll((data)=>{
        var newObj = {
            burgers: data
        };

        console.log(newObj);
        res.render("index", newObj);
    });
});

router.post("api/burgers", (req, res)=>{
    console.log("Post hit")
    burger.create([
        "name", "devoured"
    ],[
        req.body.name, req.body.devoured
    ],
    (result) => {
        res.json({id: result.insertId}); 
    }
    ); 
});

router.put("/api/burgers/:id", (req,res)=>{
    var condition = "id = " + req.params.id;

    console.log("Condition: " + condition);

    burger.update({devoured: req.body.devoured}, condition, (result)=>{
        if(result.affectedRows === 0){
            return res.status(404).end();
        }else{
            res.status(200).end();
        }
    });
}); 


module.exports = router;