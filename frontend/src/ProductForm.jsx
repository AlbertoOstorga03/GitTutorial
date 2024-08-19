import { useState } from "react"

const ProductForm = ({ existingProduct = {}, updateCallback}) => {
    const [names, setNames] = useState(existingProduct.names || "")

    const updating = Object.entries(existingProduct).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(existingProduct)

        const data = { names }
        const url = "http://127.0.0.1:5000/" + (updating ? `update_products/${existingProduct.id}` : "create_products")
        const options = {
            method: updating ? "PATCH": "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status === 201 || response.status === 200) {
            setNames("")
            updateCallback() // Reload products
            const data = await response.json()
            alert(data.message)
        } else {
            alert("An error occurred")
        }
    }

    return (
        <div className="form-container">
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="names">Insert the product name:</label>
                <input type="text" id="names" value={names} onChange={(e) => setNames(e.target.value)} />
            </div>
            <button type="submit" className="button">{updating ? "Update": "Create"}</button>
        </form>
    </div>
    )
}

export default ProductForm
