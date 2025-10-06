import { ActivityType, Assets } from 'premid'

const browsingTimestamp = Math.floor(Date.now() / 1000)

const presence = new Presence({
  clientId: '1424514702205124700',
})

enum ActivityAssets { // Other default assets can be found at index.d.ts
  Logo = 'https://kapyu.neocities.org/otherassets/nekowebicon.png',
}

presence.on('UpdateData', async () => {

  const showSiteButton = await presence.getSetting<boolean>('showsite')

  const { pathname } = document.location

  const presenceData: PresenceData = {
    largeImageKey: ActivityAssets.Logo,
    startTimestamp: browsingTimestamp,
  }

  if (pathname === '/') {
    presenceData.details = 'Home'
  } else if (pathname.includes('/explore')) {
    presenceData.details = 'Browsing Sites'
  }  else if (pathname.includes('/feed')) {
    presenceData.details = 'Viewing Feed'
  }  else if (pathname.includes('/news')) {
    presenceData.details = 'Viewing News'
  }  else if (pathname.includes('/terminal')) {
    presenceData.details = 'Using the terminal'
  }  else if (pathname.includes('/dashboard/editor')) {
    presenceData.details = 'Editing a file'
  }  else if (pathname.includes('/dashboard')) {
    presenceData.details = 'Viewing Dashboard'
  } else {
    delete presenceData.details
  }

  if (showSiteButton === true) {
    if (document.getElementById('userdisplay')) {
      const userPage = document.getElementById('userdisplay')?.parentElement?.getAttribute('href')
      const pageLink = 'https:' + String(userPage)
      presenceData.buttons = [
        {
          label: 'Visit Site',
          url: pageLink
        }
      ]
      presenceData.smallImageKey = 'https://nekoweb.org' + String(document.getElementById('usersc')?.getAttribute('src'))
      presenceData.smallImageUrl = pageLink
    } else {
      delete presenceData.buttons
      delete presenceData.smallImageKey
      delete presenceData.smallImageUrl
    }
  } else {
    delete presenceData.buttons
    delete presenceData.smallImageKey
    delete presenceData.smallImageUrl
  }

  presence.setActivity(presenceData)
})
