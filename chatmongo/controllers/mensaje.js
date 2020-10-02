const conn = require("../lib/mongoUtils");

const getMensajes = (callback) => {
  conn.then((client) => {
    client
      .db("mensajes")
      .collection("mensajesCollection")
      .find({})
      .toArray((err, data) => {
        console.log(data);
        callback(data);
      });
  });
};

const getMensaje = (ts, callback) => {
  conn.then((client) => {
    client
      .db("mensajes")
      .collection("mensajesCollection")
      .findOne({ ts })
      .then((result) => {
        callback(result);
      });
  });
};

const addMensaje =(mensaje)=>{
  conn.then((client) => {
    client
      .db("mensajes")
      .collection("mensajesCollection")
      .insertOne(mensaje)
      .then((data)=>{
        console.log(data);
      });
  });
};

const updateMensaje = (ts, mensaje)=>{
  let msj = mensaje.message;
  let aut = mensaje.Author;
  let ts1 = mensaje.ts;
  conn.then((client) => {
    client  
      .db("mensajes")
      .collection("mensajesCollection")
      .updateOne({ts:ts}, {$set : {message: msj, Author: aut, ts: ts1}})
      .then((result)=>{
        console.log("Modified");
      });
  });
};

const deleteMensaje = (ts)=>{
  conn.then((client) => {
    client
      .db("mensajes")
      .collection("mensajesCollection")
      .deleteOne({ts:ts})
      .then((result)=>{
        console.log("result");
      })
  });
}



const mensaje = { getMensajes, getMensaje, addMensaje, updateMensaje, deleteMensaje };

module.exports = mensaje;
