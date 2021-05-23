import { post, postJSON, fetchJSON } from "./lib/http";

const hologramApi = {
    getHolograms: async () => {
        return await fetchJSON("/holograms");
    },

    getHologram: async (name) => {
        return await fetchJSON(`/holograms/${name}`);
    },
    uploadHologram: async (hologram) => {
        return await post("/holograms/upload", {
            method: "POST",
            payload: hologram
        });
    },
}

export default hologramApi;