let express = require("express");
let db = require("./db")
let fs = require('fs');

let app = express();


function fetchapidata(db) {
    fetch("https://jsonplaceholder.typicode.com/comments").then(async res => {
        let data = await res.json();
        data.map(row => {
            db.exec(`INSERT INTO emaillist(postId,id,name.email) VALUES('${res['postID']}','${row['id']}','${row['name']}','${row['email']}','${row['body']}')`);
        })
    }).catch(err => {
        console.log(err)
    })
    console.log("data fetching from api");
}

function fetchCSV(db) {
    fetch("http://cfte.mbwebportal.com/deepak/csvdata.csv").then(async res => {
        let csvData = await res.text();
        fs.writeFileSync("./tmp/data.csv", data)
        csvParseInsert(csvData, db);
    }).catch(err => {
        console.log(err);
    })
    console.log("data fetching from csv");
}

function csvParseInsert(data, db) {
    let c = data.split("\n");
    c.map(row => {
        let rowdata = row.split(",");
        db.exec(`INSERT INTO emaillist(postId,id,name.email) VALUES('${rowdata[0]}','${rowdata[1]}','${rowdata[2]}','${rowdata[3]}','${rowdata[5]}');`);
    })
}

app.get("/populate", async (req, res) => {

    // fetch api data
    fetchapidata(db);

    // Fetch csv
    fetchCSV()


    res.json({
        check: 1,
    })
})



async function selectRows(req) {
    db.get(`select * from emaillist WHERE body like '%${req.query.q}%'`, (error, row) => {
        if (error) {
            throw new Error(error.message);
        }
        console.log(row);
    });
}


app.post("/search", async (req, res) => {

    db.get(`select * from emaillist WHERE body like '%${req.query.q}%'`, (error, row) => {
        if (error) {
            res.json({
                status: 0,
                data: []
            });
        }
        res.json({
            status: 1,
            data: row
        });
    });
})

app.listen("8080", () => {
    console.log("port 8080")
})