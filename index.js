var Db  = require('./dboperations');
let Notes = require('./Notes.js');
const dboperations = require('./dboperations.js');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const { response } = require('express');
var app = express();
var router = express.Router();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

app.get('/getAllNotes',(request , response)=> {
    dboperations.getAllNotes().then(result => {
        response.json({
            message: "success",
            data:result[0]
        });
    })
})
app.get('/getNote/:id',(request , response)=> {
    dboperations.getNote(request.params.id).then(result => {
        
            response.json({
                message: "success",
                data:result[0]
            });
    })
})

app.post('/addNote',(request , response)=> {

    let note = {...request.body};

    dboperations.addNote(note).then(result => {
        response.status(201).json({
            message:"added Successfully" ,
            data:note
        });
    })
})

app.delete('/deleteNote/:id',(request , response)=>{
   dboperations.deleteNote(request.params.id).then(result=> {
        response.status(200).json({
            message:"deleted"
        })
   })
})

app.put('/updateNote/:id',(request,response)=> {
    let updateNote = {...request.body}
    dboperations.updateNote(request.params.id , updateNote).then((result)=> {
        response.status(200).json({
            message:"updated",
        })
    }).catch((err)=> {
        console.log(err.message)
    })
})

var port = 3000;
app.listen(port);
console.log('Order API is runnning at ' + port);



// const sql = require("mssql/msnodesqlv8");

// var dbconfig = {
//     server:"DESKTOP-61012JL\\SQLEXPRESS" ,
//     database:"Notes",
//     driver:"msnodesqlv8",
//     port:1433,
//     options: {
//         trustedConnection: true
//       }
// }

// function getAllNotes() {
//     var conn = new sql.ConnectionPool(dbconfig);
//     var req = new sql.Request(conn);

//     conn.connect(function(err) {
//         if(err) {
//             console.log(err);
//             return;
//         }
//         req.query("select * from stickyNote",function(err , recordsets) {
//             if(err) {
//                 console.log("error exists in query")
//             } else {
//                 console.log(recordsets)
//             }
//             conn.close();
//         })
//     })
// }

// getAllNotes()