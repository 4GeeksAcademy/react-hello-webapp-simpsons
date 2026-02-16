import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const LocationDetail = () => {
    const { id } = useParams();
    const { store, dispatch } = useGlobalReducer();
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocationDetail = async () => {
            setLoading(true);

            let foundLocation = null;
            if (store.locations && store.locations.length > 0) {
                for (let i = 0; i < store.locations.length; i++) {
                    if (store.locations[i].id === parseInt(id)) {
                        foundLocation = store.locations[i];
                        break;
                    }
                }
            }

            if (foundLocation) {
                setLocation(foundLocation);
            }

            try {
                const response = await fetch(`https://thesimpsonsapi.com/api/locations/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setLocation(prev => ({ ...prev, ...data }));
                }
            } catch (error) {
                console.error("Error fetching location details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchLocationDetail();
        }
    }, [id, store.locations]);

    if (loading) {
        return (
            <div className="container text-center py-5">
                <div className="spinner-border text-success" role="status"></div>
            </div>
        );
    }

    if (!location) {
        return (
            <div className="container text-center py-5">
                <h2>Lugar no encontrado</h2>
                <Link to="/" className="btn btn-primary mt-3">Volver al inicio</Link>
            </div>
        );
    }

    const imageUrl = `https://cdn.thesimpsonsapi.com/500/location/${location.id}.webp`

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-5 mb-4">
                    <img
                        src={imageUrl}
                        className="img-fluid rounded shadow"
                        alt={location.name}
                        style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
                    />
                </div>
                <div className="col-md-7">
                    <h1 className="display-4 mb-4">{location.name}</h1>

                    {location.description && (
                        <div className="mb-4">
                            <h4>Descripción</h4>
                            <p className="lead">{location.description}</p>
                        </div>
                    )}

                    <div className="row mb-4">
                        {location.town && (
                            <div className="col-sm-6 mb-2">
                                <strong>Ciudad:</strong> {location.town}
                            </div>
                        )}

                        {location.use && (
                            <div className="col-sm-6 mb-2">
                                <strong>Uso:</strong> {location.use}
                            </div>
                        )}
                    </div>

                    <div className="d-flex gap-2 mt-4">
                        <button onClick={() => {
                                const isFavorite = store.favorites.some(favorites => favorites.id === location.id);
                                if (isFavorite) {
                                    dispatch({ type: "remove_favorite", payload: location });
                                } else {
                                    dispatch({ type: "add_favorite", payload: location });
                                }
                            }}
                            className={`btn btn-lg ${store.favorites.some(favorites => favorites.id === location.id) ? 'btn-danger' : 'btn-outline-danger'}`}>
                            <i className={`fas fa-heart ${store.favorites.some(f => f.id === location.id) ? '' : 'far'}`}></i>
                            {store.favorites.some(favorites => favorites.id === location.id) ? ' Quitar de favoritos' : ' Añadir a favoritos'}
                        </button>
                        <Link to="/" className="btn btn-lg btn-outline-primary"> Volver al inicio </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};