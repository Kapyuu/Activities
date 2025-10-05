import { ActivityType, Assets } from 'premid'

const presence = new Presence({
  clientId: '1423759487852089395',
})

const browsingTimestamp = Math.floor(Date.now() / 1000)
var editingTime = 0
var currentState = "home"

var detailsText = "Home Page"
var activityText = ""

enum ActivityAssets { // Other default assets can be found at index.d.ts
  Logo = 'https://kapyu.neocities.org/otherassets/ponytownimagelarge.jpg',
}

presence.on('UpdateData', async () => {
  const presenceData: PresenceData = {
    largeImageKey: "https://kapyu.neocities.org/otherassets/ponytownimagelarge.jpg",
    startTimestamp: browsingTimestamp,
  }

  const gameWindow = document.getElementById("app-game")
  const statusbox = document.getElementsByClassName("status-box")[0]

  presenceData.type = ActivityType.Playing 

  if (gameWindow?.hidden) {
    detailsText = "Home page"
    currentState = "home"
  } else {
    detailsText = "In Game"
    currentState = "game"
    presenceData.smallImageKey = "https://kapyu.neocities.org/otherassets/playing%20icon.png"
  }

  if (currentState === "home") {
    delete presenceData.state
    if (document.getElementsByClassName("character-tabs")[0]) {
      presenceData.state = "Designing Pony"
      presenceData.smallImageKey = "https://kapyu.neocities.org/otherassets/customizing%20icon.png"
      if (editingTime === 0) {
        editingTime = Math.floor(Date.now() / 1000)
      }
      presenceData.startTimestamp = editingTime
    } else {
      delete presenceData.state
      presenceData.startTimestamp = browsingTimestamp
      editingTime = 0
    }
  } else if (currentState === "game") {
    delete presenceData.state
    if (document.getElementsByTagName("character-preview")[0]) {
      presenceData.state = "Designing Pony"
      presenceData.smallImageKey = "https://kapyu.neocities.org/otherassets/customizing%20icon.png"
      if (editingTime === 0) {
        editingTime = Math.floor(Date.now() / 1000)
      }
      presenceData.startTimestamp = editingTime
    } else {
      delete presenceData.state
      presenceData.startTimestamp = browsingTimestamp
      presenceData.smallImageKey = "https://kapyu.neocities.org/otherassets/playing%20icon.png"
      editingTime = 0
    }

    if (statusbox) {
      const currentStatus = statusbox.getElementsByClassName("svg")[0]
      if (currentStatus) {
        activityText = "(found status)"
      } else {
        activityText = ""
      }
    }

  }
  
  presenceData.details = detailsText + " " + activityText

  presence.setActivity(presenceData)
})
