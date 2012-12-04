should = require 'should'
tz = require '../src/jskata.timezone.js'
{equal, ok} = require 'assert'

jsk = {tz:tz}

describe 'Timezone', ->
  it 'is north america - eastern time', ->
    tz.testOffset(300, 240);
    tz.hasDst().should.be.true
    tz.st().should.not.equal tz.dst()
    tz.invertedSt().should.equal 300
    tz.st().should.equal -300
    tz.dst().should.equal -240
    tz.stToString().should.equal '-0500'
    tz.dstToString().should.equal '-0400'
    tz.stToString(':').should.equal '-05:00'
    
  it 'north america - St John (30 minute offset)', ->
    jsk.tz.testOffset(210, 150);
    equal(jsk.tz.stToString(), "-0330")
    equal(jsk.tz.dstToString(), "-0230")
    
    # Set time separator
    jsk.tz.timeSeparator = "|"
    equal(jsk.tz.stToString(), "-03|30")
    equal(jsk.tz.stToString(":"), "-03:30")
    jsk.tz.timeSeparator = ""
    
  it "Australia - Dysney", ->
    jsk.tz.testOffset(-660, -600)
    ok(jsk.tz.hasDst())
    ok(jsk.tz.st() != jsk.tz.dst())
    equal(jsk.tz.invertedSt(), -600)
    equal(jsk.tz.st(), 600)
  
  it "Argentina - San Luis - no DST", ->
    jsk.tz.testOffset(180, 180);
    ok(!jsk.tz.hasDst());
    ok(jsk.tz.st() == jsk.tz.dst());
  
  it "Brazil - Sao Paulo", ->
    jsk.tz.testOffset(120, 180);
    ok(jsk.tz.hasDst());
    ok(jsk.tz.st() != jsk.tz.dst());
  
  it "Hong Kong - no DST", ->
    jsk.tz.testOffset(-480, -480);
    ok(!jsk.tz.hasDst());
    ok(jsk.tz.st() == jsk.tz.dst());
  
  it "London", ->
    jsk.tz.testOffset(0, -60);
    ok(jsk.tz.hasDst());
    ok(jsk.tz.st() != jsk.tz.dst());
    equal(jsk.tz.stToString(), "+0000");
  
  
  it "Africa - Ouagadougou - hi to my ex-coworker Yaya!", ->
    jsk.tz.testOffset(0, 0);
    ok(!jsk.tz.hasDst());
    ok(jsk.tz.st() == jsk.tz.dst());
    equal(jsk.tz.stToString(), "+0000");
    equal(jsk.tz.stToString(), jsk.tz.dstToString());
  
  
  it "Time separator", ->
    jsk.tz.testOffset(300, 240);
    
    jsk.tz.timeSeparator = ',';
    equal(jsk.tz.stToString(':'), "-05:00");
    equal(jsk.tz.stToString(), "-05,00");
    
    jsk.tz.timeSeparator = '';
    equal(jsk.tz.stToString(), "-0500");
    
    jsk.tz.timeSeparator = null;
    equal(jsk.tz.stToString(), "-0500");
  
