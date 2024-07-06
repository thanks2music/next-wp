import axios from "axios";

const repository = axios.create({
    baseURL: 'http://localhost:8002/graphql',
    headers: {
        'Content-Type': 'application/json'
    }
})

const Repository = (query: string, { variables }: Record<string, any> = {}) => {
    const body = {
        query,
        variables
    }
    return {
        getWp() {
            return repository.post('/', body)
        }
    }
}

export default Repository