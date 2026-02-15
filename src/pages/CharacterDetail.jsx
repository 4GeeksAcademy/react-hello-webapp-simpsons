import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"; // ✅ Importación por defecto

export const CharacterDetail = () => {
    const { id } = useParams();
    const { store, dispatch } = useGlobalReducer();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Buscar el personaje en el store
        const foundCharacter = store.characters.find(c => c.id === parseInt(id));
        
        if (foundCharacter) {
            setCharacter(foundCharacter);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [id, store.characters]);

    if (loading) {
        return (
            <div className="container text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (!character) {
        return (
            <div className="container text-center py-5">
                <h2>Personaje no encontrado</h2>
                <Link to="/" className="btn btn-primary mt-3">
                    Volver al inicio
                </Link>
            </div>
        );
    }

    const imageUrl = character.image_path 
        ? `https://cdn.thesimpsonsapi.com/500/${character.image_path}`
        : "https://via.placeholder.com/500x600?text=Sin+imagen";

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-5 mb-4">
                    <img 
                        src={imageUrl} 
                        className="img-fluid rounded shadow" 
                        alt={character.name}
                        style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
                        onError={(e) => {
                            e.target.src = "https://via.placeholder.com/500x600?text=Error+de+imagen";
                        }}
                    />
                </div>
                <div className="col-md-7">
                    <h1 className="display-4 mb-4">{character.name}</h1>
                    
                    {character.description && (
                        <div className="mb-4">
                            <h4>Descripción</h4>
                            <p className="lead">{character.description}</p>
                        </div>
                    )}
                    
                    <div className="d-flex gap-2">
                        <button 
                            onClick={() => {
                                const isFavorite = store.favorites.some(f => f.id === character.id);
                                if (isFavorite) {
                                    dispatch({ type: "remove_favorite", payload: character });
                                } else {
                                    dispatch({ type: "add_favorite", payload: character });
                                }
                            }}
                            className={`btn btn-lg ${store.favorites.some(f => f.id === character.id) ? 'btn-danger' : 'btn-outline-danger'}`}
                        >
                            <i className={`fas fa-heart ${store.favorites.some(f => f.id === character.id) ? '' : 'far'}`}></i>
                            {store.favorites.some(f => f.id === character.id) ? ' Quitar de favoritos' : ' Añadir a favoritos'}
                        </button>
                        <Link to="/" className="btn btn-lg btn-outline-primary">
                            Volver
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};