import apiClient from './api'
import type {
  ClaimCollectibleErrorResponse
} from '@/types'

export default {
  claimPrizeForUser(userTag: string): Promise<any> {
    return new Promise((resolve, reject) => {
      apiClient
        .post(`/user-collectibles/claim-prize`, { userTag })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error.response.data as ClaimCollectibleErrorResponse)
        })
    })
  }
}