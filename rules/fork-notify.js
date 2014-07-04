/* This script checks to see if we have any new forks.
 * It doesn't store state, simply checks a list of github repositories to see if anything has been forked in the last 24 hours 
 */

var Rule = require("../lib/rule.js");
var Github = require("../input/github.js");

//Rule.run(Rule.daily(12, 0), function(config){
Rule.run(function(){return true;}, function(config){
    console.log('Get list of repositories');
    // Get list of repositories for the org
    // var ghOrg = config.get('ghOrg');

    // For every repository, get a list of forks
    Github.forked('dirkcuys/themachine').then(function(result){
        for (var i = 0; i < result.length; ++i){
            console.log(result[i].name + ' was forked by ' + result[i].owner.login);
            // For every fork, notify dev interests
        }
    }, function(reason){
        console.log('not forked: ' + reason);
    });
});
