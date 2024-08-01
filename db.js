const { table } = require("console");
const fs = require("fs");
const sqlite3 = require("sqlite3");
const filepath = "./database.db";

function createDbConnection() {
    if (fs.existsSync(filepath)) {
        return new sqlite3.Database(filepath);
    } else {
        const db = new sqlite3.Database(filepath, (error) => {
            if (error) {
                return console.error(error.message);
            }
            createTable(db);
        });
        console.log("Connection with SQLite has been established");
        return db;
    }
}

function createTable(db) {
    db.exec(`
  CREATE TABLE emaillist
  (
    postID INTEGER,
    id INTEGER,
    name   VARCHAR(100) NOT NULL,
    email   VARCHAR(50) NOT NULL,
    body   VARCHAR(50) NOT NULL
  );
`);

    db.exec(`INSERT INTO emaillist(postID,id,name,email,body) VALUES(1,1,"madhu","madhu@gmail.com","MADHU test email body")`);
    db.exec(`INSERT INTO emaillist(postID,id,name,email,body) VALUES(1,1,"madhu","madhu@gmail.com","MADHU test email body")`);

}




module.exports = createDbConnection();