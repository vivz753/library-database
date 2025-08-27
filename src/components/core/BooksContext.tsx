import { createContext } from 'react';
import { Book, SortOption } from "@schemas/global"

export const BooksContext = createContext<Book[]>([]);
export const BooksDispatchContext = createContext({});