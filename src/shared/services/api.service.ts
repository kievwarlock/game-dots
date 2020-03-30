import {API_ENDPOINT} from "@/shared/services/api.config";


export const ApiService = {
    async get(slug: string) {
        const response = await fetch(`${API_ENDPOINT}/${slug}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error(`ApiService failed, HTTP status ${response.status}`);
        }

        return await response.json();
    },
    async post(slug: string, params: {}) {
        const response = await fetch(`${API_ENDPOINT}/${slug}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        });
        if (!response.ok) {
            throw new Error(`ApiService failed, HTTP status ${response.status}`);
        }

        return await response.json();
    },
};