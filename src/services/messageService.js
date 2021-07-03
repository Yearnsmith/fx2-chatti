import chattiAPI from '../config/api'

export async function getMessages(){
    //axios 'calls' are .get, .post, ...etc.
    const response = await chattiAPI.get("/api/messages")
    return response.data
}

export async function getMessageById(id){
    const response = await chattiAPI.get(`/api/messages/${id}`)
    return response.data
}

export async function getMessagesByUser(username){
    const response = await chattiAPI.get(`/api/messages/?username=${username}`)
    return response.data
}

export async function createMessage(data){
    const response = await chattiAPI.post("/api/messages", data)
    return response.data
}

export async function deleteMessage(id){
    const response = await chattiAPI.delete(`/api/messages/${id}`)
    return response
}