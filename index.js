const express = require("express");

const fs = require("fs");

const path = require("path");

const outputfold = "./output"
console.log("is folder present", fs.existsSync(outputfold));

if(!fs.existsSync(outputfold)){
    fs.mkdirSync(outputfold);
}

const app = express();

const PORT = 3000;

app.get("/create", (req, res)=>{
   const currentTime = new Date();

   const year = currentTime.getFullYear().toString();
   const month = (currentTime.getMonth() + 1).toString();
   const date = currentTime.getDate().toString();
   const hours = currentTime.getHours().toString();
   const mins = currentTime.getMinutes().toString();
   const secs = currentTime.getSeconds().toString();

   const dateTimeFileName = `${year}-${month}-${date}-${hours}-${mins}-${secs}.txt`;

   const filePath = path.join(outputfold, dateTimeFileName);

   fs.writeFile(filePath, currentTime.toISOString(), (err) => {
    if(err){
        res.status(500).send("Error creating file")
        return;
    }
    res.send(`File Name created successfully:  ${filePath}`)
   })
})

app.get("/getFiles", (req, res)=>{
    fs.readdir(outputfold, (err, files)=> {
        if(err){
            res.status(500).send("Error occured in reading files");
            return;
        }

    const textFiles = files.filter((file)=>path.extname(file) === ".txt");
    res.json(textFiles);
    })
})

app.listen(PORT, ()=>{
    console.log("server is running", PORT)
})