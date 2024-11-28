export const ApiService = {
  async request(route) {
    return await fetch('https://micro.apisb.me' + route)
  }
}

export const getScouting = {
  async request() {
    return await fetch('https://micro.apisb.me/scoutingapi')
  }
}

export const tbaNames = {
  async request(data) {
    const apiKey = import.meta.env.VITE_API_KEY
    const response = await fetch(`https://www.thebluealliance.com/api/v3/events/2024/simple?X-TBA-Auth-Key=${apiKey}`)
    const events = await response.json()
    let newEvents = []
    data.forEach(e => {
      const matchingObject = events.find(item => item.key === e);
      newEvents.push({route: "/"+e, text: matchingObject.name})
    })
    return newEvents
  }
}