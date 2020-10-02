const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const conn = MongoClient.connect(uri, { useUnifiedTopology: true });

module.exports = conn;