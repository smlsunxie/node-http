var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', async function(req, res) {
  let users = await models.User.findAll({
    include: [models.Task]
  });

  res.render('index', {
    title: 'Sequelize: Express Example',
    users: users
  });

});
router.get('/api/users/:user_name/tasks', async function (req, res) {
  let username = req.params.user_name;
  let user = await models.User.findOne({
    where: {
      username
    }
  });
  let UserId = user.id;
  let tasks = await models.Task.findAll({
    where: {
      UserId
    }
  });

  res.json({
    tasks
  });

});


router.post('/api/users/:user_name/tasks/create', async function (req, res) {
  console.log("req.body == ", req.body);
  let username = req.params.user_name;
  let user = await models.User.findOne({
    where: {
      username
    }
  });
  let task = await models.Task.create({
    title: req.body.title,
    UserId: user.id
  })

  res.json({
    task
  });

});

module.exports = router;
