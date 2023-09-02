const express = require('express')

const router = express.Router();


router.get('/mice',(req,res)=>{
    res.json({mouse:'geniu',color:'negro',tipo:'blutu'})
})

router.get('/profile',(req,res)=>{
    res.json({cara:'fiero',color:'negro',tipo:'no binario manso puto'})
})

module.exports = router;