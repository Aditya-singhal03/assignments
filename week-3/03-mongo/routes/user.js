const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User } = require("../db/index.js");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username=req.body.username;
    const password=req.body.password;
    try{
        const user = new User({username:username,password:password});
        await user.save();
        res.status(200).json({msg:"User created successfully"})
    }catch(err){
        console.log("----->",err);
        res.status(400).json({msg:"User cannot be created"});
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    try{
        const arr = await Course.find({});
        res.status(200).json({msg:"fetched",courses:arr});
    }catch(err){
        console.log("----->",err);
        res.status(400).json({msg:"Course fetch failed"});
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const id = req.params.courseId;
    try{
        const user = await User.findOne({username:req.headers['username'],password :req.headers['password']});
        console.log(user)
        user.courses.push(id);
        const newUser = await user.save();
        res.status(200).json({ message: 'Course purchased successfully' });
    }catch(err){
        console.log("---->",err);
        res.status(400).json({msg:"bhag sale teri to"})
    }

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    try{
        const user = await User.findOne({username:req.headers['username'],password :req.headers['password']}).populate('courses');
        console.log(user)
        res.status(200).json({ message: 'Course purchased successfully' ,purchasedCourses:user.courses});
    }catch(err){
        console.log("---->",err);
        res.status(400).json({msg:"bhag sale teri to"})
    }
});

module.exports = router