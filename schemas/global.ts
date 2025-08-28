export interface Book {
  createdAt: number
  id: string
  title: string
  year: string
  author: string
  description: string
}

export type BookAction =
  { type: "added" ; book: Book} |
  { type: "changed" ; book: Book} |
  { type: "deletedAll"; book: Book } |
  { type: string; book: undefined}

export type SortOption = "Order Added" | "Title"

