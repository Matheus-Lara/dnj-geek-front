export interface Collectible {
  code: string
  type: string
  points: number
  name: string
  description: string
  image: string
}

export interface ClaimCollectibleSuccessResponse {
  claimedCollectible: Collectible
  totalPoints: number
  totalItems: number
  collectibles: Collectible[]
}

export interface ClaimCollectibleErrorResponse {
  error: {
    message: string
    fields: null | Record<string, unknown>
  }
}

export interface SecretQuestion {
  id: string
  name: string
  hint: string
  options: {
    [key: string]: string
  }
}