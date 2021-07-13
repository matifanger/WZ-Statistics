const COD = require('call-of-duty-api')({
  platform: "battle"
});

const email = 'matzenwow@gmail.com'
const password = 'm9w*tDQ*mJ15mvP&'
const test = process.env.WARZONE_PASS

exports.handler = async (event) => {
  try {
    const id = event.queryStringParameters.ID;
    const login = await COD.login(email, password);
    const data = await COD.MWBattleData(id, COD.platforms.acti);
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
