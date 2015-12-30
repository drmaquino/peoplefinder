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

describe "pages", ->
  describe "/ (root)", ->
    it "should return home page", (done) ->
      request(app)
      .get "/"
      .expect 200
      .end (err, res) ->
        if err?
          console.log err
        res.text.should.containEql '<title>People Finder</title>'
        done()

describe "apis", ->
  describe "POST /api/person", ->
    person =
      pair: "af"
      name: "adol"
      lastname: "fito"
      image: "imagito"
    it "should receive a person and add it to the db", (done) ->
      request(app)
      .post "/api/person"
      .send person
      .expect 200, done
