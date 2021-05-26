import { post, get } from "./lib/http";

const api = { 
    holo: {
        uploadHologram: async (hologram) => {
            const response = await post("/holograms/upload", {
                method: "POST",
                payload: hologram
            });
            return response.json();
        },

        getHolograms: async () => {
            const response = await get("/holograms");
            return response.json();
        },

        deleteHologram: async (name) => {
            const response = await post(`/holograms/${name}`, {
                method: "DELETE",
                payload: JSON.stringify(name),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return response.json();
        },

        getHologram: async (name) => {
            const response = await get(`/holograms/${name}`);
            return response;
        }
    },

    auth: {
        logIn: async (credentials) => {
            const response = await post("/auth/login", {
                method: "POST",
                payload: JSON.stringify(credentials),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return response;
        },

        logOut: async () => {
            return await post("/auth/logout", {
                method: "POST",
            });
        },

        getUser: async () => {
            const response = await get("/auth/user");
            return response.status === 401 ? undefined : response.json();
        },
    }
}

export default api;