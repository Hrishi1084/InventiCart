import { useAuthContext } from './useAuthContext'
import { useProductsContext } from './useProductsContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: productsDispatch } = useProductsContext()
    const logout = () => {
        localStorage.removeItem('user')
        dispatch({ type: 'LOGOUT' })
        productsDispatch({ type: 'SET_PRODUCTS', payload: null })
    }
    return { logout }
}