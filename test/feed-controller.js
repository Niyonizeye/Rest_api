const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user');
const FeedController = require('../controllers/feed');

describe('Feed Controller', function() {
  before(function(done) {
    mongoose
      .connect(
        'mongodb+srv://JeanPaul:dusabimana2019@cluster0.uwya5.mongodb.net/test-Messageapp?retryWrites=true'
      )
      .then(result => {
        const user = new User({
          email: 'test@test.com',
          password: 'tester',
          name: 'Test',
          posts: [],
          _id: '60633a5f78b9e3891299429a'
        });
        return user.save();
      })
        done();
  });

  beforeEach(function() {});

  afterEach(function() {});

  it('should add a created post to the posts of the creator', function(done) {
    const req = {
      body: {
        title: 'Test Post',
        content: 'A Test Post'
      },
      file: {
        path: 'abc'
      },
      userId: '60633a5f78b9e3891299429a'
    };
    const res = {
      status: function() {
        return this;
      },
      json: function() {}
    };

    FeedController.createPost(req, res, () => {}).then(savedUser => {
      expect(savedUser).to.have.property('posts');
      expect(savedUser.posts).to.have.length(1);
    });
    done();
  });

  after(function(done) {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
        done();
  });
});
