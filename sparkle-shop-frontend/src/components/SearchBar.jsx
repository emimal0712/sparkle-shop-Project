function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div className="glass p-3 mb-4">

      <input
        type="text"
        className="form-control glass-input form-control-lg"
        placeholder="🔍 Search products..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

    </div>
  );
}

export default SearchBar;