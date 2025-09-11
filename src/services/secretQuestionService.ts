import type { SecretQuestion, SecretQuestionAnswerResponse } from '@/types'
import api from './api'

export const getSecretQuestionById = async (questionId: string): Promise<SecretQuestion> => {
  const response = await api.get<SecretQuestion>(`/secret-questions/${questionId}`)
  return response.data
}

export const submitSecretQuestionAnswer = async (
  questionId: string,
  answerKey: string
): Promise<SecretQuestionAnswerResponse> => {
  const response = await api.post<SecretQuestionAnswerResponse>(
    `/secret-questions/${questionId}/answer`,
    { answerKey }
  )
  return response.data
}