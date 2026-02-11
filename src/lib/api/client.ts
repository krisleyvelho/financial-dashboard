import axios, { AxiosRequestConfig } from 'axios'

export const AXIOS_INSTANCE = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

// Interceptor para adicionar headers customizados
AXIOS_INSTANCE.interceptors.request.use(
  (config) => {
    // Aqui você pode adicionar tokens, headers customizados, etc
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para tratamento de erros
AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tratamento global de erros
    if (error.response?.status === 401) {
      // Redirecionar para login, por exemplo
      console.error('Unauthorized')
    }
    return Promise.reject(error)
  }
)

// Custom instance usado pelo Orval
export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = axios.CancelToken.source()

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data)

  // @ts-expect-error - CancelToken.source() não retorna um tipo de Promise
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }

  return promise
}

export default customInstance
