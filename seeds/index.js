const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelper')

mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp')
    .then(() => {
        console.log("Mongo Connection Success")
    })
    .catch((err) => {
        console.log("Mongo Error")
        console.log(err)
    })

const random = rand => rand[Math.floor(Math.random() * rand.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const camp = new Campground({
            title: `${random(descriptors)} ${random(places)}`,
            location: `${random(cities).city}, ${random(cities).state}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium rem repudiandae eum blanditiis nulla impedit, beatae saepe at deserunt doloribus quod natus ex voluptate numquam magnam ducimus neque omnis eligendi.',
            price: `$ ${Math.floor(Math.random() * 50)} `
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});