var Express=    require('express'),
	mongoose=   require('mongoose'),
	bodyparser= require('body-parser'),
	ejsLint=    require('ejs-lint');

var app=Express();
ejsLint("index.ejs","-d");
//this body-parser is included when POST request is used
app.use(bodyparser.urlencoded({extended:true}));

mongoose.set('useUnifiedTopology', true);

//LINKING MONGODB
mongoose.connect("mongodb://localhost/dstplaces", { useNewUrlParser: true });

//SCHEMA SETUP
var placeschema = new mongoose.Schema({
	name: String,
	url:  String
});

//create amodel
var dstplace = mongoose.model("dstplace",placeschema);



// var itemlist=[];

// 1st route-->index route
app.get("/",(req,res)=>{
	
	//get all our dst places fromDB
	dstplace.find({},(err,place)=>{
		if(err){
			console.log(err);
		}
	    else{
			res.render("index.ejs",{itemlist:place});	
		}
    });
	
});

//2nd route ->
app.get("/index/new",(req,res)=>{
	res.render("addplaceform.ejs");
});


//3rd route
app.post("/index/new",(req,res)=>{
	
	//use methods -->create
    dstplace.create(
	 {
	 name : req.body.dstname,
	 url  : req.body.imgurl
     } ,function(error,place){
	  if(error){
	 	console.log(error);
        }
	  else{
		res.redirect('/');
	   }
   });
});

//4th route -->show route
app.get("/index/:id",(req, res)=>{
	
	dstplace.findById(req.params.id,(err,foundplace)=>{
		if(err){
		console.log(err);
	     }
	    else{
		 res.render("places_info.ejs",{place_id:foundplace});	
		}	
	});
});
	
//writing server listen route
app.listen(2323,()=> {
	console.log("server started");
});
