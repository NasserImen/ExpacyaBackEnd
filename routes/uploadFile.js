const express = require('express')
const router = express.Router();
const multer = require('multer')
const fast = require('fast-csv')
const csv = require('csv-parser')
const path = require('path')
const fs = require('fs')
const File = require ('../schema/file')
const excelToJson = require('convert-excel-to-json');

const results = [];
const parseArray =[]


// multer upload storage
 const storage = multer.diskStorage({
     destination : (req , file , cb)=>{
         cb (null , './uploads/')
     },
     filename:(res , file , cb)=>{
         cb (null ,  Date.now() + "-" + file.originalname)
     }
 })
 // filter for csv files
 const Filter = (req,file,cb)=>{
     const uloadextentions = [".csv" , ".xlsx" , ".xls"]
     const fileextnetion = path.extname(file.originalname)
     if (uloadextentions.includes(fileextnetion)) {
         cb(null,true)
     }else{
         cb("please upload only csv , xlsx and xls files" ,  false)
     }
 }
 const upload = multer ({storage : storage , fileFilter : Filter})


//  upload csv , xlsx and xls files
router.post('/csvupload' , upload.single("file") , async(req , res) =>{
    console.log(req.file);
        if (req.file == undefined){
            return res.status(400).send({
                message : 'please upload a csv,xlsx and xls files'
            })
        }else{
                console.log(req.file.path);
                const file = new File({
                    path : req.file.path
            })
            // parse csv and excel files to json
            if (path.extname.originalname !== '.csv'){
                const parse = excelToJson({
                    sourceFile: req.file.path
                });
                parseArray.push(parse)
                console.log(Object.keys(parseArray[0]));
            }

                fs.createReadStream(req.file.path)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                console.log(Object.keys(results[0]));
      });
            
               const f= await file.save()
                res.json(f)
        }
})



module.exports = router
// export de router
