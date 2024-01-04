const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index.js");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;
    try{
        const admin = new Admin({username:username,password:password});
        await admin.save();
        res.status(200).json({msg:"Admin created successfully"})
    }catch(err){
        console.log("----->",err);
        res.status(400).json({msg:"Admin cannot be created"});
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const obj  = req.body;
    try{
        const course =new Course(obj);
        await course.save();
        res.status(200).json({ msg: 'Course created successfully', courseId: course._id})
    }catch(err){
        console.log("----->",err);
        res.status(400).json({msg:"Course creation failed"});
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try{
        const arr = await Course.find({});
        res.status(200).json({msg:"fetched",courses:arr});
    }catch(err){
        console.log("----->",err);
        res.status(400).json({msg:"Course fetch failed"});
    }
    
});

module.exports = router;