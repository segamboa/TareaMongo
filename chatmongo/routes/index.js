var express = require('express');
var router = express.Router();
var wslib = require('../wslib');
const Joi = require("joi");
const fs = require("fs");

const men = require("../controllers/mensaje");

router.use(express.json());



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/chat/api/messages', function(req, res, next) {
  men.getMensajes((mensajes)=>{
    res.send(mensajes);
  })
});


router.post("/chat/api/messages", function (req, res, next){
  const { error } = validateMen(req.body);
  if(error){
    return res.status(404).send(error)
  }
      men.addMensaje(req.body);
      res.send(req.body);
});

router.put("/chat/api/messages/:ts", function (req, res, next){
  const { error } = validateMen(req.body);
  console.log(req.body);
  if(error){
    return res.status(404).send(error)
  }
  men.updateMensaje(req.params.ts,req.body);
  res.send("Updated");
});

router.get("/chat/api/messages/:ts", (req, res) => {
  men.getMensaje(parseInt(req.params.ts), (mensaje)=>{
    res.send(mensaje);
  })

});

router.delete("/chat/api/messages/:ts", function (req, res, next) {
  let time = req.params.ts;
  men.deleteMensaje(req.params.ts);
  res.send(time);
});

const validateMen = (men) => {
  const schema = Joi.object({
    message: Joi.string().min(5).required(),
    Author: Joi.string().pattern(new RegExp("(^[a-zA-Z]+[ ][a-zA-z]+)")).required(),
    ts: Joi.required(), 
  });

  return schema.validate(men);
};

module.exports = router;
