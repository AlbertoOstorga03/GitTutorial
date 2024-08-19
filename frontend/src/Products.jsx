import React from "react"

const Products = ({ products, updateProduct, updateCallback }) => {
    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const respone = await fetch(`http://127.0.0.1:5000/delete_products/${id}`, options)
            if (response.status === 200) {
                updateCallback()
                alert("Product deleted successfully")
            } else {
                alert("An error occurred")
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div>
            <h2>Products List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Product name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.names}</td>
                            <td>
                                <button onClick={() => updateProduct(product)}>Update</button>
                                <button onClick={() => onDelete(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Products
