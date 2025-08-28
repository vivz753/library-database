import type { NextPage } from "next"
import Head from "next/head"
import { useState, useReducer } from "react"

import Modal from "@components/core/Modal"
import AddBook from "@components/core/AddBook"
import BooksList from "@components/core/BooksList"
import { Book, BookAction } from "@schemas/global"
import { BooksContext, BooksDispatchContext } from "@components/core/BooksContext"

const webTitle = `Vivian's Library App`

const Home: NextPage = () => {
  const [books, dispatch] = useReducer(booksReducer, initialBooks)
  const [activeBook, setActiveBook] = useState<Book>(books[0])
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <>
      <Head>
        <title>{webTitle}</title>
        <meta name="description" content="XTIVIA Library Application" />
        <link rel="icon" href="/images/rainbows/rainbow-blue-svgrepo-com.svg" />
      </Head>
      <BooksContext.Provider value={books}>
        <BooksDispatchContext.Provider value={dispatch}>
          <div className="flex h-full flex-col gap-8 p-4 lg:w-1/2 lg:p-12">
            <AddBook />
            <BooksList setActiveBook={setActiveBook} setShowModal={setShowModal} />
          </div>
          {showModal && <Modal show={showModal} onClose={() => setShowModal(false)} book={activeBook} />}
        </BooksDispatchContext.Provider>
      </BooksContext.Provider>
    </>
  )
}

export default Home

const booksReducer = (books: Book[], action: BookAction ): Book[] => {
  switch (action.type) {
    case "added": {
      return [
        ...books,
        {
          id: action.book?.id || '',
          title: action.book?.title || '',
          description: action.book?.description || '',
          author: action.book?.author || '',
          year: action.book?.year || '',
          createdAt: Date.now(),
        },
      ]
    }
    case "changed": {
      return books.map((b) => {
        if (b.id === action.book?.id) {
          return action.book
        } else {
          return b
        }
      })
    }
    case "deletedAll": {
      return []
    }
    default: {
      throw Error("Unknown action: " + action.type)
    }
  }
}

const initialBooks: Book[] = [
  // { id: "1", title: "abc", author: "xyz", year: "1996", description: "Here is a summary of the book", createdAt: Date.now()},
  // { id: "1", title: "abc", author: "xyz", year: "1996", description: "Here is a summary of the book", createdAt: Date.now()},
  // { id: "1", title: "abc", author: "xyz", year: "1996", description: "Here is a summary of the book", createdAt: Date.now()},
  // { id: "1", title: "abc", author: "xyz", year: "1996", description: "Here is a summary of the book", createdAt: Date.now()},
  // { id: "1", title: "abc", author: "xyz", year: "1996", description: "Here is a summary of the book", createdAt: Date.now()},
  // { id: "1", title: "abc", author: "xyz", year: "1996", description: "Here is a summary of the book", createdAt: Date.now()},
  // { id: "1", title: "abc", author: "xyz", year: "1996", description: "Here is a summary of the book", createdAt: Date.now()},
  // { id: "1", title: "abc", author: "xyz", year: "1996", description: "Here is a summary of the book", createdAt: Date.now()},
]
