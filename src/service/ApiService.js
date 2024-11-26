export const ApiService = {
  async request(route) {
    const response = await fetch(route)
    return response.json()
  }
}