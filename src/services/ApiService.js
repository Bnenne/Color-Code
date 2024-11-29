export const ApiService = {
  async request(data) {
    let endpoint = 'https://micro.apisb.me'
    if (data.dev === true){
      endpoint = 'http://127.0.0.1:5000'
    }
    return await fetch(endpoint + data.route)
  }
}

export const getScouting = {
  async request(dev) {
    let endpoint = 'https://micro.apisb.me'
    if (dev === true){
      endpoint = 'http://127.0.0.1:5000'
    }
    return await fetch(endpoint+'/scoutingapi')
  }
}

export const tbaNames = {
  async request(data, dev) {
    let endpoint = 'https://micro.apisb.me'
    if (dev === true){
      endpoint = 'http://127.0.0.1:5000'
    }
    const response = await fetch(endpoint+'/tba')
    const events = await response.json()
    let newEvents = []
    data.forEach(e => {
      const matchingObject = events.find(item => item.key === e);
      newEvents.push({route: "/"+e, text: matchingObject.name})
    })
    return newEvents
  }
}