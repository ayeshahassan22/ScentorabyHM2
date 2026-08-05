  
  
require("dotenv").config();

const mysql = require("mysql2"); const db = mysql.createPool (process.env.DATABASE_URL);
 db.getConnection((err, connection) => { if (err) { console.log("MySQL connection failed:",
     err.message); } else { console.log("MySQL connected successfully!"); connection.release(); } });

  const express = require("express");

const path = require("path");

 const app = express(); 
 const PORT = process.env.PORT ||
   3000;


 
 app.use(express.json());
  app.use(express.urlencoded({ extended: true })); 
  
  // Website files
 app.use(express.static(__dirname)); 
    
  app.get("/", (req, res) => { res.sendFile(path.join(__dirname,  "index.html")); });
app.get("/test", (req, res) => { res.send("Server is working"); });


  
    
     // Receive order

      app.post("/order", (req, res) => {
        console.log("Request Body:",req.body);
        const { name, phone,city, address, product,quantity  } = req.body; const sql = 
      "INSERT INTO orders (name, phone,city, address, product,quantity ) VALUES (?, ?, ?, ?,?,?)"; 
        db.query(sql, [name, phone, city, address, product,quantity ],
         (err, result) =>
         { if (err) { 
           console.error(err);
             return 
               res.status(500).json(err); 
            } console.log("Order saved:", result.insertId); res.json({ success: true, message: "Order received successfully" }); 
        }); });
       
      
      // Start server
        app.listen(PORT, () => { console.log(`Server running at http://localhost:${PORT}`);
     });
