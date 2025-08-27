import { useState, useContext } from "react"
import { Book } from "@schemas/global"
import { BooksContext, BooksDispatchContext } from "@components/core/BooksContext"

const AddBook = ({}) => {
  const [bookId, setBookId] = useState<string>("OL37044608M")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const dispatch = useContext(BooksDispatchContext)
  const books = useContext(BooksContext)

  const addNewBook = async (e: React.FormEvent<HTMLFormElement>) => {
    setError("")
    e.preventDefault()
    // const bookId = bookId
    if (bookId) {
      setLoading(true)
      try {
        // Get the Edition's publish date, title, and author key
        const editionsResponse = await fetch(`https://openlibrary.org/books/${bookId}.json`, {})

        const editionsJson = await editionsResponse.json()
        console.log("editionsJson", editionsJson)
        const { publish_date, title, description, authors, works } = editionsJson
        const authorKey = authors[0].key
        console.log("publish_date", publish_date)
        console.log("title", title)

        // Get the Author's name and HTML description
        const authorResponse = await fetch(`https://openlibrary.org${authorKey}.json`, {})
        const authorJson = await authorResponse.json()
        console.log("authorJson", authorJson.name)
        const cleanedDescription = description && description.value.replace(/<[^>]*>/g, "")
        console.log("cleanedDescription", cleanedDescription)

        // Get the Works description
        const worksKey = works[0].key
        const worksResponse = await fetch(`https://openlibrary.org${worksKey}.json`)
        const worksJson = await worksResponse.json()
        console.log("worksJson", worksJson.description)

        const newBook: Book = {
          createdAt: Date.now(),
          id: bookId,
          title: title,
          year: publish_date,
          author: authorJson.name,
          description: cleanedDescription || worksJson.description,
        }

        // Check for any duplicates
        if (books && books.length > 1) {
          const dupeFound = books.some((book) => book.id === newBook.id)
          console.log("dupeFound", dupeFound)
          if (dupeFound) throw Error("Already found an existing book with the ID: " + newBook.id)
        }

        dispatch({
          type: "added",
          book: newBook,
        })

        setBookId("")
      } catch (e: any) {
        setError(e.message)
      }
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={(e) => {
        addNewBook(e)
      }}
      className="flex flex-col gap-2"
    >
      <label htmlFor="bookId" className="text-lg text-purple-500">
        Add a Book by ID
      </label>
      <div className="flex w-full gap-1">
        <input
          required
          className="flex w-full rounded-md border border-purple-500 px-4 py-2 text-purple-500 outline-purple-500 placeholder:text-purple-400"
          placeholder="Enter a book/works ID ending with M"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          id="bookId"
        />
        <button
          disabled={loading}
          className="mx-2 shrink-0 rounded-md border border-purple-500 px-4 py-2 text-purple-500 hover:bg-purple-500 hover:text-white active:text-purple-200 disabled:border-purple-200 disabled:text-purple-200 disabled:hover:bg-white disabled:hover:text-purple-200"
          type="submit"
        >
          {loading ? "Adding Book..." : "Add Book"}
        </button>
      </div>
      <span className="text-red-500">{error}</span>
      <span className="text-purple-500">{`Try searching a sample title:`}</span>
      <span className="text-purple-500">
        {`
					OL7353617M (Fantastic Mr. Fox),
					OL32814136M (Wonder),
					OL37044608M (Frankenstein),
					OL24668539M (The Raven)`}
      </span>
    </form>
  )
}
export default AddBook
