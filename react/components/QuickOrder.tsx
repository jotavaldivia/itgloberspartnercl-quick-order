import React, { useState,useEffect } from 'react'
import { /*useMutation*/ useLazyQuery } from 'react-apollo'
//import UPDATE_CART from '../graphql/updateCart.graphql'
import GET_PRODUCT from '../graphql/getProductBySku.graphql'

const QuickOrder = () => {
    const [inputText, setInputText] = useState("")
    const [search, setSearch] = useState("")

    const [getProductData, {data:product}] = useLazyQuery(GET_PRODUCT)
    //const [addToCart] = useMutation(UPDATE_CART)

    const hanlderCharge = (evt: any) => {
        setInputText(evt.target.value)
        console.log(inputText)
    }

    useEffect(()=>{
        console.log("el resultado de mi producto es: ", product, search)

    },[product, search])

    const addProductToCart = () => {
        // ingresar declaración de la mutación
        getProductData({
            variables:{
                sku: inputText
            }
        })
    }
    const searchProduct = (evt: any) => {
        evt.preventDefault()
        if (!inputText) {
            alert("Oiga, ingrese algo")
        } else {
            console.log("buscando....", inputText)
            setSearch(inputText)
            addProductToCart()
            //    setearemos la nusqueda y buscaremos la data del producto
        }

    }
    return (
        <div>

            <h2>Compra rápida vtex</h2>
            <form onSubmit={searchProduct}>
                <label htmlFor="sku">Ingresa el número de sku</label>
                <input id='sku' type="text" onChange={
                    hanlderCharge
                } />
                <input type="submit" value="anadir al carrito" />
            </form>
        </div>
    )
}

export default QuickOrder