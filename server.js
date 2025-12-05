const express = require("express");
const dotenv = require("dotenv"); //charger variable ll env
const connectDB = require("./config/db"); //n3adi connexion mn mongo
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");








dotenv.config();
connectDB();

const app = express();
//  bach n9raw JSON men body requests
app.use(express.json());

// Routes


app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);


app.get("/", (req, res) => {
  res.send("API est fonctionne..."); //ntestiii route bch nchoff api ta5dem wala le
});

const PORT = process.env.PORT || 8000;     //lahne 7atitt serveur
app.listen(PORT, ()=>{
    console.log(`Serveur en marche sur http://localhost:${PORT}`)});
