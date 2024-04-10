var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const session = require("express-session");
// const blogRoutes = require("./blogRoutes");
app.use(bodyParser.urlencoded({extended: true}));
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

mongoose.connect("mongodb://127.0.0.1:27017/hack");

var reg = new Schema({
  uname: String,
  name: String,
  pass: String,
  date: Date,
});
var nme = "";
var ide="";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

const model = mongoose.model("registerModel", reg);

app.use(express.urlencoded({ extended: false }));

app.post("/registerNode", async function (req, res) {
  var uname = req.body.email;
  var name = req.body.name;
  var pass = req.body.pass;
  var date = req.body.date;

  var x = await model.findOne({ uname: req.body.email }, {});
  if (x) {
    console.log("here");
    res.redirect("http://localhost:3000/register?param=old");
  } else {
    var reg1 = new model({
      uname: uname,
      name: name,
      pass: pass,
      date: date,
    });

    reg1
      .save()
      .then((doc) => {
        console.log(doc);
        // Redirect to the login page in your React application
        res.redirect("http://localhost:3000/login?param=reg");
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: Unable to save data"); // Handle error
      });
  }
});

app.post("/loginNode", async function (req, res) {
  var uname = req.body.uname;
  var pass = req.body.pass;

  var x = await model.findOne({ uname: uname, pass: pass }, {});
  if (x) {
    var nm = x.name;
    var id=x._id;
    nme = nm;
    ide=id;
    console.log(ide);
    res.redirect("http://localhost:3000/hackathon?name=" + nm);
  } else {
    res.redirect("http://localhost:3000/hackathon/login?param=invalid");
  }
});

app.get("/getSession", async function (req, res) {
  req.session.name = nme;
  req.session.id = ide;
  req.session.save();
  res.send(req.session);
});

const blogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);
app.post('/createBlogPost', async (req, res) => {
  console.log(req+"gsdg");
try {
  const userId = req.session.id; // Retrieve user ID from session
  const content =  req.body.content;
  console.log(content);
  const blogPost = new Blog({ userId, content });
  await blogPost.save();
  res.status(201).json({ message: 'Blog post created successfully' });
} catch (error) {
  res.status(500).json({ error: error.message });
}
});

app.listen(3001);


