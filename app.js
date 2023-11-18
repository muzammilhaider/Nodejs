// const knex = require('knex')({
//     client: 'mysql',
//     connection: {
//     //   host : '127.0.0.1',
//       host : 'localhost',
//     //   port : 3306,
//       user : 'root',
//       password : 'admin',
//       database : 'node_app'
//     },
//     pool: {
//         min: 0,
//         max: 5,
//         afterCreate: (conn, done) => {
//           console.log("Connection Established.");
//           done();
//         },
//     },
//     migrations: {
//         directory: 'migrations'
//     }
// });

// let mysql = require('mysql2');
    
// var con = mysql.createConnection({
//  host: "localhost",
//  user: "root",
//  password: "admin"
// });
    
// con.connect(function(err) {
//  if (err) throw err;
//  console.log("Connected!");
// });


const express = require('express')
const cors = require('cors')
const http = require('http')

const app = express()
const server = http.createServer(app)

// let corsOptions = [
//     origin: [
//         'localhost:3001'
//     ]
// ]

app.use(express.json())
app.use(express.urlencoded({extended : true}))
// app.use(cors(corsOptions))
app.use(cors())
const port = 3001
app.use('/api', require('./routes/user.js'))
app.use('/api', require('./routes/auth.js'))


// app.post('/api/login', async (req, res) => {
//     try {
//         console.log(req);
//         // const users = await config('users')
//         // res.json(users)
//     } catch (error) {
        
//     }
//     // const { email, password } = req.body
//     // res.send(email, password)
// })
server.listen(port, () => {
    console.log(`Server is running on ${port}`);
})