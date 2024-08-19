from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="D3M0.@",
    database="demo"
)

cursor = db.cursor()

@app.route('/products', methods=['GET'])
def list_products():
    cursor.execute("SELECT names FROM products")
    products = cursor.fetchall()
    
    list_products = []
    for product in products:
        list_products.append({
            "names": product[0],
        })
    
    return jsonify(list_products), 200

@app.route('/create_products', methods=['POST'])
def add_products():
    data = request.get_json()
    print("Received data")
    try:
        cursor.execute("INSERT INTO products (names) VALUES (%s)", (data["names"],))
        db.commit()
        print (data["names"])
        return jsonify({"message": "Product added"}), 201
    except mysql.connector.Error as err:
        return jsonify({"message": f"Error: {err}"}), 500

@app.route('/update_products/<int:id>', methods=['PUT'])
def edit_products(id):
    data = request.get_json()
    try:
        cursor.execute("UPDATE products SET names=%s WHERE id=%s", (data["names"], id))
        db.commit()
        return jsonify({"message": "Products updated"}), 201
    except mysql.connector.Error as err:
        return jsonify({"message": f"Error: {err}"}), 500

@app.route('/delete_products/<int:id>', methods=['DELETE'])
def delete_products(id):
    try:
        cursor.execute("DELETE FROM products WHERE id=%s", (id,))
        db.commit()
        return jsonify({"message": "Product deleted"}), 201
    except mysql.connector.Error as err:
        return jsonify({"message": f"Error: {err}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
