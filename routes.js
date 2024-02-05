const express = require('express');
const router = express.Router();
const Car = require('./models/cars');

//Fetching all movies
router.get('/cars', async(req,res)=> {
    try {
        const cars = await Car.find();
        res.send(cars)
    }catch(error){
        return res.status(500).json({message: error.message});
    }

});
//Adding new car
router.post('/cars', async(req,res) => {
    const car = new Car({
        brand: req.body.brand,
        model: req.body.model,
        color: req.body.color,
        year:req.body.year
    
    });

    try {
        const newCar = await car.save();
        res.status(201).json({newCar});
    }catch(error) {
        return res.status(500).json({message: error.message});
    }
});
//Delete cars
router.delete('/cars', async(req,res)=> {
    const response = await Car.deleteOne({brand: req.body.brand})
    if(response.deletedCount === 0) {
        return res.status.apply(404).json({ message: 'Car not found'});

    }return res.status(200).json({message: 'Car deleted'});

})
// Updating car with ID
router.put('/cars/:id', async(req,res) => {
    const response = await Car.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
    if (response === null) {
        return res.status(404).json({message: "Car not found"})
    }return res.status(200).json({message: 'Car updated'})
})

module.exports = router;
