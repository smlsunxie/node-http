'use strict';

var expect = require('expect.js');

describe('models/task', function () {
  before(async function () {
      await require('../../models').sequelize.sync();
  });

  beforeEach(function () {
    this.User = require('../../models').User;
    this.Task = require('../../models').Task;
  });

  describe('create', function () {
    it('creates a task',async function () {
      let user = await this.User.create({
        username: 'johndoe'
      });
      let task = await this.Task.create({
        title: 'a title',
        UserId: user.id
      });
      expect(task.title).to.equal('a title');

    });
  });
});
