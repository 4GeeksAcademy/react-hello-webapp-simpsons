import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { getCharacters } from "../services/servicesAPI.js";
import { Card } from "../components/Card.jsx";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        getCharacters(dispatch);
    }, []);

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Personajes de Los Simpson</h1>
                <span className="badge bg-primary">
                    {store.characters.length} personajes
                </span>
            </div>
            
            <div className="row g-4">
                {store.characters.length > 0 ? (
                    store.characters.map(character => (
                        <div className="col-sm-6 col-md-4 col-lg-3" key={character.id}>
                            <Card character={character} />
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                        <p className="mt-3">Cargando personajes...</p>
                    </div>
                )}
            </div>
        </div>
    );
};
