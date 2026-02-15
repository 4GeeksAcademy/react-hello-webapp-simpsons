const BASE_URL = "https://thesimpsonsapi.com/api";

export const getCharacters = async (dispatch) => {
    try {
        const response = await fetch(`${BASE_URL}/characters?limit=20`);
        
        if (!response.ok) {
            console.log("Hubo un error en la respuesta");
            return;
        }
        
        const data = await response.json();
        dispatch({type: "set_characters", payload: data});
    } catch (error) {
        console.error("Error fetching characters:", error);
    }
}