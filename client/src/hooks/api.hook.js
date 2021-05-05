import {useCallback, useState} from "react"

export const useApi = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const request = useCallback( async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)

        if(body){
            body = JSON.stringify(body)
            headers['Content-Type'] = 'application/json'
        }

        try {
            const response = await fetch(url, { method, body, headers })
            const data = await response.json()

            if(!response.ok){
                throw new Error(data.message || 'Произошла какая-та ошибка')
                setSuccess(false)
            }else if(response.ok){
                setSuccess(true)
            }

            setLoading(false)

            return data
        }catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return { loading, request, error, clearError, success }
}