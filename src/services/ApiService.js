export const ApiService = {
  async request(route) {
    console.log(route)
    return await fetch('https://micro.apisb.me' + route)
  }
}