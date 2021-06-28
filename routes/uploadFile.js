const express = require("express");
const router = express.Router();
const multer = require("multer");
const fast = require("fast-csv");
const csv = require("csv-parser");
const path = require("path");
const fs = require("fs");
const File = require("../schema/file");
const header = require("../schema/keys");
const excelToJson = require("simple-excel-to-json");
var fuzz = require("fuzzball");
const translate = require("@vitalets/google-translate-api");




// multer upload storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (res, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
// filter files
const Filter = (req, file, cb) => {
  const uloadextentions = [".csv", ".xlsx", ".xls"];
  const fileextnetion = path.extname(file.originalname);
  if (uloadextentions.includes(fileextnetion)) {
    cb(null, true);
  } else {
    cb("please upload only csv , xlsx and xls files", false);
  }
};
const upload = multer({ storage: storage, fileFilter: Filter });

//  upload csv , xlsx and xls files
router.post("/upload", upload.single("file"), async (req, res) => {
  console.log(req.file);
  if (req.file == undefined) {
    return res.status(400).send({
      message: "please upload a csv,xlsx and xls files",
    });
  } else {
    const headerchoices = await header.aggregate([{$match : {} } ,{ $unwind : "$matchingString"}])
    console.log(headerchoices);
    const choices = headerchoices.map((e) => { return e.matchingString}) 
    console.log(choices);
  
   
    var file = new File({
      path: req.file.path,
    });

    var extention = path.extname(req.file.originalname);
    var Headers;

    var results = [];
    if (extention !== ".csv") {
      var doc = excelToJson.parseXls2Json(req.file.path);
      var arr = doc[0][0];
      Headers = Object.keys(arr);


      var lowerArray = Headers.map((e) => e.toLowerCase());
      let matched = [];
      let notmatched = [];
      for (i = 0; i < lowerArray.length; i++) {
        const find = choices.includes(lowerArray[i]);
        if (find) {
          matched.push(lowerArray[i]);
        } else {
          notmatched.push(lowerArray[i]);
        }
      }
      var matchingResult = [];
      await Promise.all(notmatched.map(async (e) => {
        var trans = await translate(e, { to: "en" });
        var match = await fuzz.extractAsPromised(trans.text, choices, {
          scorer: fuzz.token_set_ratio,
        });

          console.log(e);
          matchingResult.push({
            key : e , matchedKeys : match
          });

      }));
      const f = await file.save()
      res.json({f:req.file.filename,matchingResult , matched, notmatched });
    } else {
      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("x", (x) => results.push(x))
        .on("end", async () => {
          Headers = Object.keys(results[0]);
          console.log(Headers);
          var lowerArray = Headers.map((e) => e.toLowerCase());
          let matched = [];
          let notmatched = [];
          for (i = 0; i < lowerArray.length; i++) {
            const find = choices.includes(lowerArray[i]);
            if (find) {
              matched.push(lowerArray[i]);
            } else {
              notmatched.push(lowerArray[i]);
            }
          }
          var matchingResult =[]
          await Promise.all(notmatched.map(async (e) => {
            var trans = await translate(e, { to: "en" });
            var match = await fuzz.extractAsPromised(trans.text, choices, {
              scorer: fuzz.token_set_ratio,
            }); 
            matchingResult.push({key : e ,
              matchedKeys:match })

            console.log(match);
          }));
          const f = await file.save();
          console.log(matchingResult);
          res.json({f:req.file.filename,matchingResult , matched , notmatched});
        });
    }
  }
});

// import file
router.post('/import/:id', async (req, res) => {
  if (path.extname(req.params.filename) === ".csv") {
      fs.createReadStream(req.file.path)
          .pipe(csv())
          .on('x', (x) => { res.push(x) })
          .on('end', async () => {
              await Promise.all(res.map(async (obj) => {
                  let keys = Object.keys(obj);
                  await Promise.all(keys.map(async (key) => {
                      if (key !== '') {
                          const find = await header.findOne({ header: key.toLowerCase() })
                          if (find !== null) {
                              (obj)[find.header] = obj[key].toLowerCase()
                              delete obj[key]
                          } else {
                              const match = req.body.find((x) => { return x.header === key });
                              if (match !== undefined) {
                                  const matchingHeader = await userChoices.findOne({ matchingString: match.matchingString.toLowerCase() });
                                  if (matchingHeader !== null) {
                                      (obj)[matchingHeader.header] = obj[key]
                                      await header.findByIdAndUpdate(matchingHeader._id, { $addToSet: { matchingString: match.header.toLowerCase() } })
                                  }
                              }
                          }
                      }
                  }));
              }))
              const users = await Users.insertMany(res);
              res.json(users);
          });
  }
  else {
      res = parser.parseXls2Json(req.file.path);
      await Promise.all(res[0].map(async (obj) => {
          let keys = Object.keys(obj);
          await Promise.all(keys.map(async (key) => {
              if (key !== '') {
                  const headerFound = await header.findOne({ header: key.toLowerCase() })
                  if (headerFound !== null) {
                      (obj)[headerFound.header] = obj[key].toLowerCase()
                      delete obj[key]
                  } else {
                      const match = req.body.find((x) => { return x.header === key });
                      if (match !== undefined) {
                          // match this key 
                          const matchingHeader = await header.findOne({ matchingString: match.matchingString.toLowerCase() });
                          if (matchingHeader !== null) {
                              (obj)[matchingHeader.header] = obj[key]
                              await header.findByIdAndUpdate(matchingHeader._id, { $addToSet: { matchingString: match.header.toLowerCase() } })
                          }
                      }
                  }
              }
          }));
      }))
      res.json(res);
  }
});

// get all headers
router.get('/getAllHeaders', async (req, res) => {
  const headers = await getAllHeaders.find();
  res.json(headers)
})

// get headers by id
router.get('/getAllHeaders/:id',async (req,res)=>{
  const matching = await getAllHeaders.findById(req.params.id);
  res.json(matching)
});

module.exports = router;
// export de router
