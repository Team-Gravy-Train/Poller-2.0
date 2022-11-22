const express = require('express');
const router = express.Router();
const pollFunctions = require('../middleware/pollMiddleware');

router.post('/', pollFunctions.savePollFormat, (req, res) => {
    res.status(200).json(res.locals.pollID);
    return;
})

router.get('/:id', pollFunctions.getPollFormat, (req, res) => {
    res.status(200).json(res.locals.getPollFormat);
    return;
})

router.post('/:id', pollFunctions.savePollResponse, (req, res) => {
    res.status(200).send('update successful');
    return;
})
// dropdown to iterate over these
router.get('/:id/display', pollFunctions.getPollResponses, (req, res) => {
    res.status(200).json(res.locals);
    return;
})
// key is poll entry
router.delete('/:id/:key', pollFunctions.deletePoll, (req, res) => {
    res.status(204).json(res.locals);
    return;  
})

router.put('/:id/:key', pollFunctions.updatePoll, (req, res) => {
    res.status(200).json(res.locals);
    return;  
})

module.exports = router;
