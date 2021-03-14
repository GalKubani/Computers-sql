const express= require('express')
const Computer= require('../models/computerModel')
const router= new express.Router();
const {Op}= require("sequelize")



router.post('/computers/new', async(req,res)=>{
    try{
        const computer= await Computer.create(req.body)
        res.send(computer)
    }catch(err){
        res.status(400).send({
            status:400, computer: err.computer,
        });
    }
});
router.get('/computers/getall', async(req,res)=>{
    try{
        const computers= await Computer.findAll()
        if(!computers){ res.send([])}
        res.send(computers)
    }catch(err){
        res.status(500).send(err);
    }
})
router.get('/computers/getfromprice', async(req,res)=>{
    const priceValue= req.query.price
    try{
        const computers= await Computer.findAll({
            where:{
                price:{[Op.gte]:priceValue}
            }
        })
        if(!computers){ res.send([])}
        res.send(computers)
    }catch(err){
        res.status(500).send(err);
    }
})
router.get('/computers/getbymanufacturer', async(req,res)=>{
    const manufacturerValue= req.query.manufacturer
    try{
        const computers= await Computer.findAll({
            where:{
                manufacturer:{[Op.like]:manufacturerValue}
            }
        })
        if(!computers){ res.send([])}
        res.send(computers)
    }catch(err){
        res.status(500).send(err);
    }
})

module.exports=router;