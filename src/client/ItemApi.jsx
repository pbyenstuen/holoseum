import { post, postJSON, fetchJSON } from "./lib/http";

const itemApi = {
    getItems: async () => {
        return await fetchJSON("/items");
    },

    getItem: async (name) => {
        return await fetchJSON(`/items/${name}`);
    },
    createItem: async (item) => {
        return await post("/items/create", {
            method: "POST",
            payload: item
        });
    },
}

export default itemApi;