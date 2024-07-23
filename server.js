const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const port = 3000

app.use(express.json())
// app.set(vie,'ejs')
app.post('/create-file',(req,res)=>{
    const {filename,content} = req.body
    if(!filename){
        return res.status(400).send({error:'Filename is required'})
    }
    const filePath = path.join(__dirname,filename)

    fs.access(filePath, fs.constants.F_OK,(err)=>{
        if(err){
            fs.writeFile(filePath, content || '',(err) =>{
                if(err){

                    return res.status(500).send({error:'Error creating file'})
                }
                res.status(201).send({message:'File created successfully'})
            })

        } else{
            res.status(400).send({message:'File already exists'})
        }
    })
})

app.listen(port, ()=>{
    console.log(`server running on port http://localhost:${port}/create-file`);    
})