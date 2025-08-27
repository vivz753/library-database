import { DownCaretIcon } from "@components/icons"
import useComponentVisible from "@hooks/useComponentVisible"
import clsx from "clsx"
import { FC, KeyboardEvent } from "react"
import { SortOption } from "@schemas/global"

export interface DropdownProps {
  className?: string
  options: SortOption[]
  setOption?: (option: SortOption) => void
  currentOption: SortOption
  outline?: boolean
  border?: boolean
  caretStyle?: "withCircle" | "default"
	id?: string
}

export const Dropdown: FC<React.PropsWithChildren<DropdownProps>> = ({
  className,
  options,
  setOption,
  currentOption,
  outline = true,
  border = true,
  caretStyle = "default",
	id,
}) => {
  const [ref, showOptions, setShowOptions] = useComponentVisible(false)

  const handleOptionSelection = (option: SortOption): void => {
    if (option !== currentOption && setOption) setOption(option)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === " " || e.key === "Enter") {
      // Prevents accidental collapsing when toggling buttons within the component
      if (e.target === e.currentTarget) {
        e.preventDefault()
        toggleOptions()
      }
    }

		// TODO: add up/down arrows for selection
  }

  const toggleOptions = (): void => setShowOptions((show) => !show)

  return (
    <div
      ref={ref}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="button"
      onClick={toggleOptions}
			id={id}
      className={clsx(
        "relative flex h-full max-w-fit items-center rounded-md bg-white px-3",
        border && "border border-purple-500",
        outline && "focus:outline focus:outline-2 focus:outline-purple-500"
      )}
    >
      <div className={clsx(className, "flex flex-row items-center justify-center gap-2")}>
        <span className="select-none font-medium text-purple-500">{currentOption}</span>
        {caretStyle === "withCircle" ? (
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500">
            <DownCaretIcon className={clsx(showOptions && "rotate-180", "h-2 w-2 fill-purple-500")} />
          </span>
        ) : (
          <DownCaretIcon className={clsx(showOptions && "rotate-180", "ml-auto h-6 w-6 fill-purple-500")} />
        )}
      </div>
      {showOptions && (
        <div
          className={clsx(
            "absolute bottom-0 left-0 z-[1] w-full min-w-min translate-y-full flex-col gap-5 rounded-b-md bg-purple-500"
          )}
        >
          {options.map((option, i) => (
            <button
              className="w-full select-none p-2 text-white outline outline-1 outline-purple-500 last:rounded-b-md hover:bg-purple-200 hover:text-purple-400 hover:-outline-offset-1 hover:outline-purple-400"
              key={i}
              onClick={() => handleOptionSelection(option)}
            >
              <span>{option}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
