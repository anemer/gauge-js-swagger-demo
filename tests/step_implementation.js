/* globals gauge*/

"use strict";
const superagent = require('superagent');
var HttpStatus = require('http-status-codes');
var expect = require("chai").expect;

var SERVER = "https://geo.api.gouv.fr";

/**
 * Step implementation to retrieve France regions
 */
gauge.step("try to POST something", function( done) {
//https://geo.api.gouv.fr/regions?nom=alpes&fields=nom,code

  superagent
  .post(SERVER+'/regions')
  .set('X-API-Key', 'foobar')
  .set('accept', 'json')
  .end((err, res) => {
    // Calling the end function will send the request
    console.log("err", err);    
    console.log(res.body);
    
    gauge.dataStore.specStore.put("response-body", res.body);
    gauge.dataStore.specStore.put("http-status-code",res.status);
    done();
  });
});

/**
 * Step implementation to retrieve France regions
 */
gauge.step("POSTing should be NOT_FOUND", { continueOnFailure: true}, function() {
  expect(getStatus()).eq(HttpStatus.NOT_FOUND);
  
  });
  
/**
 * Step implementation to retrieve France regions
 */
gauge.step("POSTing should be FORBIDDEN", { continueOnFailure: true}, function() {
  expect(getStatus()).eq(HttpStatus.FORBIDDEN);
  
  });
  

/**
 * Step implementation to retrieve France regions
 */
gauge.step("Get <namePart> regions", function(namePart, done) {
  //https://geo.api.gouv.fr/regions?nom=alpes&fields=nom,code
    gauge.message("No checking here" );

    superagent
    .get(SERVER+'/regions')
    .query({ nom: namePart, fields: 'nom,code' }) // query string
    .set('X-API-Key', 'foobar')
    .set('accept', 'json')
    .end((err, res) => {
      // Calling the end function will send the request
      console.log("err", err);    
      console.log(res.body);
      
      gauge.dataStore.specStore.put("response-body", res.body);
      gauge.dataStore.specStore.put("http-status-code",res.status);
      done();
    });
  });
  

gauge.step("Must contain <number> regions", function(number) {
  expect(getResponseBody().length).to.be.eq(parseInt(number));
  });


function getStatus() {
  return gauge.dataStore.specStore.get("http-status-code");
}

function getResponseBody() {
  return gauge.dataStore.specStore.get("response-body");
}
