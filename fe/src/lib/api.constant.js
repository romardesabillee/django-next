const API = process.env.apiURL;

export const usersAPI = encodeURL([API, '/api/users/']);
export const loginAPI = encodeURL([usersAPI, 'login/']);

export const albumAPI = encodeURL([API, '/api/albums/']);


function encodeURL(url) {
    return url.join('');
}