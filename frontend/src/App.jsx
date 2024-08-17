import { useState, useEffect } from 'react'
import Products from './Products'
import ProductForm from './ProductForm'
import './App.css'

function App() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        const response = await fetch("http://127.0.0.1:5000/products")
        const data = await response.json()
        setProducts(data)
        console.log(data)
    }

    return (
        <>
            <Products products={products} />
            <ProductForm fetchProducts={fetchProducts} />
        </>
    )
}

export default App
