const express = require("express");
const dotenv = require("dotenv"); // dotenv : nasta3mlouha bch na9raw les variables mel .env (exemple JWT_SECRET, DB_URL)
const connectDB = require("./config/db"); //n3adi connexion m3a mongo
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");








dotenv.config();
// config() : tkhalli toutes les variables fi .env ysiroulhom load fil application
connectDB();

const app = express();
//  bach n9raw JSON men body requests
app.use(express.json());

 // Routes principales mta3 l'API


app.use("/api/auth", authRoutes);// kol ma user yji yenzel 3al /api/auth -> yod5ol l authRoutes
app.use("/api/projects", projectRoutes);// routes lel projets (create, update, delete, get...)
app.use("/api/tasks", taskRoutes);// routes lel tasks


app.get("/", (req, res) => {
  res.send("API est fonctionne..."); //ntestiii route bch nchoff api ta5dem wala le
});

const PORT = process.env.PORT || 8000;     //port ilyy bch nsta3mll fih serveur
app.listen(PORT, ()=>{
    console.log(`Serveur en marche sur http://localhost:${PORT}`)});
