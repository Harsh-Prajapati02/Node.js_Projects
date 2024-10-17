const fs = require("fs")
const express = require("express");
const cors=require('cors');

const PORT = 3500;
const app = express();
app.use(express.json());
app.use(cors());

// CRUD - CREATE | READ | UPDATE/EDIT | DELETE
// READ
app.get("/todo",(req,res)=>{
    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err){
            console.log(err)
            res.send(err)
        }
        else{
            const todo = JSON.parse(data);
            res.send(todo)
        }
    })
})

// CREATE
app.post("/todo",(req,res)=>{
    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err) console.log(err);
        else{
            const todo = JSON.parse(data);
            todo.tasks.push(req.body);
            fs.writeFile("./db.json",JSON.stringify(todo),(err)=>{
                if(err) console.log(err);
                else{
                    res.send("Task added");
                }
            })
        }
    })
})

// UPDATE
app.put("/todo/:id",(req,res)=>{
    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err) console.log(err)
        else{
            const todo = JSON.parse(data);
            const taskId= req.params.id;
            const taskIndex = todo.tasks.findIndex((tasks)=>tasks.id == taskId)

            if(taskIndex != -1){
                todo.tasks[taskIndex]={...todo.tasks[taskIndex], ...req.body}
                fs.writeFile("./db.json",JSON.stringify(todo),(err)=>{
                    if(err) console.log(err)
                    else{
                        res.send("Task Updated Successfully")
                    }
                })
            }
        }
    })
})

// DELETE
app.delete("/todo/:id",(req,res)=>{
    const taskId = req.params.id
    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err) console.log(err)
        else{
            
            const todo=JSON.parse(data);
            const taskIndex = todo.tasks.findIndex((task)=>task.id == taskId)
            
            if(taskIndex != -1){
                todo.tasks = todo.tasks.filter((tasks)=>tasks.id != taskId)
                fs.writeFile("./db.json",JSON.stringify(todo),(err)=>{
                    if(err){ res.send(err)}
                    else{
                        res.send("Task deleted")
                    }
                })
            }
            else{
                res.send("Task not found");}
        }    
        })
})

// Run Server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})