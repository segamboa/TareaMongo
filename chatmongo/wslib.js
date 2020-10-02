const WebSocket = require("ws");
const fs = require("fs");

const men = require("./controllers/mensaje");

//const Client = require("./models/client")
const Joi = require("joi");

const clients = [];
const messages = [];
let jsonArr = [];
let mensajes = "";



const wsConnection = (server) => {  
  
  const wss = new WebSocket.Server({ server });



  wss.on("connection", (ws) => {
    clients.push(ws);
    sendMessages();




    ws.on("message", (message) => {
      messages.push(message);
      let date = new Date();
      let timestamp = date.getTime();
      
      const { error } = ()=>{if(message.length <5) true};

      console.log(validateClient(message));
      if(error){
        console.log("Error al enviar mensaje");
        //return res.status(404).send(error)
      }
      else{
        men.addMensaje({message: message, Author: "Santiago Gamboa", ts: String(timestamp)});
        console.log("Añadido correctamente");
      }



      sendMessages();
    });
  });

  const sendMessages = () => {
    clients.forEach((client) => client.send(JSON.stringify(messages)));
  };
};

const validateClient = (msg) => {
  const schema = Joi.object({
    message: Joi.string().min(5)
  });

  return schema.validate(msg);
};

exports.wsConnection = wsConnection;
