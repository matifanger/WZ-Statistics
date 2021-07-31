const COD = require('call-of-duty-api')({});

const sso_token = process.env.SSO_TOKEN

exports.handler = async (event) => {
  try {
    const id = event.queryStringParameters.ID;
    await COD.loginWithSSO(sso_token)
    let data = await COD.MWBattleData(id, COD.platforms.acti);
    // ! console.log(test)
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
    // ! console.log(test)
    return {
      statusCode: 200,
      body: JSON.stringify(error)
    }
  }
}
