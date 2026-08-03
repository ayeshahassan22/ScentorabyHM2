  
  
require("dotenv").config();

const mysql = require("mysql2"); const db = mysql.createPool(process.env.DATABASE_URL);
 db.getConnection((err, connection) => { if (err) { console.log("MySQL connection failed:",
     err.message); } else { console.log("MySQL connected successfully!"); connection.release(); } });

  const express = 
require("express");
const path = require("path");

 const app = express(); 
 const PORT = 3000;


 
 app.use(express.json());
  app.use(express.urlencoded({ extended: true })); 
  
  // Website files

  app.get("/", (req, res) => { res.sendFile(path.join(__dirname,  "index.html")); });

   app.use(express.static(__dirname,
     )); 
    
    
     // Receive order
      app.post("/order", (req, res) => { const { name, phone, address, product } = req.body; const sql = 
      "INSERT INTO orders (name, phone, address, product) VALUES (?, ?, ?, ?)"; db.query(sql, [name, phone, address, product],
         (err, result) =>
         { if (err) { console.error("Order save failed:", err);
             return res.status(500).json({ success: false, message: "Order save nahi ho saka" }); 
            } console.log("Order saved:", result.insertId); res.json({ success: true, message: "Order received successfully" }); 
        }); });
       
      
      // Start server
        app.listen(PORT, () => { console.log(`Server running at http://localhost:${PORT}`);
     });
