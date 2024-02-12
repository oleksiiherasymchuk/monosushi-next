export type DrinkType = {
  id: number,
  name: string,
  description?: string,
  price: number,
  quantity?: number,
  weight?: number
}

export type DrinksType = Array<DrinkType> | null