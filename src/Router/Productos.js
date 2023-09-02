const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
    res.json({Message:'ando'})

})


router.get('/crear',(req,res)=>{
    res.send('Crear producto')
})
module.exports=router;