import api from "./api"

export const getPlayerData = async playerId => {
  try {
    const response = await api.get(`/players/${playerId}`)
    return response.data
  } catch (err) {
    console.error(err)
    return {}
  }
}