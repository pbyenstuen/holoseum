import { fetchJSON } from "./lib/http";

const itemApi = {
    getItems: async () => {
        return await fetchJSON("/items");
    },

    getItem: async (id) => {
        return await fetchJSON(`/items/${id}`);
    },
};

export default itemApi;