var express = require('express');
var router = express.Router();
var ctrlDictionaries = require('../controllers/dictionaries.js');
var ctrlUsers = require('../controllers/users');

router.get('/dictionaries', ctrlDictionaries.dictionaryList);
// router.post('/dictionaries', ctrlDictionaries.dictionaryCreate);
// router.get('/dictionaries/:dictionaryId', ctrlDictionaries.dictionaryReadOne);
// router.put('/dictionaries/:dictionaryId', ctrlDictionaries.dictionaryUpdateOne);
// router.delete('/dictionaries/:dictionaryId', ctrlDictionaries.dictionaryDeleteOne);
router.get('/users', ctrlUsers.userList);
router.get('/userinfo/:userid', ctrlUsers.usersInfo);

module.exports = router;