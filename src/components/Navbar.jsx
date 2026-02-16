import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState } from "react";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();
    const [showDropdown, setShowDropdown] = useState(false);

    const getLinkPath = (item) => {
        const esUnLugar = item.use !== undefined || item.town !== undefined;
        if (esUnLugar) {
            return `/location/${item.id}`;
        } else {
            return `/character/${item.id}`;
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-warning">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/The_Simpsons_yellow_logo.svg/1280px-The_Simpsons_yellow_logo.svg.png" height="40" className="me-2" />
                </Link>
                <div className="ms-auto d-flex">
                    <div className="dropdown me-3">
                        <button className="btn btn-outline-danger dropdown-toggle" type="button" onClick={() => setShowDropdown(!showDropdown)}>
                            <i className="fas fa-heart me-2"></i>
                            Favoritos ({store.favorites.length})
                        </button>
                        {showDropdown && (
                            <ul className="dropdown-menu show" style={{ position: 'absolute', right: 0, left: 'auto' }}>
                                {store.favorites.length > 0 ? (
                                    store.favorites.map(fav => (
                                        <li key={fav.id} className="d-flex align-items-center px-2 py-1">
                                            <Link to={getLinkPath(fav)} className="dropdown-item" onClick={() => setShowDropdown(false)}>
                                                {fav.name}
                                            </Link>
                                            <button className="btn btn-sm btn-link text-danger"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    dispatch({ type: "remove_favorite", payload: fav });
                                                }}>
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <li className="dropdown-item text-muted">Sin favoritos</li>
                                )}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};