import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { getCharacters, getLocations } from "../services/servicesAPI.js";
import { Card } from "../components/Card.jsx";
import { CardLocation } from "../components/CardLocations.jsx";
import { Carousel } from "../components/Carousel.jsx";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        getCharacters(dispatch);
        getLocations(dispatch);
    }, []);

    return (
        <div className="container py-4">
            <div className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>Personajes de Los Simpson</h1>
                </div>
                <Carousel 
                    items={store.characters}
                    itemsPerSlide={4}
                    renderItem={(character) => <Card character={character} />}
                />
            </div>

            <div className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>Lugares de Springfield</h1>
                </div>
                <Carousel 
                    items={store.locations || []}
                    itemsPerSlide={4}
                    renderItem={(location) => <CardLocation location={location} />}
                />
            </div>
        </div>
    );
};