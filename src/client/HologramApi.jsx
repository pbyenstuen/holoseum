import { post, get } from "./lib/http";

const hologramApi = {
    getHolograms: async () => {
        const response = await get("/holograms");
        return response.json();
    },

    getHologram: async (name) => {
        const response = await get(`/holograms/${name}`);
        return response;
    },
    uploadHologram: async (hologram) => {
        const response = await post("/holograms/upload", {
            method: "POST",
            payload: hologram
        });
        return response.json();
    },
}

export default hologramApi;