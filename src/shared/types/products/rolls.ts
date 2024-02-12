export type RollType = {
  id: number,
  name: string,
  description?: string,
  price: number,
  quantity?: number,
  weight?: number
}

export type RollsType = Array<RollType> | null