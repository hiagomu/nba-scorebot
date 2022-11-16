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
    eventsNow.map(event => {
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
  const response = await getEvents()

  response.forEach(function(item, index) {
    setTimeout(async function(){
      await tweet(
      `${item.team1} - ${item.score1}\n${item.team2} - ${item.score2}\n\n${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`)
    }, 5000 * (index + 1));
  });
})

job.start()