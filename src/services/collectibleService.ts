import apiClient from './api'
import type {
  ClaimCollectibleErrorResponse,
  ClaimCollectibleSuccessResponse
} from '@/types'

export default {
  claimCollectible(
    collectibleId: string
  ): Promise<ClaimCollectibleSuccessResponse> {
    return new Promise((resolve, reject) => {
      apiClient
        .post(`/user-collectibles/claim`, {
          code: collectibleId
        })
        .then((response) => {
          resolve(response.data as ClaimCollectibleSuccessResponse)
        })
        .catch((error) => {
          reject(error.response.data as ClaimCollectibleErrorResponse)
        })
    })
  }
}