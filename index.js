import express from "express";
import bodyParser from "body-parser";

const app = express();
app.set("view engine", "ejs");
const Port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // For parsing JSON in requests


app.listen(Port,()=>{
    console.log("Listening on Port 3000.");
})

//--required variables---(non-sessional database)
var blogsArray=[];
var currentPost=1;

//----------admin side---------------//
//will send all the blogs as array 
app.get("/admin",(req,res)=>{
    
    res.render("admin.ejs",{posts:blogsArray});
});


//will add post to the array as object and also will show the added post in the admin.ejs file as new blog added!
app.post("/add-post",(req,res)=>{

    const blogObject = {
        postID: currentPost++,
        title: req.body.title,
        content: req.body.content,
      };

    blogsArray.push(blogObject);

    console.log("New blog added:", blogObject);

    res.redirect("/admin");

});



// Route to delete a post by ID
app.delete("/delete-post/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const index = blogsArray.findIndex(post => post.postID === postId);
  
    if (index !== -1) {
      blogsArray.splice(index, 1); // Remove the post from the array
      res.status(200).json({ success: true, message: "Post deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Post not found" });
    }
  });
  
  // Route to edit a post by ID
  app.put("/edit-post/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const index = blogsArray.findIndex(post => post.postID === postId);
  
    if (index !== -1) {
      blogsArray[index].title = req.body.title;
      blogsArray[index].content = req.body.content;
      res.status(200).json({ success: true, message: "Post updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "Post not found" });
    }
  });
  



//-------------user side--------------//
//will send all the blogs as array
app.get("/user",(req,res)=>{

    res.render("user.ejs",{posts:blogsArray});
});


