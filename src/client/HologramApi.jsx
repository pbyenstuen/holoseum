import { post, get } from "./lib/http";

const hologramApi = {
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
}

export default hologramApi;