exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'GyeongChan',
      age: 25,
      email: 'cham9994@gmail.com'
    })
  }
}
