import { GET_MESSAGES, CLEAR_MESSAGES } from './types'

// RETURN ERRORS
export const returnMessages = (msg = null) => {
  
  return {
    type: GET_MESSAGES,
    payload: msg
  }
}

// CLEAR ERRORS
export const clearMessages = () => {
  return {
    type: CLEAR_MESSAGES
  }
}