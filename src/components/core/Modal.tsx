import { forwardRef, useContext } from "react"
import clsx from "clsx"
import Image from "next/image"
import { FC, useState, useEffect } from "react"
import { Book } from "@schemas/global"
import { BooksContext, BooksDispatchContext } from "@components/core/BooksContext"

interface ModalProps {
  show: boolean
  onClose: () => void
  children?: JSX.Element
  book: Book
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(({ show, onClose, children, book }, ref) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")
  const [bookDetails, setBookDetails] = useState<Book>(book)
  const dispatch = useContext(BooksDispatchContext)

  const saveBook = (e) => {
    e.preventDefault()
    setSuccess("")
    setError("")
    setLoading(true)

    try {
      console.log("saving bookDetails", bookDetails)
      // push the book into the Context

      dispatch({
        type: "changed",
        book: bookDetails,
      })
      setSuccess("Successfully saved changes.")
    } catch (e: any) {
      setError(e.message)
    }
    setLoading(false)
  }

  return (
    <div className={clsx("fixed top-0 h-full w-screen justify-center", show ? "flex" : "hidden")}>
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="absolute h-full w-full bg-black opacity-70" />
        {/* <div  ref={ref} className="absolute bg-white rounded-xl inset-14 m-10 bg-contain bg-no-repeat bg-center"  style={{backgroundImage: `url(${activeImage})`}}>
        {children}
      </div> */}
        <div className="flex h-full w-full flex-row items-center justify-center">
          <div className="relative flex h-full w-full items-center justify-center p-4 md:p-8 lg:p-32">
            <div className="h-[90vh] w-full lg:w-1/2 overflow-y-auto rounded-md bg-white p-4 lg:p-12">
              {book && bookDetails && (
                <form onSubmit={(e) => saveBook(e)} className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="bookId" className="text-lg text-purple-500">
                      Book ID
                    </label>
                    <input
                      disabled
                      className="flex w-full rounded-md border border-purple-500 px-4 py-2 text-purple-500 outline-purple-500 placeholder:text-purple-400 disabled:bg-purple-100"
                      value={bookDetails.id}
                      id="bookId"
											/>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="title" className="text-lg text-purple-500">
                      Title
                    </label>
                    <input
                      required
                      placeholder="(i.e. Grapes of Wrath)"
                      className="flex w-full rounded-md border border-purple-500 px-4 py-2 text-purple-500 outline-purple-500 placeholder:text-purple-400"
                      value={bookDetails.title}
                      onChange={(e) =>
                        setBookDetails((details) => {
                          return {
                            ...details,
                            title: e.target.value,
                          }
                        })
                      }
                      id="title"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="author" className="text-lg text-purple-500">
                      Author
                    </label>
                    <input
                      required
                      className="flex w-full rounded-md border border-purple-500 px-4 py-2 text-purple-500 outline-purple-500 placeholder:text-purple-400"
                      placeholder="(i.e. Emily Dickinson)"
                      value={bookDetails.author}
                      onChange={(e) =>
                        setBookDetails((details) => {
                          return {
                            ...details,
                            author: e.target.value,
                          }
                        })
                      }
                      id="author"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="year" className="text-lg text-purple-500">
                      Published
                    </label>
                    <input
											required
                      className="flex w-full rounded-md border border-purple-500 px-4 py-2 text-purple-500 outline-purple-500 placeholder:text-purple-400"
                      placeholder="Use format YYYY (i.e. 1996)"
                      value={bookDetails.year}
                      onChange={(e) =>
                        setBookDetails((details) => {
                          return {
                            ...details,
                            year: e.target.value,
                          }
                        })
                      }
                      id="year"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="description" className="text-lg text-purple-500">
                      Description
                    </label>
                    <textarea
                      className="flex min-h-40 w-full rounded-md border border-purple-500 px-4 py-2 text-purple-500 outline-purple-500 placeholder:text-purple-400"
                      placeholder="Write 1-2 paragraphs about this book."
                      value={bookDetails.description}
                      onChange={(e) =>
                        setBookDetails((details) => {
                          return {
                            ...details,
                            description: e.target.value,
                          }
                        })
                      }
                      id="description"
                    />
                  </div>
                  <div className="mt-4 mt-auto flex flex-col gap-4">
                    <button
                      disabled={loading}
                      className="shrink-0 rounded-md border border-purple-500 px-4 py-2 text-purple-500 outline-purple-500 hover:bg-purple-500 hover:text-white active:text-purple-200 disabled:border-purple-200 disabled:text-purple-200 disabled:hover:bg-white disabled:hover:text-purple-200"
                      type="submit"
                    >
                      {loading ? "Saving Book..." : "Save Book"}
                    </button>
                    {error && <span className="text-red-500">{error}</span>}
                    {success && <span className="text-green-500">{success}</span>}
                    <button
                      onClick={onClose}
                      className="shrink-0 rounded-md border border-purple-500 px-4 py-2 text-purple-500 outline-purple-500 hover:bg-purple-500 hover:text-white active:text-purple-200 disabled:border-purple-200 disabled:text-purple-200 disabled:hover:bg-white disabled:hover:text-purple-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

Modal.displayName = "Modal"

export default Modal
