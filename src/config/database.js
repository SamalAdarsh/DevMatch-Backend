const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb://codewithadarsh007_db_user:j91q2M54eWZEuke5@ac-muoulls-shard-00-00.hdkffxs.mongodb.net:27017,ac-muoulls-shard-00-01.hdkffxs.mongodb.net:27017,ac-muoulls-shard-00-02.hdkffxs.mongodb.net:27017/?ssl=true&replicaSet=atlas-zrd0bj-shard-0&authSource=admin&appName=Cluster0"
  );
};

module.exports = connectDB



