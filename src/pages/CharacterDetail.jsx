import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const CharacterDetail = () => {
    const { id } = useParams();
    const { store, dispatch } = useGlobalReducer();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharacterDetail = async () => {
            setLoading(true);
            let foundCharacter = store.characters.find(c => c.id === parseInt(id));
            
            if (foundCharacter) {
                setCharacter(foundCharacter);
            }
            try {
                const response = await fetch(`https://thesimpsonsapi.com/api/characters/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setCharacter(prev => ({ ...prev, ...data }));
                }
            } catch (error) {
                console.error("Error fetching character details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCharacterDetail();
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
                <Link to="/" className="btn btn-primary mt-3">Volver al inicio</Link>
            </div>
        );
    }

    const imageUrl = `https://cdn.thesimpsonsapi.com/500/character/${character.id}.webp`

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-5 mb-4">
                    <img 
                        src={imageUrl} 
                        className="img-fluid rounded shadow" 
                        alt={character.name}
                        style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
                    />
                </div>
                <div className="col-md-7">
                    <h1 className="display-4 mb-4">{character.name}</h1>
                    {character.description && (
                        <div className="mb-4">
                            <h4>Descripcion</h4>
                            <p className="lead">{character.description}</p>
                        </div>
                    )}
                    <div className="row mb-4">
                        {character.occupation && (
                            <div className="col-sm-6 mb-2">
                                <strong>Ocupacion:</strong> {character.occupation}
                            </div>
                        )}
                        
                        {character.age && (
                            <div className="col-sm-6 mb-2">
                                <strong>Edad:</strong> {character.age} años
                            </div>
                        )}
                        
                        {character.gender && (
                            <div className="col-sm-6 mb-2">
                                <strong>Genero:</strong> {character.gender}
                            </div>
                        )}
                        
                        {character.status && (
                            <div className="col-sm-6 mb-2">
                                <strong>Estado:</strong> {character.status}
                            </div>
                        )}  
                    </div>

                    <div className="d-flex gap-2 mt-4">
                        <button onClick={() => {
                            const isFavorite = store.favorites.some(favorites => favorites.id === character.id);
                                if (isFavorite) {
                                    dispatch({ type: "remove_favorite", payload: character });
                                } else {
                                    dispatch({ type: "add_favorite", payload: character });
                                }
                            }}
                            className={`btn btn-lg ${store.favorites.some(favorites => favorites.id === character.id) ? 'btn-danger' : 'btn-outline-danger'}`}>
                            <i className={`fas fa-heart ${store.favorites.some(favorites => favorites.id === character.id) ? '' : 'far'}`}></i>
                            {store.favorites.some(favorites => favorites.id === character.id) ? ' Quitar de favoritos' : ' Añadir a favoritos'}
                        </button>
                        <Link to="/" className="btn btn-lg btn-outline-primary"> Home </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};