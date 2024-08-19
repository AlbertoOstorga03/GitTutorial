import './App.css'
import { useState, useEffect } from 'react'
import Products from './Products'
import ProductForm from './ProductForm'

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
        <div className="app-container">
            <h1 className="title">Products CRUD DEMO</h1>
            <ProductForm fetchProducts={fetchProducts} />
            <Products products={products} />
        </div>
    )
}

export default App