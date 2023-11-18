const API = process.env.apiURL;

export const albumAPI = encodeURL([API, '/api/albums']);


function encodeURL(url) {
    return url.join('');
}