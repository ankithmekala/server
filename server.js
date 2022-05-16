const express=require('express')
const port = process.env.PORT || 3000
const compression=require('compression')
const path=require('path');
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
// view engine setup

app.set('views', path.join(__dirname, 'static', 'views'))
app.set('view engine', 'ejs')
app.use(compression())
app.use('/public', express.static(path.join(__dirname, 'static', 'public')))

var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
databaseURL: "https://hr-mngmt-default-rtdb.firebaseio.com"
});

//create
let db=admin.firestore();
let a=db.collection('users')
/*
app.post('/data',async (req,res)=>{
let docRef=a.doc(req.body.user.name)
await docRef.set({
email: req.body.user.email,
age: req.body.user.age,
gender: req.body.user.gender,
role: req.body.user.role,
});
res.send('done');
}) 
*/

app.post('/update',async (req,res) => {
let docRef=a.doc(req.body.user.name)
await docRef.update({
email: req.body.user.email,
age: req.body.user.age,
gender: req.body.user.gender,
role: req.body.user.role,
});
res.json({message:'done'});
})

//delete

//app.post('/delete',async (req,res) => {
//await db.collection('user').doc(req.body.user.name).delete()
//res.json({message:'done'});
//}) 

app.listen(port, (req,res)=>{
console.info(`Running on ${port}`)
})