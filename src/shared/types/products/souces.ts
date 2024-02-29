export type SouceType = {
  id?: number | string,
  name: string,
  description?: string,
  price: number,
  quantity?: number,
  weight?: number
}

export type SoucesType = Array<SouceType> | null