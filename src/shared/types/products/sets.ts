export type SetType = {
  id: number,
  name: string,
  description?: string,
  price: number,
  quantity?: number,
  weight?: number
}

export type SetsType = Array<SetType> | null