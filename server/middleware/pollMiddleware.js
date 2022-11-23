const db = require('../db/db');

const pollMiddleware = {};

// middleware.savePollFormat = async (req, res, next) => {
//   try {
//     const query = 'SELECT MAX(poll_id) FROM poll';
//     const pollID = await db.query(query);

//     const maxID = pollID.rows[0].max + 1;
//     const prompt = req.body[0];
//     const options = req.body;

//     for (let i = 1; i < req.body.length; i++) {
//       const insert = "INSERT INTO poll (poll_id, poll_options, poll_prompt) VALUES ($1, $2, $3)" ;
//       db.query(insert, [maxID, options[i], prompt], (err, res) => {
//         console.log('update successful')
//       })
//     }
//     res.locals.pollID = maxID;
//     return next();
//   } catch(err) {
//     console.log(err)
//   }
// }

// middleware.getPollFormat = async (req, res, next) => {
//     try {
//       const results = await db.query("SELECT poll_options, poll_prompt FROM poll WHERE poll_id = $1", [req.params.id]);
//       let pollOptions = results.rows;
//       const pollOptionsArray = [];
//       let pollPrompt;
//       pollOptions.forEach((object) => {
//         if (object.poll_options) pollOptionsArray.push(object.poll_options);
//         if (object.poll_prompt) pollPrompt = object.poll_prompt;
//       })
//       res.locals.getPollFormat = {
//         pollOptionsArray: pollOptionsArray,
//         pollPrompt: pollPrompt
//       }
//       next();
//       return;
//     }
//     catch(err) {
//         console.log(err);
//         return next(err);
//     }
// }

// when a user creates a new poll, we will receive a poll_name and poll options
// we need to insert new poll into poller table
// insert options into options table

pollMiddleware.newPoll = async (req, res, next) => {
  const { name } = req.body;
  // console.log(options);
  const pollName = [name];
  // inserting a new topic into our poller table
  // return value should be the poll_id
  const newPollQuery = `INSERT INTO poller(poll_name)
  VALUES ($1)
  RETURNING poll_id;`;

  const result = await db.query(newPollQuery, pollName);
  const pollId = result.rows[0].poll_id;
  console.log('this is the poll id', pollId);
  res.locals.result = [pollId, []];

  // update choices in options table with poll id from previous query
  // initiating forloop to run for as many choices

  for (let i = 0; i < req.body.options.length; i++) {
    const optionsValues = [pollId, 0];
    console.log(req.body.options[i]);
    optionsValues.push(req.body.options[i]);

    const updateOptionsQuery = `INSERT INTO options(choice, total, poller_id)
    VALUES($3, $2, $1)
    RETURNING choice;`;

    const addedOptions = await db.query(updateOptionsQuery, optionsValues);
    const choice = addedOptions.rows[0].choice;
    res.locals.result[1].push(choice);
  }

  return next();
};

pollMiddleware.getAllPolls = async (req, res, next) => {
  console.log('IM INSIDE OF GET ALL POLLS');
  const getAllQuery = `SELECT * FROM poller;`;

  const result = await db.query(getAllQuery);

  res.locals.result = result.rows;
  return next();
};

pollMiddleware.getPollById = async (req, res, next) => {
  const pollId = req.params.id;
  const values = [pollId];
  console.log(pollId);
  const getOptionsTotal = `SELECT choice, total FROM options WHERE poller_id = $1;`;

  const optionsResult = await db.query(getOptionsTotal, values);
  res.locals.result = [optionsResult.rows];

  const voterChoice = `SELECT results.voter, options.choice FROM options RIGHT OUTER JOIN results ON options.options_id = results.choices_id WHERE options.poller_id = $1;`;

  const voterResult = await db.query(voterChoice, values);
  res.locals.result.push(voterResult.rows);
  return next();
};

// pollMiddleware.savePollResponse = (req, res, next) => {
//   try {
//     const insert =
//       'INSERT INTO poll (poll_id, entries, users) VALUES ($1, $2, $3)';
//     const pollId = req.params.id;
//     const users = req.body.user;
//     const entries = req.body.answer;
//     db.query(insert, [pollId, entries, users], (err, res) => {
//       console.log('update successful');
//     });
//     next();
//     return;
//   } catch (err) {
//     console.log(err);
//   }
// };

// pollMiddleware.getPollResponses = async (req, res, next) => {
//   try {
//     const results = await db.query('SELECT * FROM poll WHERE poll_id = $1', [
//       req.params.id,
//     ]);
//     // console.log('results', results);
//     const data = {
//       status: 'success',
//       results: results.rows.length,
//       poll: results.rows,
//     };
//     res.locals = data;
//     next();
//     return;
//   } catch (err) {
//     next(err);
//     return;
//   }
// };

// pollMiddleware.deletePoll = async (req, res, next) => {
//   try {
//     const results = await db.query('DELETE FROM poll WHERE id = $1', [
//       req.params.key,
//     ]);
//     res.locals = results;
//     next();
//     return;
//   } catch (err) {
//     next(err);
//     return;
//   }
// };
// //in progress
// pollMiddleware.updatePoll = async (req, res, next) => {
//   try {
//     const results = await db.query(
//       'UPDATE poll SET users=$1, entries=$2 WHERE id=$3',
//       [req.body.users, req.body.entries, req.params.key]
//     );
//     // console.log(req.params.key)
//     // console.log('results', results);
//     const data = {
//       status: 'success',
//       results: results.rows.length,
//       poll: results.rows[0],
//     };
//     res.locals = data;
//     next();
//     return;
//   } catch (err) {
//     console.log;
//     next(err);
//     return;
//   }
// };

module.exports = pollMiddleware;
