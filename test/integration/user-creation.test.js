'use strict';

var app      = require('../../app');
var expect   = require('expect.js');
var request  = require('supertest');

describe('user creation page', function () {
  before(async function () {
      await require('../../models').sequelize.sync();
  });
  
  beforeEach(async function () {
    this.models = require('../../models');
    await this.models.Task.destroy({ truncate: true })
    await this.models.User.destroy({ truncate: true })

  });

  it('loads correctly',async function () {
    await request(app).get('/').expect(200);
  });

  it('lists a user if there is one',async function () {
    let user = await this.models.User.create({ username: 'johndoe' });
    await request(app).get('/').expect(/johndoe/);
  });

  it('lists the tickets for the user if available', async function () {
    
    let user = await this.models.User.create({
      username: 'johndoe'
    });
    await this.models.Task.create({
      title: 'johndoe task',
      UserId: user.id
    });
    let result = await request(app).get('/').expect(/johndoe task/);

  });
});
