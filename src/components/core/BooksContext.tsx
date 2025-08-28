import { createContext } from 'react';
import { Book, BookAction } from "@schemas/global"

export const BooksContext = createContext<Book[]>([]);
export const BooksDispatchContext = createContext<React.Dispatch<BookAction> | undefined>(undefined);