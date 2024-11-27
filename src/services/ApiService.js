export const ApiService = {
  async request(route) {
    console.log(route)
    return await fetch('https://micro.apisb.me' + route)
  }
}

export const FetchEventsTeams = {
  async request() {
    const events = await fetch('https://team1710scouting.vercel.app/api/key/event')
    const teams = await fetch('https://team1710scouting.vercel.app/api/key/team')
    return { teams: teams.json(), events: events.json() }
  }
}