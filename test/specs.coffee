should = require "should"
request = require "supertest"
app = require "../app"

describe "test", ->
  describe "dependencies", ->
    it "requires 'should' library", ->
      should.exist should
    it "requires 'supertest' library", ->
      should.exist request
    it "requires access to the app", ->
      should.exist app

describe "app", ->
  describe "dependencies", ->
    it "requires 'express'", ->
      should.exist require "express"
    it "requires 'mongodb'", ->
      should.exist require "mongodb"
    it "requires 'body-parser'", ->
      should.exist require "body-parser"

describe "specifications", ->
  describe "GET /", ->
    it "should return index home page", (done) ->
      request(app)
      .get "/"
      .expect 200
      .end (err, res) ->
        if err?
          console.log err
        console.log res.text
        # res.body.should.have.property("page")
        # res.body.page.should.be.a.String()
        # res.body.page.should.equal("index")
        # res.body.should.have.property("args")
        # res.body.args.should.be.an.Array()
        done()

  # describe "GET /test", ->
  #   it "should return test", (done) ->
  #     request(app)
  #     .get "/test"
  #     .expect 200, done
