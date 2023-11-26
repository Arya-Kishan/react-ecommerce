import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchData = async () => {
    let { data } = await axios.get('https://dummyjson.com/products/1')
    console.log(data)
    return data
}

export const useQueryApi = (endpoint, id) => {
    return useQuery({
        queryKey: ["data", endpoint, id],
        queryFn: fetchData,
    })
}
