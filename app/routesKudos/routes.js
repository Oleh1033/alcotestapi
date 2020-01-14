const rout = require("../../config/endpoints");
const request = require("request-promise");
const id = require("../../config/idBillennium");
const middle = require("../../config/middleware");
const sgMail = require('@sendgrid/mail');
const permission = require("../../config/sendGrid");

var bcrypt = require('bcryptjs');
const db = require("../../config/db.js");
const jwt = require("jsonwebtoken")
const google = require('googleapis');
const emailTemplate = require("../../config/email");

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
SENDGRID_API_KEY = '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';
link = 'https://bicoolback.azurewebsites.net'

const GoogleToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ3NDU2YjgwNjllNDM2NWU1MTdjYTVlMjk3NTdkMWE5ZWZhNTY3YmEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3OTIyMjEwMzExNTAtZDhtMDJiYW9tM21nNDh1OHR2MDZqbXN0bHFhOHNrb3YuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3OTIyMjEwMzExNTAtZDhtMDJiYW9tM21nNDh1OHR2MDZqbXN0bHFhOHNrb3YuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDc0NjMzNTQwODk5NDEwMTc1NjkiLCJlbWFpbCI6Im9sZWcxMDMzNTZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJEMXpiZ3EwU21rOXpldllWcm5hMnd3IiwibmFtZSI6ItCe0LvQtdCzINCR0L7QsdGD0YDRh9Cw0LoiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FBdUU3bUQ2eml0bmtaZm10RG1xVGl0aEFfazBuUHNfZGdCbEgxNVZNTEhGPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6ItCe0LvQtdCzIiwiZmFtaWx5X25hbWUiOiLQkdC-0LHRg9GA0YfQsNC6IiwibG9jYWxlIjoidWsiLCJpYXQiOjE1Nzc0NzU3ODQsImV4cCI6MTU3NzQ3OTM4NH0.qZ-EEMtWbs__Cib6fSRXJIAzI1XnleUxo1vCsF_DDohUnP96EMJhSObP76AC5oa2ni5ExhpzdVr0a-5x012JGlGk80CkYcF0x5iSLisnY6OEvOpSKNNYjPfx2pcSXHqX5Tb73jxIPrDt1lqkE4MLRSvm-T-kmlXsjyCTsLTRU8wHC2QrKMUDVjNh8H8WuJgeM2MIprxGtHn3iy5iSC5JAzXpa0025iB6dJbOPj10ccErxsea0eclDNUbXro3_5TqH9lsRJha7WJi8R4QItvZ_BjMVGlDOJKsbkhXGS64i50Em7hSm9AmwfBjPntNXirR4mjjCYMagmPCQDZV5u3WiQ"
const GoogleTokenValidation = "https://oauth2.googleapis.com/tokeninfo?id_token="
const FacebookTokenValidation = "https://graph.facebook.com/me?access_token="


idBillennium = id.idBillennium;

