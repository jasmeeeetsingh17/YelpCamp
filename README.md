# 🏕️ YelpCamp

A simple **CRUD** web application built with **Node.js**, **Express**, and **MongoDB** for managing campground listings.  
Users can **create**, **view**, **update**, and **delete** campgrounds.  
This project uses **EJS** templating and **Bootstrap** for views.

---

## ✨ Features

✅ View all campgrounds  
✅ View details of a single campground  
✅ Add new campgrounds with validation  
✅ Edit and update existing campgrounds  
✅ Delete campgrounds  
✅ Server-side form validation with Joi  
✅ Custom error handling (404 pages, validation errors)

---

## 🛠️ Tech Stack

- 🟢 [Node.js](https://nodejs.org/)
- 🚏 [Express.js](https://expressjs.com/)
- 🍃 [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- 🎨 [EJS](https://ejs.co/) templating engine with [ejs-mate](https://www.npmjs.com/package/ejs-mate)
- ✅ [Joi](https://joi.dev/) for validation
- 🔄 [Method-Override](https://www.npmjs.com/package/method-override) for PUT & DELETE requests

---

📝 Validation

The app uses a Joi schema to validate all campground form submissions.
For example, price must be a number ≥ 0.
If a user submits invalid data, a 400 error is thrown and displayed.

⚠️ Error Handling

🚫 Unknown routes return a 404 “Page NOT FOUND !!” error.

🛑 Invalid form submissions return a 400 error with details.

🖼️ All errors are rendered via the views/error.ejs template.

--- 

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/yelpcamp.git
   cd yelpcamp
   
2. **Install dependencies**
   ```bash
   npm install


3. **Set up MongoDB**
   Make sure MongoDB is running locally on port 27017.
   The app uses a database named yelpCamp by default:
   
      ```bash
   mongodb://127.0.0.1:27017/yelpCamp


5. **Run the server**
   
   ```bash
    nodemon app.js

---
