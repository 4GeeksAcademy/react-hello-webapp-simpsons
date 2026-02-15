export const initialStore = () => {
    return {
        message: null,
        todos: [
            {
                id: 1,
                title: "Make the bed",
                background: null,
            },
            {
                id: 2,
                title: "Do my homework",
                background: null,
            }
        ],
        characters: [],
        favorites: [] 
    }
}

export default function storeReducer(store, action = {}) {
    switch (action.type) {
        case 'add_task':
            const { id, color } = action.payload;
            return {
                ...store,
                todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
            };
        case 'set_characters':
            return {
                ...store,
                characters: action.payload
            };
        case 'add_favorite':
            // Verificar si ya existe para no duplicar
            if (store.favorites.some(fav => fav.id === action.payload.id)) {
                return store;
            }
            return {
                ...store,
                favorites: [...store.favorites, action.payload]
            };
        case 'remove_favorite':
            return {
                ...store,
                favorites: store.favorites.filter(fav => fav.id !== action.payload.id)
            };
        default:
            throw Error('Unknown action.');
    }
}