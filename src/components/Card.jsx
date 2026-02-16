import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Card = ({ character }) => {
    const { store, dispatch } = useGlobalReducer();
    
    const isFavorite = store.favorites.some(fav => fav.id === character.id);
    
    const handleFavorite = () => {
        if (isFavorite) {
            dispatch({ type: "remove_favorite", payload: character });
        } else {
            dispatch({ type: "add_favorite", payload: character });
        }
    };
    
    const imageUrl = `https://cdn.thesimpsonsapi.com/500/character/${character.id}.webp`
    const occupation = character.occupation || "Ocupación desconocida";
    const age = character.age ? `${character.age} años` : "Edad desconocida";
    
    return (
        <div className="card h-100 shadow-sm">
            <img src={imageUrl} className="card-img-top" alt={character.name}style={{ height: "200px", objectFit: "cover" }}/>
            <div className="card-body">
                <h5 className="card-title mb-3">{character.name}</h5>
                <p className="card-text mb-1"><strong>Ocupación:</strong> {occupation}</p>
                <p className="card-text mb-2"><strong>Edad:</strong> {age}</p>
            </div>
            <div className="card-footer bg-transparent d-flex justify-content-between">
                <Link to={`/character/${character.id}`} className="btn btn-primary btn-sm">
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