import express,{NextFunction, Request,Response} from "express";
const app = express();
const port = 3000;

app.use(express.json())

app.use(express.urlencoded({extended:true}));

app.get("/", (req:Request, res:Response) => {
    res.send("Hello, World!");
  });

app.post('/api/data',(req:Request, res:Response)=>{
    console.log(req.body)
    return res.sendStatus(200);
}) 

app.route("/")
.get((req:Request, res:Response) => {
    res.send("GET request");
})
.post((req:Request, res:Response) => {
    res.send("Ypu make a Post request");
})
.put((req:Request, res:Response) => {
    res.send("Ypu make a Put request");
})
.delete((req:Request, res:Response) => {
    res.send("Ypu make a Delete request");
})
.all((req:Request, res:Response) => {
    res.send("Ypu make a all request");
})

app.all('/api/all',(req:Request, res:Response) =>{
    return res.sendStatus(200);
})




// params

app.get("/api/books/:bookId/:authorId",(req:Request,res:Response) =>{
    console.log(req.params.bookId);
    return res.send(req.params);
});


// 
function handleGetBookOne(req:Request,res:Response,next:NextFunction){
    console.log(req.params);
    return res.send(req.params);
}

function handleGetBookTwo(req:Request,res:Response,next:NextFunction){
    console.log("Second handler");
    return res.send(req.params);
}
app.get("/api/books/:bookId/:authorId", [handleGetBookOne,handleGetBookTwo]);

app.listen(port, ()=>{
    console.log(`applicaipn listening at http://localhost:${port}`);
});