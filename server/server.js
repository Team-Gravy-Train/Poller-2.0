// Import express and import middleware dependencies
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
// const cookierParser = require('cookie-parser');
const path = require('path');
// const jsonParser = bodyparser.json();
// const urlencodedParser = bodyparser.urlencoded({ extended: false });

// Create App
const PORT = 3000;
const app = express();

// Use global middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Import custom middleware
const userRouter = require('./routers/userRouter.js');
const pollRouter = require('./routers/pollRouter.js');

// app.use(cookieParser());

// Handle routes to user functionality
app.use('/api/user', userRouter);

// Handle routes to poll functionality
app.use('/api/poll', pollRouter);

// Create routes for index.html, bundle.js, and bundle.js.map
// We could have served everything in the build folder as static
// or just send routes for the files we want to use.
// Both of these are tested and work.
// Option a)
// app.use(express.static(path.resolve(__dirname, '../build')));
// Option b)
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});
app.get('/bundle.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/bundle.js'));
});
app.get('/bundle.js.map', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/bundle.js.map'));
});

// Test route for database
// app.get("/api/flasks", async(req, res)=>{
//     try{
//       const results = await db.query("SELECT * FROM poll");
//       console.log(results);
//       res.status(200).json({
//         status: "success",
//         results: results.rows.length,
//           poll: results.rows
//       })
//     } catch(err){
//       console.log(err)
//     }
// })

// Return all unmatched get requests to index.html
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});

app.listen(PORT, () => console.log(`SERVER IS LISTENING ON PORT: ${PORT}`)); //listens on port 3000 -> http://localhost:3000/

module.exports = app;
