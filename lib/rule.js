
exports.daily = function(hour, minute){
    return function(){
        // TODO: this will also be flaky without state
        var runnerResolution = 60*1000;
        var trigger = new Date();
        trigger.setHours(hour);
        trigger.setMinutes(minute);
        return Math.abs(trigger - new Date()) < runnerResolution;
    }
}


exports.run = function(scheduler, callback){
    if ( scheduler() ){
        callback();
    }
}

/*
run(daily(14,24), function(){
    console.log('run task');
});
*/
