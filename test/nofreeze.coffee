should = require 'should'
nf = require '../src/jskata.nofreeze.js'
{equal, ok} = require 'assert'

jsk = {nf:nf}
_ = jsk

describe "NoFreeze", ->
  it "iiii", ->
    jsk.nf.forLoop.should.not.be.empty

  it "array", ->
    array = [1, 2, 3]
    array2 = []
    check = check = ->
      for i of array
        equal array[i], array[i]

    _.nf.each array, ((i, val) ->
      array2.push val
    ), null, check

  ### CORRECT THIS!
  it "for", ->
    count = 0
    i = 0
    check = ->
      equal count, 10
      
    a = ->(i < 11)
    b = ->(i++)
    c = ->(count++)

    _.nf.forLoop a, b, c, null, check
  ###

  it "backward compatibility", ->
    equal jsk.nf.forloop, jsk.nf.forLoop

