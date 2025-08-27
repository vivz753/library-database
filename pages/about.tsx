import Link from "next/link"
import type { NextPage } from "next"
import Rainbow from "@components/core/Rainbow"

const About: NextPage = () => {
  return (
    <div className="flex h-[50vh] flex-col items-center justify-center p-4 text-purple-500 lg:h-[70vh]">
      <div className="flex flex-col items-center gap-4 rounded-md border border-purple-500 px-4 py-8 lg:w-1/2 lg:p-12">
        <Rainbow />
        <span className="text-center">
          {`This webapp was built by Vivian Leung on May 20, 2025 for XTIVIA's Web Developer take home coding challenge. It was built using Next.js, Tailwind CSS, and `}
          <Link className="underline" href="https://openlibrary.org/developers/api">
            Open Library's API
          </Link>
        </span>
      </div>
    </div>
  )
}

export default About
