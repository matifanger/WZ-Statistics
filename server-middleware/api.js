const axios = require('axios');
// const EloRating = require('elo-rating');
const fetch = require("node-fetch");

const app = require('express')()
const COD = require('call-of-duty-api')({ platform: "battle" });

const email = 'maattz@outlook.com'
const password = 'Rexonapower1998!'


app.all('/getuser/:id',async(req, res) => {
  const id = req.params.id;
  try {
    COD.login(email, password).then(() => {
    COD.MWBattleData(id, COD.platforms.acti)
    .then((data) => {
      res.json(data); // see output
    })
    .catch((err) => {
      res.json(err);
    });
});
  } catch (error) {
    console.log(error)
  }
})

// var result = EloRating.calculate(2700, 3000, true, 30);
// console.log(result)


module.exports = app