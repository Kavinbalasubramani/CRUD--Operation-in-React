const SearchContent = ({search, setSearch})=>{
    return(
        <form className="searchForm" onSubmit={(e)=> e.preventDefault()}>
            <label htmlFor="search">Search Content</label>
            <input
            id="search"
            type="text"
            role="searchbox"
            placeholder="seach item"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            />

        </form>
    )
}

export default SearchContent;