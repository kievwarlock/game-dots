export const API_ENDPOINT = 'https://starnavi-frontend-test-task.herokuapp.com';

export const ApiService = {
    async get(slug = "") {
        const response = await fetch(`${API_ENDPOINT}/${slug}`, {
            method: "GET",
            headers: {
                Accept: 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`ApiService failed, HTTP status ${response.status}`);
        }

        return await response.json();
    },
    post(url: string, params: {}, headers = {}) {
    },
};