const SortBy = ({ sort, sortBy, setSortBy }) => {
    return (
        <select
            className="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)} // Cập nhật sortBy
        >
            {
                sort.map((item) => (
                    <option value={item.value}>{item.name}</option>
                ))
            }
        </select>
    );
}
export default SortBy;