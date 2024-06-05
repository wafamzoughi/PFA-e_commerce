const port=4000;
const express = require('express');
const app=express();
const mongoose= require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require('cors');
const { error } = require("console");
const { type } = require('os');
app.use(express.json());
app.use(cors());
//Data base connection with MongoDB
// Définir la connexion à la base de données MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/e-commerce');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
db.once('open', () => {
  console.log('Connexion à la base de données établie avec succès');
});

// API creation
app.get("/",(req,res)=>{
    res.send("Express App is Running")

})
 
//Image storage engined
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload= multer({storage:storage})

//Creating upload Endpont for images
app.use('/images',express.static('upload/images'))
app.post("/upload", upload.single('produit'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for Creating Products
const Produit=mongoose.model("Produit", {
    id:{
        type: Number,
        required:true,

    },
    name:{
        type: String,
        required:true,
    },
    image:{
        type: String,
        required:true,
    },
    category:{
        type: String,
        required:true,
    },
    new_price:{
        type: Number,
        required:true,
    },
    old_price:{
        type: Number,
        required:true,
    },
    date:{
        type: Date,
        default:Date.now
    },
    avilable:{
        type:Boolean,
        default:true,
    },
})
//Creating API for adding products
app.post('/ajouterproduit', async(req,res)=>{
    let produits = await Produit.find({});
    let id;
    if(produits.length>0)
    {
        let dernier_produit_tableau=produits.slice(-1);
        let dernier_produit=dernier_produit_tableau[0];
        id= dernier_produit.id+1;
    }
    else {
        id=1;
    }
    const produit= new Produit({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(produit);
    //save in data base
    await produit.save();
    console.log("saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

//Creating API for deleting products
app.post('/supprimerproduit', async(req,res)=>{
    await Produit.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name,
    })
})
//Creating API for getting all products
app.get('/touslesproduits',async(req,res)=>{
    let produits = await Produit.find({});
    console.log("All Products Fetched");
    res.send(produits);

})
// Endpoint pour récupérer des produits similaires
app.get('/produits-similaires', async (req, res) => {
    try {
        // Récupérez une liste de produits aléatoires ou similaires
        const produitsSimilaires = await Produit.aggregate([{ $sample: { size: 4 } }]);// Par exemple, limitez la liste à 5 produits
        res.json(produitsSimilaires);
    } catch (error) {
        console.error("Erreur lors de la récupération des produits similaires :", error);
        res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des produits similaires." });
    }
});


const session = require('express-session');

app.use(session({
    secret: 'secret_ecom', 
    resave: false, 
    saveUninitialized: true,
    cookie: { secure: false } // Change to true if using HTTPS
}));

//shema ceating for user model
const Utilisateurs = mongoose.model('utilisateurs',{
    name:{
        type:String,
    },
    email:{
        type: String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }



})
//Creating API for getting all products
app.get('/touslesusers',async(req,res)=>{
    let utilisateurs = await Utilisateurs.find({});
    console.log("All Utilisateurs Fetched");
    res.send(utilisateurs);
})
const Admins = mongoose.model('admins',{
    name:{
        type:String,
    },
    email:{
        type: String,
        unique:true,
    },
    password:{
        type:String,
    },
 
    date:{
        type:Date,
        default:Date.now,
    }



})

//Inscription d'utilisateur
app.post('/signup',async(req,res)=>{
    let verif = await Utilisateurs.findOne({email:req.body.email});
    if(verif){
        return res.status(400).json({success:false,errors:"Il existe un utilisateur avec le même adresse email"})
    }
    let panier = {};
    for (let i = 0; i < 300; i++) {
        panier[i]=0;
    }

    const utilisateur = new Utilisateurs({
    name: req.body.username,
    email:req.body.email,
    password:req. body. password,
    cartData: panier,
    })

    await utilisateur.save();

    const data = {
        utilisateur:{
            id:utilisateur.id
        }   
    }
    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})


})

// Connection d'utilisateur
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    // Vérification dans la table Utilisateur
    const utilisateur = await Utilisateurs.findOne({ email });
    if (utilisateur) {
        const passCompare = password === utilisateur.password;
        if (passCompare) {
            const token = jwt.sign({ id: utilisateur.id, role: 'utilisateur' }, 'secret_ecom');
            req.session.token = token; // Save token in session
            res.json({ success: true, token, role: 'utilisateur'}); // Send redirect URL
        } else {
            res.json({ success: false, errors: "Mot de passe incorrect !" });
        }
    } else {
        // Vérification dans la table Admin
        const admin = await Admins.findOne({ email });
        if (admin) {
            const passCompare = password === admin.password;
            if (passCompare) {
                const token = jwt.sign({ id: admin.id, role: 'admin' }, 'secret_ecom');
                req.session.token = token; // Save token in session
                res.json({ success: true, token , role: 'admin'}); // Send redirect URL
            } else {
                res.json({ success: false, errors: "Mot de passe incorrect !" });
            }
        } else {
            res.json({ success: false, errors: "Email incorrect !" });
        }
    }
});

// Middleware pour protéger les routes
const fetchUser = async (req, res, next) => {
    const token = req.header("auth-token"); // Récupérer le token de la session
    if (!token) {
         res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
    else {
      try {
        const data = jwt.verify(token, 'secret_ecom');
        req.utilisateur = data; // Assigner les données du token à req.utilisateur
        next();
    } catch (error) {
        res.status(401).send({ errors: "Please authenticate using a valid token tow " });
    }}

};


// Exemple d'utilisation du middleware
app.get('/protected-route', fetchUser, (req, res) => {
    res.send('This is a protected route.');
});


//new collection 
app.get('/newcollection',async(req,res)=>{
    let produits= await Produit.find({});
    let newcollection= produits.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
})
//pupulaire chez les sections de collier 
app.get('/populairedanscollier',async(req,res)=>{
    let produits= await Produit.find({category:"colliers"});
    let populaire_dans_collier= produits.slice(0,4);
    console.log("Popular in necklace Fetched");
    res.send(populaire_dans_collier);
})


// ajouter les produits au panier
app.post('/ajouteraupanier',fetchUser,async(req,res)=>{
    console.log("added",req.body.articleId);
    let userData = await Utilisateurs.findOne({_id:req.utilisateur.id});
    userData.cartData[req.body.articleId]+=1;
    await Utilisateurs.findByIdAndUpdate({_id:req.utilisateur.id},{cartData:userData.cartData})
    res.send("Added")
})

//supp les produits du panier
app.post('/supprimerdupanier', fetchUser, async (req, res) => {
    console.log("removed", req.body.articleId);
    let userData = await Utilisateurs.findOne({ _id: req.utilisateur.id });
    if (userData.cartData[req.body.articleId] > 0) 
        userData.cartData[req.body.articleId] -= 1;
        await Utilisateurs.findByIdAndUpdate({ _id: req.utilisateur.id }, { cartData: userData.cartData });
        res.send("Removed");
    
});
// get les données du panier 
app.post('/getpanier', fetchUser, async (req, res) => {
    console.log("GetPanier");
    let userData = await Utilisateurs.findOne({ _id: req.utilisateur.id });
    res.json(userData.cartData);
})
// Define the Order schema and model
const orderSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: String,
  tel: String,
  address: String,
  region: String,
  products: Array,
  total: Number,
});

const Order = mongoose.model('Order', orderSchema);

// API endpoint to handle order submission
app.post('/orders', async (req, res) => {
  const { nom, prenom, email, tel, address, region, products, total } = req.body;

  const newOrder = new Order({
    nom,
    prenom,
    email,
    tel,
    address,
    region,
    products,
    total,
  });

  try {
    await newOrder.save();
    res.status(201).send('Order placed successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to place order');
  }
});
app.get('/touslescommandes',async(req,res)=>{
    let orders = await Order.find({});
    console.log("All orders Fetched");
    res.send(orders);
})
app.listen(port,(error)=>{
    if (!error){
        console.log("Server Running on Port "+port)
    }
    else{
        console.log("Error: "+error)
    }
})