import { Assets } from 'premid'

const presence = new Presence({
  clientId: '1423759487852089395',
})
const browsingTimestamp = Math.floor(Date.now() / 1000)

enum ActivityAssets { // Other default assets can be found at index.d.ts
  Logo = 'https://kapyu.neocities.org/otherassets/ponytownimagelarge.jpg',
}

presence.on('UpdateData', async () => {
  const presenceData: PresenceData = {
    largeImageKey: "https://kapyu.neocities.org/otherassets/ponytownimagelarge.jpg",
    startTimestamp: browsingTimestamp,
    state: 'Pony Town',
    details: 'Playing Pony Town',
    smallImageKey: Assets.Play,
  }

  presence.setActivity(presenceData)
})
