const rwClient = require("./twitterClient.js")
const CronJob = require("cron").CronJob
const axios = require("axios")
const express = require("express")

const app = express()

app.get("/", (req, res) => {
  res.sendStatus(200)
})

app.listen(3000)

const tweet = async (text) => {
  try {
    await rwClient.v2.tweet(text)
    console.log(`Tweet send: ${text}`)
  } catch (err) {
    console.error(err)
  }
}

const getEvents = async () => {
  const response = await axios.get('https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard')

  if (response.status === 200) {
    const scoreboard = []
    const eventsNow = response.data.events.filter(event => event.status.type.name === 'STATUS_IN_PROGRESS' || event.status.type.name === 'STATUS_HALFTIME')
    eventsNow.map((event, index) => {
      scoreboard.push(
        {
          team1: event.competitions[0].competitors[0].team.displayName,
          team2: event.competitions[0].competitors[1].team.displayName,
          score1: event.competitions[0].competitors[0].score,
          score2: event.competitions[0].competitors[1].score
        }
      )
    })

    return scoreboard
  }
}

const job = new CronJob("*/3 * * * *", async () => {
  const date = new Date()
  const dateLocal = date.toLocaleString('pt-BR', {timeZone: "America/Sao_Paulo"})
  const response = await getEvents()

  if (response.length >= 6) {
    let formatedResponse = []

    for (let i = 0; i < Math.ceil(response.length / 2); i++) {
      const firstLine = `${response[i * 2].team1} - ${response[i * 2].score1}\n${response[i * 2].team2} - ${response[i * 2].score2}\n\n`
      let secondLine = ''
      if (response[i * 2 + 1]) {
        secondLine = `${response[i * 2 + 1].team1} - ${response[i * 2 + 1].score1}\n${response[i * 2 + 1].team2} - ${response[i * 2 + 1].score2}\n\n`
      }
      
      const formatedTweet = `${firstLine}${secondLine}`
      formatedResponse.push(formatedTweet)
    }

    formatedResponse.forEach(function(item, index) {
      setTimeout(async function(){
        await tweet(`${item}${dateLocal}`)
      }, 5000 * (index + 1));
    });
  }  else {  
    response.forEach(function(item, index) {
      setTimeout(async function(){
        await tweet(
        `${item.team1} - ${item.score1}\n${item.team2} - ${item.score2}\n\n${dateLocal}`)
      }, 5000 * (index + 1));
    });
  }
})

job.start()