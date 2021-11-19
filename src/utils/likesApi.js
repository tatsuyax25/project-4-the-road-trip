import tokenService from "./tokenService";

const BASE_URL = "/api/likes/";

export function create(id) {
    console.log(id, "<- this is my like")
    return fetch(`${BASE_URL}${id}`, {
        method: "GET",
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken(),
        },
    }).then((res) => {
        console.log(res, "my response")
        if (res.ok) return res.json();
        throw new Error(res);
    }).catch(err => {
        console.log(err)
        return err.message
    });
}

export function removeLike(id) {
    return fetch(`${BASE_URL}${id}`, {
        method: "DELETE",
        headers: {
            Authorization: 'Bearer ' + tokenService.getToken(),
        },
    }).then((res) => {
        if (res.ok) return res.json();
        throw new Error("Login to remove a like");
    });
}