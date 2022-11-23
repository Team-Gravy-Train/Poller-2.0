const express = require('express');
const router = express.Router();
const pollMiddleware = require('../middleware/pollMiddleware');

// router.post('/', pollFunctions.savePollFormat, (req, res) => {
//     res.status(200).json(res.locals.pollID);
//     return;
// })


// router.get('/:id', pollFunctions.getPollFormat, (req, res) => {
//     res.status(200).json(res.locals.getPollFormat);
//     return;
// })

// from req body -- 
/*
{
    name: 'string', 
    options: []
}
*/

router.post('/', pollMiddleware.newPoll, (req, res) => {
    return res.status(200).json(res.locals.result)
})

// router.post('/:id', pollFunctions.savePollResponse, (req, res) => {
//     res.status(200).send('update successful');
//     return;
// })

// router.get('/:id/display', pollFunctions.getPollResponses, (req, res) => {
//     res.status(200).json(res.locals);
//     return;
// })

// router.delete('/:id/:key', pollFunctions.deletePoll, (req, res) => {
//     res.status(204).json(res.locals);
//     return;  
// })

// router.put('/:id/:key', pollFunctions.updatePoll, (req, res) => {
//     res.status(200).json(res.locals);
//     return;  
// })

module.exports = router;
