import { ActivityType, Assets } from 'premid'

const presence = new Presence({
  clientId: '1423759487852089395',
})

const browsingTimestamp = Math.floor(Date.now() / 1000)
var editingTime = Math.floor(Date.now() / 1000)
var currentState = "home"

enum ActivityAssets { // Other default assets can be found at index.d.ts
  Logo = 'https://kapyu.neocities.org/otherassets/ponytownimagelarge.jpg',
}

presence.on('UpdateData', async () => {
  const presenceData: PresenceData = {
    largeImageKey: "https://kapyu.neocities.org/otherassets/ponytownimagelarge.jpg",
    startTimestamp: browsingTimestamp,
  }

  const gameWindow = document.getElementById("app-game")

  presenceData.type = ActivityType.Playing 

  if (gameWindow?.hidden) {
    presenceData.details = "On home page"
    currentState = "home"
  } else {
    presenceData.details = "In Game"
    currentState = "game"
    presenceData.smallImageKey = "https://kapyu.neocities.org/otherassets/playing%20icon.png"
  }

  if (currentState === "home") {
    presenceData.state = ""
    if (document.getElementsByClassName("character-tabs")[0]) {
      presenceData.state = "Editing Character"
      presenceData.smallImageKey = "https://kapyu.neocities.org/otherassets/customizing%20icon.png"
      editingTime = Math.floor(Date.now() / 1000)
      presenceData.startTimestamp = editingTime
    } else {
      presenceData.state = ""
      presenceData.startTimestamp = browsingTimestamp
    }
  } else if (currentState === "game") {
    presenceData.state = ""
    if (document.getElementsByTagName("character-preview")[0]) {
      presenceData.state = "Editing Character"
      presenceData.smallImageKey = "https://kapyu.neocities.org/otherassets/customizing%20icon.png"
      editingTime = Math.floor(Date.now() / 1000)
      presenceData.startTimestamp = editingTime
    } else {
      presenceData.state = ""
      presenceData.startTimestamp = browsingTimestamp
      presenceData.smallImageKey = "https://kapyu.neocities.org/otherassets/playing%20icon.png"
    }
  }
  
  presence.setActivity(presenceData)
})
