import { useEffect, useState } from "react"
import { CiSearch } from "react-icons/ci";

export default function SearchBar({ onSearch }) {

    const [query, setQuery] = useState("")

    useEffect(() => {
        onSearch(query);
    }, [query]);

    return (
        <form className="flex gap-2 justify-center">
            <input
                type="text"
                placeholder="Film ara"
                value={query}
                onChange={(e) => { setQuery(e.target.value) }}
                className="p-2 rounded-l-xl border-l border-r-0 focus:outline-none hover:scale-105 transition-all duration-300"
            />
            <button type="submit" className="p-2 rounded-r-xl border-r text-2xl cursor-pointer hover:scale-105 transition-all duration-300">
                <CiSearch />
            </button>
        </form>
    )
}
