import { fetchJSON, postJSON } from "./lib/http";

const itemApi = {
    getItems: async () => {
        return await fetchJSON("/items");
    },

    getItem: async (name) => {
        return await fetchJSON(`/items/${name}`);
    },
    createItem: async (item) => {
        return await postJSON("/items/create", {
            method: "POST",
            payload: item
        });
    },
}

export default itemApi;