import './App.css'
import { useState, useEffect } from 'react'
import Products from './Products'
import ProductForm from './ProductForm'

function App() {
    const [products, setProducts] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentProduct, setCurrentProduct] = useState({})

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        const response = await fetch("http://127.0.0.1:5000/products")
        const data = await response.json()
        setProducts(data)
        console.log(data)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setCurrentProduct({})
    }

    const openCreateModal = () => {
        if (!isModalOpen) {
            setIsModalOpen(true)
        }
    }

    const openEditModal = (product) => {
        if (isModalOpen) return
        setCurrentProduct(product)
        setIsModalOpen(true)
    }

    const onUpdated = () => {
        closeModal()
        fetchProducts()
    }

    return (
        <div className="app-container">
            <h1 className="title">Products CRUD DEMO</h1>
            <button onClick={openCreateModal}>Create New Product</button>
            
            {/* Creating new product form */}
            {
                isModalOpen && (
                    <div className='modal'>
                        <div className='modal-content'>
                            <span className='close' onClick={closeModal}>&times;</span>
                            <ProductForm existingPontact={currentProduct} updateCallback={onUpdated} fetchProducts={fetchProducts} />
                        </div>
                    </div>
                )
            }
            
            {/* Products list */}
            <Products products={products} updateProduct={openEditModal} updateCallback={onUpdated} />

            
        </div>
    )
}

export default App
