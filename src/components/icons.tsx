import { FC } from "react"

export const DownCaretIcon: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M6.414,9H17.586a1,1,0,0,1,.707,1.707l-5.586,5.586a1,1,0,0,1-1.414,0L5.707,10.707A1,1,0,0,1,6.414,9Z" />
    </svg>
  )
}

export const UpCaretIcon: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M6.41,16H17.59a1,1,0,0,0,.7-1.71L12.71,8.71a1,1,0,0,0-1.42,0L5.71,14.29A1,1,0,0,0,6.41,16Z" />
    </svg>
  )
}
