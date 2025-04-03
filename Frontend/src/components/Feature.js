import { faPenToSquare, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SortBy from "./SortBy";

const DISPLAY_ADD = 1;

const Feature = ({ searchTerm, setSearchTerm, setDisplay, sortBy, setSortBy, handleModify, handleDelete, sort, setHandleTypeAction }) => {

    return (
        <div className="account-feature">
            <div className="feature-search">
                <input
                    className="search-text"
                    type="text"
                    placeholder="Enter username"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
            </div>
            <div className="feature-crud">
                <button className="feature-create"
                    onClick={() => {
                        setDisplay(DISPLAY_ADD);
                        setHandleTypeAction("ADD")
                    }}>
                    <FontAwesomeIcon icon={faPlus} /> Add
                </button>
                <button className="feature-update" onClick={handleModify}>
                    <FontAwesomeIcon icon={faPenToSquare} /> Modify
                </button>
                <button className="feature-delete" onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrashCan} /> Delete
                </button>
            </div>
            <SortBy sort={sort} sortBy={sortBy} setSortBy={setSortBy}
            />
        </div>
    );
}
export default Feature;