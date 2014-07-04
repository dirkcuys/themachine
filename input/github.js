var Q = require('q');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

exports.forked = function(repo){
    var xhr = new XMLHttpRequest();
    xhr.dataType = "json";
    xhr.open('GET', 'https://api.github.com/repos/' + repo + '/forks')
    xhr.setRequestHeader('Accept','application/vnd.github.raw+json');
    xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8');
    var deferred = Q.defer();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                data = JSON.parse(this.responseText);
                forks = [];
                for (var i = 0; i < data.length; ++i){
                    console.log(data[i].created_at);
                    if (Math.abs(new Date(data[i].created_at) - new Date()) < 24*60*60*1000){
                        forks.push(data[i]);
                    }
                }
                if (forks.length > 0){
                    deferred.resolve(forks);
                } else {
                    deferred.reject('No forks today');
                }
            } else {
                deferred.reject('Request failed with status code ' + this.status);
            }
        }
    };
    xhr.send();
    return deferred.promise;
}
