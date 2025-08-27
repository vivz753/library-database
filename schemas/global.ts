export interface Book {
  createdAt: number
  id: string
  title: string
  year: string
  author: string
  description: string
}

export type SortOption = "Order Added" | "Title"

