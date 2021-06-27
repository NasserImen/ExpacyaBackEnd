const express = require ('express')
const router = express.Router()
const userSchema = require ("../schema/user")
const bcrypt = require('bcrypt')

router.post('/register' ,  async(req , res)=>{
    console.log(req.body);
        await bcrypt.hash(req.body.password , 10,async (err,hash)=>{
            const user = await userSchema.create({
                email:req.body.email,
                password:hash
            });
            res.json(user)
           
        })
    


})

module.exports = router;