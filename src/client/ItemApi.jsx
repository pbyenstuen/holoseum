import { fetchJSON } from "./lib/http";

const itemApi = {
    getItems: async () => {
        return await fetchJSON("/items");
    },

    getItem: async (name) => {
        return await fetchJSON(`/items/${name}`);
    },
};

export default itemApi;