should = require 'should'
undo = require '../src/jskata.undo.js'
{equal, ok} = require 'assert'

jsk = {u:undo, undo:undo}
_ = jsk


describe 'Undo', ->
  it "basic test", ->
    executed = false
    undone = false
    jsk.undo.execute (->
      executed = true
    ), ->
      undone = true

    ok executed, "it was executed"
    equal _.u.dids.length, 1
    ok not undone, "it was not undone"
    equal _.u.undids.length, 0
    
    # Undo
    jsk.undo.undo()
    ok undone, "it was undone"
    equal _.u.dids.length, 0
    equal _.u.undids.length, 1
    
    # Redo
    jsk.undo.redo()
    ok undone, "it was redone"
    equal _.u.dids.length, 1
    equal _.u.undids.length, 0

  it "onChange", ->
    called = 0
    jsk.undo.onChange = ->
      called++

    jsk.undo.execute (->
    ), ->

    equal 1, called, "called 1 time"
    jsk.undo.undo()
    equal 2, called, "called 2 times"
    jsk.undo.redo()
    equal 3, called, "called 3 times"
    jsk.undo.onChange = null
    jsk.undo.undo()
    equal 3, called, "called 3 times (the event is now null)"

  it "data from execution is passed to undo", ->
    rnd = 0
    jsk.u.execute (->
      rnd = Math.round(Math.random() * 9999999)
      rnd
    ), (data) ->
      equal data, rnd, "randoms are the same"

    oldRnd = rnd
    jsk.u.undo()
    jsk.u.redo()
    ok oldRnd isnt rnd, "rnd has changed"
    jsk.u.undo()

