import type { Dispatch, SetStateAction } from "react"

interface FilterProps {
  search: string
  onlyAvailable: boolean
  setSearch: Dispatch<SetStateAction<string>>
  setOnlyAvailable: Dispatch<SetStateAction<boolean>>
  category: string
  categories: string[]
  setCategory: Dispatch<SetStateAction<string>>
}

const Filter = ({ search, onlyAvailable, setSearch, setOnlyAvailable, category, categories, setCategory }: FilterProps) => {
  return (
    <form role="search" aria-label="Menu filters" className='flex items-center gap-5 mt-6' onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-1">
        <label htmlFor="menu-search" className="sr-only">Search menu</label>
        <input
          id="menu-search"
          type="text"
          placeholder="Search"
          className="border rounded px-6 py-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="category" className="sr-only">Category</label>
        <select
          id="category"
          className="border rounded px-6 py-1"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <label htmlFor="only-available" className="flex items-center gap-2 cursor-pointer">
        <input
          id="only-available"
          type="checkbox"
          checked={onlyAvailable}
          onChange={() => setOnlyAvailable((prev) => !prev)}
        />
        Only available
      </label>

    </form>
  )
}

export default Filter