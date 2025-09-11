import type { SecretQuestion } from '@/types'
import api from './api'

export const getSecretQuestionById = async (questionId: string): Promise<SecretQuestion> => {
  const response = await api.get<SecretQuestion>(`/secret-questions/${questionId}`)
  return response.data
}