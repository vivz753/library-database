import Link from "next/link"
import { FaGithub } from "react-icons/fa"
import { MdOutlineMailOutline } from "react-icons/md"
import { FC } from "react"

type NavigationLink = {
  name: string
  url: string
}

const labels: NavigationLink[] = [
  { name: "library", url: "/" },
  { name: "about", url: "/about" },
]

const Header: FC = () => {
  return (
    <header className="absolute top-0 flex h-[72px] w-full flex-row items-center gap-5 bg-violet-500 p-10">
      {labels.map((label, i) => (
        <Link key={i} href={label.url}>
          <span className="mx-4 rounded-xl text-white hover:text-violet-900">{label.name}</span>
        </Link>
      ))}
    </header>
  )
}

const Footer: FC = () => {
  return (
    <footer className="absolute bottom-0 flex h-24 w-full flex-col items-center justify-center gap-4 bg-violet-500 md:flex-row lg:gap-8 lg:p-10">
      <Link href="mailto:vivz753@gmail.com">
        <div className="group flex flex-row items-center gap-2">
          <MdOutlineMailOutline className="h-6 w-6 text-white group-hover:text-violet-800 md:h-8 md:w-8" />
          <span className="text-white group-hover:text-violet-800">vivz753@gmail.com</span>
        </div>
      </Link>
      <Link href="https://github.com/vivz753">
        <div className="group flex flex-row items-center gap-2">
          <FaGithub className="h-6 w-6 text-white group-hover:text-violet-800 md:h-8 md:w-8" />
          <span className="text-white group-hover:text-violet-800">vivz753</span>
        </div>
      </Link>
    </footer>
  )
}

const Layout: FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="max-w-screen relative flex min-h-screen flex-grow flex-col justify-center">
      <Header />
      <Footer />
      <div className="h-full min-h-screen w-full pb-24 pt-[80px]">{children}</div>
    </div>
  )
}

export default Layout
