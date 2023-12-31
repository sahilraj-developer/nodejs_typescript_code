import express,{NextFunction, Request,Response} from "express";
// const app = express();
const port = 3000;



const middleware = ({ name }: { name: string }) => {
    return (req: Request, res: Response, next: NextFunction) => {
      //@ts-ignore
      req.name = name;
      next();
    };
  };
  
  const app = express();

  app.use(express.json())

app.use(express.urlencoded({extended:true}));
  
  app.use(middleware({ name: "SAHIL" }));

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

app.get("/api/books/:bookId/:authorId",
(req:Request <{bookIdL:'string',authorId:string},{},{name:string}>,res:Response) =>{
   req.body.name;
    console.log(req.params);
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

async function  throwsError() {
    throw new Error("Boom !");    
}

app.get("/error",async (req,res)=>{
    try{
        await throwsError(); 
        res.sendStatus(200);
    }catch(error){
        res.status(400).send('something bad happend');
    }

 
});

app.listen(port, ()=>{
    console.log(`applicaipn listening at http://localhost:${port}`);
});


