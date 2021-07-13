const COD = require('call-of-duty-api')({
  platform: "battle"
});

const email = process.env.WARZONE_EMAIL
const password = process.env.WARZONE_PASS

exports.handler = async (event) => {
  try {
    const id = event.queryStringParameters.ID;
    const login = await COD.login(email, password);
    const data = await COD.MWBattleData(id, COD.platforms.acti);
    // ! console.log(test)
    return {
      statusCode: 200,
      body: JSON.stringify(password)
    }
  } catch (error) {
    // ! console.log(test)
    return {
      statusCode: 200,
      body: JSON.stringify(password)
    }
  }
}
