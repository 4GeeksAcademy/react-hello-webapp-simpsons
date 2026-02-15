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
    
    // Construir URL de imagen
    const imageUrl = character.image_path 
        ? `https://cdn.thesimpsonsapi.com/300/${character.image_path}`
        : "https://via.placeholder.com/300x400?text=Sin+imagen";
    
    return (
        <div className="card h-100 shadow-sm">
            <img 
                src={imageUrl} 
                className="card-img-top" 
                alt={character.name}
                style={{ height: "250px", objectFit: "cover" }}
                onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x400?text=Error+de+imagen";
                }}
            />
            <div className="card-body">
                <h5 className="card-title">{character.name}</h5>
                {character.description && (
                    <p className="card-text text-muted small">
                        {character.description.substring(0, 80)}...
                    </p>
                )}
            </div>
            <div className="card-footer bg-transparent d-flex justify-content-between">
                <Link to={`/character/${character.id}`} className="btn btn-primary btn-sm">
                    Ver detalles
                </Link>
                <button 
                    onClick={handleFavorite}
                    className={`btn btn-sm ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}
                >
                    <i className={`fas fa-heart ${isFavorite ? '' : 'far'}`}></i>
                    {isFavorite ? ' Quitar' : ' Favorito'}
                </button>
            </div>
        </div>
    );
};