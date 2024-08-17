import { useState } from "react"

const ProductForm = ({ fetchProducts }) => {
    const [names, setNames] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = { names }
        const url = "http://127.0.0.1:5000/create_products"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status === 201 || response.status === 200) {
            setNames("")
            fetchProducts() // Recargar la lista de productos
        } else {
            const data = await response.json()
            alert(data.message)
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="names">Name:</label>
                <input type="text" id="names" value={names} onChange={(e) => setNames(e.target.value)} />
            </div>
            <button type="submit">Create Product</button>
        </form>
    )
}

export default ProductForm
