import request from "../utils/request";

export function getInitData(data){
    return request({
        url: "/admin/getInitData",
        method: "POST",
        data
    })
} 

export function getUserList(data){
    return request({
        url: "/admin/getUserList",
        method: "POST",
        data
    })
}

export function addUser(data){
    return request({
        url: "/admin/addUser",
        method: "POST",
        data
    })
}

export function pullBlack(data){
    return request({
        url: "/admin/pullBlack",
        method: "POST",
        data
    })
}

export function updateIntegral(data){
    return request({
        url: "/admin/updateIntegral",
        method: "POST",
        data
    })
}

export function taskList(data){
    return request({
        url: "/admin/taskList",
        method: "POST",
        data
    })
}

export function countByNewType(data){
    return request({
        url: "/admin/countByNewType",
        method: "POST",
        data
    })
}
export function getRichText(data){
    return request({
        url: "/user/getRichText",
        method: "POST",
        data
    })
}

export function updateRichText(data){
    return request({
        url: "/admin/updateRichText",
        method: "POST",
        data
    })
}

export function findFeedback(data){
    return request({
        url: "/admin/findFeedback",
        method: "POST",
        data
    })
}

export function deleteFeedback(data){
    return request({
        url: "/admin/deleteFeedback",
        method: "POST",
        data
    })
}