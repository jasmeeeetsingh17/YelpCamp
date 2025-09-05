const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ExpressError = require('./utils/ExpressError');
const CatchAsync = require('./utils/CatchAsync');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const Campground = require('./models/campground');
const campgroundSchema = require('./schemas');

//Configurations
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(400, msg);
    }
    else {
        next();
    }
}

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
app.get('/campgrounds/new', CatchAsync(async (req, res) => {
    res.render('campgrounds/new')
    console.log("New CampGrounds Page")
}))

app.post('/campgrounds', validateCampground, CatchAsync(async (req, res) => {
    const newCampground = new Campground(req.body.campground);
    await newCampground.save();
    res.redirect(`/campgrounds/${newCampground.id}`);
    console.log(`${newCampground.title} Page`)
}))

//Read
app.get('/campgrounds', CatchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
    console.log("All CampGrounds Page")
}))

app.get('/campgrounds/:id', CatchAsync(async (req, res) => {
    const id = req.params.id;
    const campground = await Campground.findById(id)
    res.render('campgrounds/show', { campground });
    console.log(`${campground.title} Page`)
}))

//Update
app.get('/campgrounds/:id/edit', CatchAsync(async (req, res) => {
    const id = req.params.id;
    const campground = await Campground.findById(id)
    res.render('campgrounds/edit', { campground })
    console.log("Edit Page")
}))

app.put('/campgrounds/:id', validateCampground, CatchAsync(async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body.campground;
    const updatedCampground = await Campground.findByIdAndUpdate(id, updatedData, { new: true });
    res.redirect(`/campgrounds/${id}`);
    console.log(`${updatedCampground.title} Page`);
}))


//Delete 
app.delete('/campgrounds/:id', CatchAsync(async (req, res) => {
    const id = req.params.id;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
    console.log("All CampGrounds Page")
}))

//404
app.all(/(.*)/, (req, res, next) => {
    next(new ExpressError(404, 'Page NOT FOUND !!'))
})

//Error 
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something went wrong !! "
    res.status(statusCode).render('error', { err });
})

//Server 
app.listen(3000, () => {
    console.log("Server Running")
})