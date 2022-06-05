import api from "./api"

export const getPlayer = async playerId => {
  try {
    const response = await api.get(`/players/${playerId}`)
    return response.data
  } catch (err) {
    console.error(err)
    return {}
  }
}

export const getPlayers = async query => {
  try {
    const response = await api.get(`/players`)
    return response.data
  } catch (err) {
    console.error(err)
    return []
  }
}