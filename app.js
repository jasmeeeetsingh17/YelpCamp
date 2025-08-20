const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Campground = require('./models/campground');

//Configurations
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp')
    .then(() => {
        console.log("Mongo Connection Success")
    })
    .catch((err) => {
        console.log("Mongo Error")
        console.log(err)
    })

//Routes
app.get('/', (req, res) => {
    res.render('home');
    console.log("Home Page")
})

//CRUD 

//Create 
app.get('/campgrounds/new', async (req, res) => {
    res.render('campgrounds/new')
    console.log("New CampGrounds Page")
})

app.post('/campgrounds', async (req, res) => {
    const newCampground = new Campground(req.body.campground);
    await newCampground.save();
    res.redirect(`/campgrounds/${newCampground.id}`);
    console.log(`${newCampground.title} Page`)
})

//Read
app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
    console.log("All CampGrounds Page")
})

app.get('/campgrounds/:id', async (req, res) => {
    const id = req.params.id;
    const campground = await Campground.findById(id)
    res.render('campgrounds/show', { campground });
    console.log(`${campground.title} Page`)
})

//Update
app.get('/campgrounds/:id/edit', async (req, res) => {
    const id = req.params.id;
    const campground = await Campground.findById(id)
    res.render('campgrounds/edit', { campground })
    console.log("Edit Page")
})

app.put('/campgrounds/:id', async (req, res) => {
    const id = req.params.id;
    const updateCampground = await Campground.findByIdAndUpdate(id, req.body);
    res.redirect(`/campgrounds/${id}`);
    console.log(`${updateCampground.title} Page`)
})

//Delete 
app.delete('/campgrounds/:id', async (req, res) => {
    const id = req.params.id;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
    console.log("All CampGrounds Page")
})


//Server 
app.listen(3000, () => {
    console.log("Server Running ")
})