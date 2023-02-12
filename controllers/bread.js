const router = require('express').Router()
const Bread = require('../models/bread')
const Baker = require('../models/baker')
const seedData = require('../models/seedData')

//GET: all the bread
router.get('/',async(req, res)=>{
const bread = await Bread.find()
const bakers = await Baker.find()
    res.render('index', {
        breads: bread,
        bakers
    })
})
//GET: create new bread
router.get('/new', async (req, res)=>{
    const bakers = await Baker.find()
    res.render('new',{
    bakers
})
})

//GET: edit bread page
router.get('/:id/edit', async (req,res)=>{
    const{ id } = req.params
    const bread = await Bread.findById(id)
    const bakers = await Baker.find()
    res.render('edit',{
        bread,
        bakers
    }) 
})

//GET: get a bread by its index
router.get('/:id', async (req,res) =>{
    const { id } = req.params;
    const bread= await Bread.findById(id).populate('baker')
    res.render('show',{
        bread
        })      
})
 //seed data
 router.get('/data/seed', async(req,res) =>{
    await Bread.insertMany(seedData)
    res.redirect('/breads')
    

})
router.get('/data/delete', async (req,res) => {
    await Bread.deleteMany()
    res.redirect('/breads')
})
//POST
router.post('/', async (req,res)=>{
    const {hasGluten,image} = req.body
if(!image) req.body.image = undefined
if(hasGluten === 'on'){
        req.body.hasGluten = true
     } else{
        req.body.hasGluten = false
    } 
await Bread.create(req.body)
res.redirect('/breads')
})

//PUT:
router.put('/:id', async(req,res)=>{
const { id }  = req.params
const { image, hasGluten } = req.body
if(!image) req.body.image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzYIJV09uvZYPI1noMVfubX1aJVij7-jY3pQ&usqp=CAU'
   
    if(hasGluten === 'on'){
        req.body.hasGluten = true
     } else{  
        req.body.hasGluten = false
    } 
    await Bread.findByIdAndUpdate(id, req.body)
    res.redirect(`/breads/${id}`)

 })

    // Delete 
 router.delete('/:id', async (req,res)=> {
    const { id } = req.params
    await Bread.findByIdAndDelete(id)   

    res.status(303).redirect('/breads')
})


module.exports = router