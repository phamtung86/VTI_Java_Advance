const ListType = ({ type , handleChangeFilter}) => {
    return (
        <>
            <div className="filter-title">Type</div>
            <select name="role" id="type" className="filter-select" onChange={handleChangeFilter}>
                <option value="">All</option>
                {type.length > 0 ?
                    type.map((item) => (
                        <option value={item.value}>{item.name}</option>

                    ))
                    : ""}
            </select>
        </>
    );
}
export default ListType;