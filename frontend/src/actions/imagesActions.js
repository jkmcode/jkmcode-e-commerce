import axios from 'axios'

import {

    PRODUCT_LIST_IMAGES_REQUEST,
    PRODUCT_LIST_IMAGES_SUCCESS,
    PRODUCT_LIST_IMAGES_FAIL,

} from '../constants/productsConstants'



export const listProductImages = (productId) => async(dispatch) => {
    
    try {
        dispatch({ type: PRODUCT_LIST_IMAGES_REQUEST })
        console.log('product_id', productId)
        const { data } = await axios.get(`/api/products/images/${productId}`)
        console.log('ImagesAcrion', data)

        dispatch({
            type: PRODUCT_LIST_IMAGES_SUCCESS,
            payload: data
        })
    } catch(error){
        dispatch({
            type: PRODUCT_LIST_IMAGES_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })

    }
}
