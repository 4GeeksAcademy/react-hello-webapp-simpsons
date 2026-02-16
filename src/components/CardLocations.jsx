import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const CardLocation = ({ location }) => {
    const { store, dispatch } = useGlobalReducer();
    
    const isFavorite = store.favorites.some(fav => fav.id === location.id);
    
    const handleFavorite = () => {
        if (isFavorite) {
            dispatch({ type: "remove_favorite", payload: location });
        } else {
            dispatch({ type: "add_favorite", payload: location });
        }
    };
    
    const imageUrl = `https://cdn.thesimpsonsapi.com/500/location/${location.id}.webp`
    
    return (
        <div className="card h-100 shadow-sm">
            <img src={imageUrl} className="card-img-top" alt={location.name}style={{ height: "200px", objectFit: "cover" }}/>
            <div className="card-body">
                <h5 className="card-title mb-3">{location.name}</h5>
                <p className="card-text mb-1">
                    <strong>Ciudad:</strong> {location.town || "Desconocida"}
                </p>
                <p className="card-text mb-2">
                    <strong>Uso:</strong> {location.use || "Desconocido"}
                </p>
            </div>
            <div className="card-footer bg-transparent d-flex justify-content-between">
                <Link to={`/location/${location.id}`} className="btn btn-primary btn-sm">
                    expandir
                </Link>
                <button onClick={handleFavorite}
                    className={`btn btn-sm ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}>
                    <i className={`fas fa-heart ${isFavorite ? '' : 'far'}`}></i>
                </button>
            </div>
        </div>
    );
};