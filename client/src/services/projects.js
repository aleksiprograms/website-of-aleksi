import axios from 'axios';

let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
}

const getAll = async () => {
    const response = await axios.get('/api/projects');
    return response.data;
}

const create = async (project) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post('/api/projects', project, config);
    return response.data;
}

const update = async (project) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.put(`${'/api/projects'}/${project.id}`, project, config);
    return response.data;
}

const remove = async (project) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.delete(`${'/api/projects'}/${project.id}`, config);
    return response.data;
}

export default { getAll, create, update, remove, setToken };