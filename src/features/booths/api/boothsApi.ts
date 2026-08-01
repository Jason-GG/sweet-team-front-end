import { boothMocks } from '../mocks/booths'
import type { Booth } from '../types'

export async function fetchBooths(): Promise<Booth[]> {
  await new Promise((resolve) => window.setTimeout(resolve, 180))
  return boothMocks
}