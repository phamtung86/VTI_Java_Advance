const Paging = ({ page, setPage, totalPages }) => {
    const getPaginationItems = () => {
        const paginationItems = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                paginationItems.push(i);
            }
        } else if (page <= 4) {
            paginationItems.push(1, 2, 3, 4, 5, "...", totalPages);
        } else if (page > totalPages - 4) {
            paginationItems.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
            paginationItems.push(1, "...", page - 1, page, page + 1, "...", totalPages);
        }
        return paginationItems;
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };
    return (
        <div id="app" className="container">
                <ul className="page">
                    <li className="page__btn" onClick={handlePreviousPage}>Pre</li>
                    {getPaginationItems().map((item, index) => (
                        <li
                            key={index}
                            className={page === item ? "page__numbers active" : "page__numbers"}
                            onClick={() => typeof item === 'number' && setPage(item)}
                        >
                            {item}
                        </li>
                    ))}
                    <li className="page__btn" onClick={handleNextPage}>Next</li>
                </ul>
            </div>
    )
}
export default Paging;