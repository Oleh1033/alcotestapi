const rout = require("../../config/endpoints");
const autocomplete = require("../../config/autocomplete");
const billennium = "billennium";

const countUsersLimit = autocomplete.countUsers ;

const jwt = require("jsonwebtoken")

// http://api.tripadvisor.com/api/partner/2.0/location/155507?key=<YOUR KEY HERE>


module.exports = function (app, dbCompany) {

  function verifyBearer(req, res, next) {
    console.log("verifyBearer")
    const bearerHeader = req.headers["authorization"]
    if(typeof bearerHeader !== "undefined"){
      const bearer = bearerHeader.split(" ")
      const bearerToken = bearer[1]
      // console.log(bearerToken)
      jwt.verify(bearerToken, "secretKey", (err, data) => {
        if(err){
          res.sendStatus(403)
        } else {
          // console.log(data)
          req.email = data.userData.email
          next()
        }
      })
    } else {
      res.sendStatus(403)
    }
  }

  app.post('/api/sendData', verifyBearer ,function (req, res) {
    console.log("get sendData request")

    let locationUser = {
      longtitude : req.body.longtitude,
      latitude : req.body.latitude,
      email : req.email
    }

    dbCompany.insertOne(locationUser, function (err, result) {
      res.send(result);
      console.log("create user " + result)
    });

  });

  // fn = function() { return this.longtitude == "52"; }

  app.post('/api/getNearlestUsers', verifyBearer ,function (req, res) {
    console.log("get getNearlestUsers request")

    var query = { "email" : req.email };

    dbCompany.findOne(query, function(err, item) {
      if (item == null) {
        console.log("not found email")
      } else {
        dbCompany.find({"longtitude": {$gte: 50, $lte: 55}}).toArray(function (err, list){
          console.log(err)
          console.log(list)

          list.forEach(function(element) {
            const hipotenuza = Math.sqrt(Math.pow(element.longtitude - 50, 2) + Math.pow(element.latitude - 40, 2))
            element.hipo = hipotenuza
          });
          
          list.sort(function(a, b) { 
            return a.hipo - b.hipo;
          })
          
          res.send(list)
        })
        // console.log("_______")
        // res.send("something find")
      }
    });

    

    // dbCompany
    // .find()
    // .toArray(function (err, list) {
    //   let test = req.body.name;
    //   if (test.length > autocomplete.countCharStartAutocomplete) {
    //     res.send(filterArray(req.body.name, list[0].usersArray))
    //   };
    //   if (!test) {
    //     res.send([])
    //   };
    // });


  });




  // app.post("/sendData", function (req, res) {
  //   dbCompany
  //     .find({ company: billennium })
  //     .project({ _id: 0, usersArray: true })
  //     .toArray(function (err, list) {
  //       let test = req.body.name;
  //       if (test.length > autocomplete.countCharStartAutocomplete) {
  //         res.send(filterArray(req.body.name, list[0].usersArray))
  //       };
  //       if (!test) {
  //         res.send([])
  //       };
  //     });
  // });











  app.post(`${rout.api}${rout.company}${rout.users}`, function (req, res) {
    if (!req.body) return res.sendStatus(400);

    const newUsers = req.body.users;
    const user = newUsers;

    dbCompany.findOneAndUpdate(
      { company: billennium },
      { $set: { usersArray: user } },
      function (err, result) {
        if (err) {
          return console.log(err);
        }
      }
    );
  });

  app.get(`${rout.api}${rout.company}${rout.values}`, function (req, res) {
    dbCompany
      .find({ company: billennium })
      .project({ _id: 0, valueCompany: true })
      .toArray(function (err, list) {
        res.send(list[0].valueCompany);
      });
  });

  app.get(`${rout.api}${rout.company}${rout.users}`, function (req, res) {
    dbCompany
      .find({ company: billennium })
      .project({ _id: 0, usersArray: true })
      .toArray(function (err, list) {
        res.send(list[0].usersArray);
      });
  });

  function filterArray(values, list) {
    let result = list.filter(i => {
      return i.displayName.toLowerCase().indexOf(values.toLowerCase()) + 1;
    });
     result.length = countUsersLimit;
    return result;
  }

  app.post(`${rout.api}${rout.company}${rout.users}${rout.filter}`, function (req, res) {
    dbCompany
      .find({ company: billennium })
      .project({ _id: 0, usersArray: true })
      .toArray(function (err, list) {
        let test = req.body.name;
        if (test.length > autocomplete.countCharStartAutocomplete) {
          res.send(filterArray(req.body.name, list[0].usersArray))
        };
        if (!test) {
          res.send([])
        };
      });
  });

  app.post(`${rout.api}${rout.company}${rout.users}`, function (req, res) {
    if (!req.body) return res.sendStatus(400);

    const newUsers = req.body.users;
    const user = newUsers;

    dbCompany.findOneAndUpdate(
      { company: billennium },
      { $set: { usersArray: user } },
      function (err, result) {
        if (err) {
          return console.log(err)
        };
      }
    );
  });

  app.post(`${rout.api}${rout.company}`, function (req, res) {
    if (!req.body) {
      return res.sendStatus(400)
    }

    const user = {
      company: req.body.company,
      valueCompany: req.body.value,
      usersArray: req.body.users
    };

    dbCompany.insertOne(user, function (err, result) {
      res.send(user);
    });
  });
};
