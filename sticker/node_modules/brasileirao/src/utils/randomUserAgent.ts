import { userAgents } from '../constants/userAgents'

export const randomUserAgent = () => {
  const randomIndex = Math.floor(Math.random() * userAgents.length)
  return userAgents[randomIndex]
}
