import { BooksContext, BooksDispatchContext } from "@components/core/BooksContext"
import { FC, useState, useContext } from "react"
import { Book, SortOption } from "@schemas/global"
import { Dropdown } from "@components/core/Dropdown"

const sortOptions: SortOption[] = ["Order Added", "Title"]

const BooksList: React.FC<
  React.PropsWithChildren<{
    setShowModal: (show: boolean) => void
    setActiveBook: (book: Book) => void
  }>
> = ({ setShowModal, setActiveBook }) => {
  const books = useContext(BooksContext)
  const dispatch = useContext(BooksDispatchContext)

  const [sort, setSort] = useState<SortOption>("Order Added")

  let sortedBooks = books
  console.log("books", books)
  if (sort === "Order Added" && books.length > 0) {
    sortedBooks = books.toSorted((a, b) => a.createdAt - b.createdAt) // numerical sort
  } else if (sort === "Title" && books.length > 0) {
    sortedBooks = books.toSorted((a, b) => {
      const titleA = a.title.toLowerCase()
      const titleB = b.title.toLowerCase()
      if (titleA < titleB) return -1
      if (titleA > titleB) return 1
      return 0
    }) // string sort
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex w-full flex-row items-end justify-between gap-4">
          <div className="flex-col gap-2">
            <label htmlFor="sort" className="text-lg text-purple-500">
              Sort by
            </label>
            <Dropdown
              id="sort"
              className="h-10 w-32"
              setOption={(sort) => setSort(sort)}
              options={sortOptions}
              currentOption={sort}
            />
          </div>
          <button
            onClick={() =>
              dispatch({
                type: "deletedAll",
              })
            }
            className="shrink-0 rounded-md border border-purple-500 px-4 py-2 text-purple-500 hover:bg-purple-500 hover:text-white active:text-purple-200"
          >
            Clear Books
          </button>
        </div>
        <div className="flex max-h-[80vh] min-h-[20vh] w-full flex-col overflow-y-auto rounded-md border border-purple-500 text-purple-500">
          <span className="flex w-full border border-b-purple-500 p-2 text-xl text-purple-500">Books List</span>
          {sortedBooks.length > 0 ? (
            sortedBooks.map((book) => (
              <div
                key={book.id}
                onClick={() => {
                  setActiveBook(book)
                  setShowModal(true)
                }}
                className="flex cursor-pointer flex-col gap-2 border-b border-purple-500 px-4 py-6 last:border-b-0 hover:bg-purple-200 lg:px-8 lg:py-6"
              >
                <div className="flex flex-row items-baseline gap-2">
                  <h1 className="font-bold">{book.title}</h1>
                  {book.year && <span className="">({book.year})</span>}
                  <span className="ml-auto italic">{book.author}</span>
                </div>
                <span className=" truncate">{book.description}</span>
              </div>
            ))
          ) : (
            <span className="flex h-32 items-center justify-center italic text-purple-400">
              Add some books to get started.
            </span>
          )}
        </div>
      </div>
    </>
  )
}
export default BooksList
