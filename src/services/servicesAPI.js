const BASE_URL = "https://thesimpsonsapi.com/api";

export const getCharacters = async (dispatch) => {
    try {
        const response = await fetch(`${BASE_URL}/characters`);
        
        if (!response.ok) {
            return;
        }
        
        const data = await response.json();
        dispatch({type: "set_characters", payload: data.results});
    } catch (error) {
        console.error("Error fetching characters:", error);
    }
}

export const getLocations = async (dispatch) => {
    try {
        console.log("Intentando obtener ubicaciones...");
        const response = await fetch(`${BASE_URL}/locations`);
        
        if (!response.ok) {
            console.log("Error en la respuesta:", response.status);
            return;
        }
        
        const data = await response.json();
        console.log("Ubicaciones recibidas:", data);
        
        dispatch({type: "set_locations", payload: data.results});
    } catch (error) {
        console.error("Error fetching locations:", error);
    }
};