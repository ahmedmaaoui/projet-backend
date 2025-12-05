const mongoose = require("mongoose");

// lhnee 3mlt fonction bch tconnecti l'app MongoDB Atlas

const connectDB = async () => {
  try {
    // bch  nconnecti b mongo URI li 7atto fi .env
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connecte"); //ken ta3ditt connexion yab3thli message
  } catch (error) {
    console.log("Mongo error:", error); // ken mt3adétch connexion yab3thli message ilyy fama error
    process.exit(1); //ken fama error ya3mll stop
  }
};

module.exports = connectDB;
