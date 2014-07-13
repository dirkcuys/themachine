Q = require('q');
nodemailer = require('nodemailer');

exports.send_gmail = function(from, to, subject, text, html, user, pass){
    var transport = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            user: user,
            pass: pass
        }
    });
    
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: from, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plaintext body
        html: html // html body
    }
    var deferred = Q.defer();
    // send mail with defined transport object
    transport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            deferred.reject(error);
        }else{
            deferred.resolve();
            console.log("Message sent: " + response.message);
        }
        transport.close(); // shut down the connection pool, no more messages
    });
    return deferred.promise;
}
