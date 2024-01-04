const mongoose = require('mongoose');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username:{type:String,required:true},
    password:{type:String,required:true},
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username:{type:String,required:true},
    password:{type:String,required:true},
    courses:{type:[{type:mongoose.Schema.Types.ObjectId , ref:'Course'}], default:[]}
});

const CourseSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description: {type:String,required:true},
    price:{type:Number,required:true},
    published:{type:Boolean,default:true},
    imageLink:{type:String}
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}

//Nikku12345