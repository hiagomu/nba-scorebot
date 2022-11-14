const { TwitterApi } = require("twitter-api-v2")

const client = new TwitterApi({
    appKey: "uFVOnx4oGgg1mUvNIRInBCfLl",
    appSecret: "6pqyvjtLICUAOswYXuldhygRdQKC1MaZMHxHguDN0FPp7gGesw",
    accessToken: "1591529931670011905-UDYo4BTcyD7zqW5OdI2G8ESU6Y0McY",
    accessSecret: "W0XaJzZSdFdrxUO4T1pKzqRy4OpjVhxUAipBirwpZNpz1"
})

const rwClient = client.readWrite

module.exports = rwClient