module.exports = function (app, dbKudos) {
  const urlUserData = middle.urlUserData;
  const options = middle.options;

  var salt = db.salt

  function sendEmailResetPassword(email) {
    const user = {
      value: "abc",
      from: "abc",
      to: "abc",
      date: new Date(),
      message: "abc",
      emailTo: "abc",
      idFrom: "abc",
      idTo: "abc",
      jobTitle: "abc"
    };

    console.log("send email reset password")
    sgMail.setApiKey(SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: 'AlcoBattle@bob.com',
      subject: 'reset password',
      text: 'reset password',
      html: `<!DOCTYPE html><html><head><meta charset="utf-8" /><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><meta name="viewport" content="width=400" /><title>Message</title><link rel="shortcut icon" href="https://tilda.ws/img/tildafavicon.ico" /><style type="text/css">	.ExternalClass {width:100%;}	img{ border:0 none; height:auto; line-height:100%; outline:none; text-decoration:none; -ms-interpolation-mode: bicubic;	}	a img{ border:0 none;	}	#outlook a {padding:0;}	#allrecords{ height:100% !important; margin:0; padding:0; width:100% !important; -webkit-font-smoothing: antialiased; line-height: 1.45;	}	#allrecords td{ margin:0; padding:0;	}	#allrecords ul{-webkit-padding-start:30px;}	@media only screen and (max-width: 600px) { .r{	width:100% !important;	min-width:400px !important; }	}	@media only screen and (max-width: 480px) { .t-emailBlock { display: block !important; padding-left: 0 !important; padding-right: 0 !important; width: 100% !important; } .t-emailBlockPadding { padding-top: 15px !important; } .t-emailBlockPadding30 { padding-top: 30px !important; } .t-emailAlignLeft { text-align: left !important; margin-left: 0 !important; } .t-emailAlignCenter { text-align: center !important; margin-left: auto !important; margin-right: auto !important; }	}</style> </head><body cellpadding="0" cellspacing="0" style="padding: 0; margin: 0; border: 0; width:100%; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; background-color: #efefef;"><!--allrecords--><table id="allrecords" data-tilda-email="yes" data-tilda-project-id="1394840" data-tilda-page-id="6109777" data-tilda-page-alias="" cellpadding="0" cellspacing="0" style="width:100%; border-collapse:collapse; border-spacing:0; padding:0; margin:0; border:0;"> <tr> <td style="background-color: #efefef; " ><!--record_mail--><table id="rec108702680" style="width:100%; border-collapse:collapse; border-spacing:0; margin:0; border:0;" cellpadding="0" cellspacing="0" data-record-type="619"> <tr> <td style="padding-left:15px; padding-right:15px; "> <table id="recin108702680" class="r" style="margin: 0 auto;border-spacing: 0;width:600px;" align="center"><tr><td style="padding-top:0px;padding-bottom:0px;padding-left:0;padding-right:0;"><table valign="top" border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td style="height:30px;" height="30px"></td> </tr> </table></td></tr></table> </td> </tr></table><!--/record--><!--record_mail--><table id="rec108702681" style="width:100%; border-collapse:collapse; border-spacing:0; margin:0; border:0;" cellpadding="0" cellspacing="0" data-record-type="322"> <tr> <td style="padding-left:15px; padding-right:15px; "> <table id="recin108702681" class="r" style="margin: 0 auto;border-spacing: 0;width:600px;" align="center"><tr><td style="padding-top:0px;padding-bottom:0px;padding-left:0;padding-right:0;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"> <tr> <td style="width:100%; text-align: center;"> <a href="https://tilda.cc" target="_blank"> <img width="600" align="center" style="width: 100%; height: auto;" src="https://static.tildacdn.com/tild6436-3831-4532-b538-383737376232/orangelogo2222.png" imgfield="img" > </a> </td> </tr> </table></td></tr></table> </td> </tr></table><!--/record--><!--record_mail--><table id="rec108702682" style="width:100%; border-collapse:collapse; border-spacing:0; margin:0; border:0;" cellpadding="0" cellspacing="0" data-record-type="323"> <tr> <td style="padding-left:15px; padding-right:15px; "> <table id="recin108702682" class="r" style="margin: 0 auto;background-color:#ffffff;border-spacing: 0;width:600px;" align="center"><tr><td style="padding-top:30px;padding-bottom:15px;padding-left:30px;padding-right:30px;"> <table valign="top" border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%;"> <tr> <td style="text-align: left; padding: 0 0 0;"> <div style="margin-right: auto; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; color:#222222;font-size:28px;font-weight:bold;">Good day, ${user.to}! We have a message for you!</div> </td> </tr> </table></td></tr></table> </td> </tr></table><!--/record--><!--record_mail--><table id="rec108702683" style="width:100%; border-collapse:collapse; border-spacing:0; margin:0; border:0;" cellpadding="0" cellspacing="0" data-record-type="329"> <tr> <td style="padding-left:15px; padding-right:15px; "> <table id="recin108702683" class="r" style="margin: 0 auto;background-color:#ffffff;border-spacing: 0;width:600px;" align="center"><tr><td style="padding-top:15px;padding-bottom:15px;padding-left:30px;padding-right:30px;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%;"> <tr> <td style="text-align: left; padding: 0 0 0;"> <div style="margin-right: auto; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; color:#444444;font-size:20px;line-height:1.45;">First of all, thank you so much for being our customer. </br> You have received one BiCool from ${user.from} <br />ABC</div> </td> </tr> </table></td></tr></table> </td> </tr></table><!--/record--><!--record_mail--><table id="rec108702684" style="width:100%; border-collapse:collapse; border-spacing:0; margin:0; border:0;" cellpadding="0" cellspacing="0" data-record-type="618"> <tr> <td style="padding-left:15px; padding-right:15px; "> <table id="recin108702684" class="r" style="margin: 0 auto;background-color:#ffffff;border-spacing: 0;width:600px;" align="center"><tr><td style="padding-top:30px;padding-bottom:45px;padding-left:30px;padding-right:30px;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"> <tr> <td> <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;"> <tr> <td> <a style="display: table-cell; text-decoration: none; padding: 15px 30px; font-size: 15px; text-align: center; font-weight: bold; font-family:Helvetica Neue, Helvetica, Arial, sans-serif; width: 100%;color:#ffffff; border:0px solid ; background-color:#ff5a00; border-radius: 3px;" href="https://bicool.billennium.com"> You can visit our portal </a> </td> </tr> </table> </td> </tr> </table> </td></tr></table> </td> </tr></table><!--/record--><!--record_mail--><!--/record--> </td> </tr></table><!--/allrecords--></body></html>`,
    };

    if (true) {
      sgMail.send(msg);
    }
              //send the email
    sgMail.send(msg, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log("That's wassup!");
      }
    });
  }

  function verifyBearer(req, res, next) {
    console.log("verifyBearer")
    const bearerHeader = req.headers["authorization"]
    if(typeof bearerHeader !== "undefined"){
      const bearer = bearerHeader.split(" ")
      const bearerToken = bearer[1]
      console.log(bearerToken)
      jwt.verify(bearerToken, "secretKey", (err, data) => {
        if(err){
          res.sendStatus(403)
        } else {
          console.log(data)
          next()
        }
      })
    } else {
      res.sendStatus(403)
    }
  }

  function validationPassword(pass) {
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return re.test(pass);
  }

  app.post('/api/createUser', function (req, res) {

    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    console.log(user.password.length)
    if (validationPassword(user.password)) {
      res.status(400).send("at least one number, one lowercase and one uppercase letter and at least six characters")
      return
    }

    if (!emailRegexp.test(user.email)) {
      res.status(400).send("Incorrect email format!!")
      return
    }

    var query = { "email" : req.body.email };

    dbKudos.findOne(query, function(err, item) {
      if (item == null) {

        var hash = bcrypt.hashSync(user.password, salt);
        user.password = hash

        dbKudos.insertOne(user, function (err, result) {
          res.send(user);
          console.log("create user ")
          console.log(user)
        });
      } else {
        res.status(400).send("Email already exist")
        console.log("user exists")
      }
    });
  });


  app.post('/api/login', function (req, res) {

    var query = { "email" : req.body.email };

    dbKudos.findOne(query, function(err, item) {
      if (item == null) {
        res.status(400).send("Email not found")
        console.log("not found")
      } else {
        const result = bcrypt.compareSync(req.body.password, item.password)
        if (result) {
          console.log("result hash check true")
          const userData = {
            name: item.name,
            email: item.email
          }

          jwt.sign({userData}, "secretKey", (err, token) => {
            jwt.sign({userData}, "secretKey", (err, refresh) => {
              res.json({
                token: token,
                refresh: refresh
              })
            })
          })
        } else {
          console.log("result hash check false")
          res.status(400).send("Wrong password")
        }
      }
    });
  });

  app.post('/api/loginWithGoogleToken', function (req, res) {
    options.uri = "https://oauth2.googleapis.com/tokeninfo?id_token=" + req.body.token
    request(options.uri, { json: true }, (err, response, body) => {
    if (err) { return console.log(err); }
      const user = {
        name: body.name,
        email: body.email
      };

      var query = { "email" : body.email };
      dbKudos.findOne(query, function(err, item) {
        if (item == null) {
          dbKudos.insertOne(user, function (err, result) {
            jwt.sign({user}, "secretKey", (err, token) => {
              jwt.sign({user}, "secretKey", (err, refresh) => {
                res.json({
                  token: token,
                  refresh: refresh
                })
              })
            })
          });
        } else {
          res.status(400).send("Email already exist")
        }
      });
    });
  });

  app.post('/api/resetPassword', function (req, res) {
    console.log("get resetPassword request")

    var query = { "email" : req.body.email };
    dbKudos.findOne(query, function(err, item) {
      if (item == null) {
        res.status(400).send("Email not found")
      } else {
        sendEmailResetPassword(req.body.email)
        res.send("We send to Your email letter")
      }
    });
  });




  app.get(`${rout.api}${rout.kudos}`, function (req, res) {
    dbKudos
      .find({})
      .sort([["date", -1]])
      .toArray(function (err, kudos) {
        res.send(kudos);
      });
  })

  app.post(`${rout.api}${rout.kudos}${rout.my}`, function (req, res) {
    options.uri = urlUserData;
    options.headers.Authorization = req.headers.token;
    request(options).then(function (response) {
      dbKudos
        .find({ to: response.displayName })
        .sort([["date", -1]])
        .toArray(function (err, kudos) {
          res.send(kudos);
        })
    })
  });

  app.post(`${rout.api}${rout.kudos}`, function (req, res) {
    if (req.body.value == "" || req.body.idTo == '') {
      return res.sendStatus(400);
    }

    options.uri = urlUserData;
    options.headers.Authorization = req.headers.token;
    request(options).then(function (response) {
      const user = {
        value: req.body.value,
        from: response.displayName,
        to: req.body.to,
        date: new Date(),
        message: req.body.message,
        emailTo: req.body.emailTo,
        idFrom: response.id,
        idTo: req.body.idTo,
        jobTitle: req.body.jobTitle
      };

      if(user.idFrom === user.idTo){
        return res.sendStatus(400);
      }

      dbKudos.insertOne(user, function (err, result) {
        res.send(user);
      });

      _message = '';
      if(user.message){
        _message = "<p>Message: " + user.message + "</p>";
      }

      sgMail.setApiKey(SENDGRID_API_KEY);
      const msg = {
        to: user.emailTo,
        from: 'bicool@billennium.com',
        subject: user.value,
        text: 'BiCoolApp',
        html: `<!DOCTYPE html><html><head><meta charset="utf-8" /><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><meta name="viewport" content="width=400" /><title>Message</title><link rel="shortcut icon" href="https://tilda.ws/img/tildafavicon.ico" /><style type="text/css">	.ExternalClass {width:100%;}	img{ border:0 none; height:auto; line-height:100%; outline:none; text-decoration:none; -ms-interpolation-mode: bicubic;	}	a img{ border:0 none;	}	#outlook a {padding:0;}	#allrecords{ height:100% !important; margin:0; padding:0; width:100% !important; -webkit-font-smoothing: antialiased; line-height: 1.45;	}	#allrecords td{ margin:0; padding:0;	}	#allrecords ul{-webkit-padding-start:30px;}	@media only screen and (max-width: 600px) { .r{	width:100% !important;	min-width:400px !important; }	}	@media only screen and (max-width: 480px) { .t-emailBlock { display: block !important; padding-left: 0 !important; padding-right: 0 !important; width: 100% !important; } .t-emailBlockPadding { padding-top: 15px !important; } .t-emailBlockPadding30 { padding-top: 30px !important; } .t-emailAlignLeft { text-align: left !important; margin-left: 0 !important; } .t-emailAlignCenter { text-align: center !important; margin-left: auto !important; margin-right: auto !important; }	}</style> </head><body cellpadding="0" cellspacing="0" style="padding: 0; margin: 0; border: 0; width:100%; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; background-color: #efefef;"><!--allrecords--><table id="allrecords" data-tilda-email="yes" data-tilda-project-id="1394840" data-tilda-page-id="6109777" data-tilda-page-alias="" cellpadding="0" cellspacing="0" style="width:100%; border-collapse:collapse; border-spacing:0; padding:0; margin:0; border:0;"> <tr> <td style="background-color: #efefef; " ><!--record_mail--><table id="rec108702680" style="width:100%; border-collapse:collapse; border-spacing:0; margin:0; border:0;" cellpadding="0" cellspacing="0" data-record-type="619"> <tr> <td style="padding-left:15px; padding-right:15px; "> <table id="recin108702680" class="r" style="margin: 0 auto;border-spacing: 0;width:600px;" align="center"><tr><td style="padding-top:0px;padding-bottom:0px;padding-left:0;padding-right:0;"><table valign="top" border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td style="height:30px;" height="30px"></td> </tr> </table></td></tr></table> </td> </tr></table><!--/record--><!--record_mail--><table id="rec108702681" style="width:100%; border-collapse:collapse; border-spacing:0; margin:0; border:0;" cellpadding="0" cellspacing="0" data-record-type="322"> <tr> <td style="padding-left:15px; padding-right:15px; "> <table id="recin108702681" class="r" style="margin: 0 auto;border-spacing: 0;width:600px;" align="center"><tr><td style="padding-top:0px;padding-bottom:0px;padding-left:0;padding-right:0;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"> <tr> <td style="width:100%; text-align: center;"> <a href="https://tilda.cc" target="_blank"> <img width="600" align="center" style="width: 100%; height: auto;" src="https://static.tildacdn.com/tild6436-3831-4532-b538-383737376232/orangelogo2222.png" imgfield="img" > </a> </td> </tr> </table></td></tr></table> </td> </tr></table><!--/record--><!--record_mail--><table id="rec108702682" style="width:100%; border-collapse:collapse; border-spacing:0; margin:0; border:0;" cellpadding="0" cellspacing="0" data-record-type="323"> <tr> <td style="padding-left:15px; padding-right:15px; "> <table id="recin108702682" class="r" style="margin: 0 auto;background-color:#ffffff;border-spacing: 0;width:600px;" align="center"><tr><td style="padding-top:30px;padding-bottom:15px;padding-left:30px;padding-right:30px;"> <table valign="top" border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%;"> <tr> <td style="text-align: left; padding: 0 0 0;"> <div style="margin-right: auto; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; color:#222222;font-size:28px;font-weight:bold;">Good day, ${user.to}! We have a message for you!</div> </td> </tr> </table></td></tr></table> </td> </tr></table><!--/record--><!--record_mail--><table id="rec108702683" style="width:100%; border-collapse:collapse; border-spacing:0; margin:0; border:0;" cellpadding="0" cellspacing="0" data-record-type="329"> <tr> <td style="padding-left:15px; padding-right:15px; "> <table id="recin108702683" class="r" style="margin: 0 auto;background-color:#ffffff;border-spacing: 0;width:600px;" align="center"><tr><td style="padding-top:15px;padding-bottom:15px;padding-left:30px;padding-right:30px;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%;"> <tr> <td style="text-align: left; padding: 0 0 0;"> <div style="margin-right: auto; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; color:#444444;font-size:20px;line-height:1.45;">First of all, thank you so much for being our customer. </br> You have received one BiCool from ${user.from} <br />${ _message}</div> </td> </tr> </table></td></tr></table> </td> </tr></table><!--/record--><!--record_mail--><table id="rec108702684" style="width:100%; border-collapse:collapse; border-spacing:0; margin:0; border:0;" cellpadding="0" cellspacing="0" data-record-type="618"> <tr> <td style="padding-left:15px; padding-right:15px; "> <table id="recin108702684" class="r" style="margin: 0 auto;background-color:#ffffff;border-spacing: 0;width:600px;" align="center"><tr><td style="padding-top:30px;padding-bottom:45px;padding-left:30px;padding-right:30px;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"> <tr> <td> <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;"> <tr> <td> <a style="display: table-cell; text-decoration: none; padding: 15px 30px; font-size: 15px; text-align: center; font-weight: bold; font-family:Helvetica Neue, Helvetica, Arial, sans-serif; width: 100%;color:#ffffff; border:0px solid ; background-color:#ff5a00; border-radius: 3px;" href="https://bicool.billennium.com"> You can visit our portal </a> </td> </tr> </table> </td> </tr> </table> </td></tr></table> </td> </tr></table><!--/record--><!--record_mail--><!--/record--> </td> </tr></table><!--/allrecords--></body></html>`,
      };

      if (permission.sendMail) {
        sgMail.send(msg);
      }
    })
  });
};
