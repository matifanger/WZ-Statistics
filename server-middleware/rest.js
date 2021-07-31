const COD = require('call-of-duty-api')({});
const app = require('express')()
const sso_token = process.env.SSO_TOKEN

app.all('/wzrequest',async(req, res) => {
  try {
    const id = req.query.ID;
    await COD.loginWithSSO(sso_token)
    let data = await COD.MWBattleData(id, COD.platforms.acti);
    res.json({statusCode: 200,body: data})
    } catch (error) {
    res.json({statusCode: 200,body: error})
  }

})

module.exports = app