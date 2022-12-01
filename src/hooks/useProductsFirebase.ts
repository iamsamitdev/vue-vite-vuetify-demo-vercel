import { onMounted } from 'vue'
import { db } from '../plugins/firebase'

// Fetch Products
const fetchProducts = (products: any, count: any) => {
    onMounted(() => {
        db.collection("products")
        .orderBy('created_at', 'desc')
        .onSnapshot((querySnapshot) => {
            products.value = []
            querySnapshot.forEach((doc) => {
                products.push(doc.data()) 
                // console.log(products.value[0])
            })
        })
        
        // Count new product
        db.collection("product_counts")
        .onSnapshot((querySnapshot) => {
            count.value = querySnapshot.docs[0].data()
            // console.log(count.value.total)
        })
    })
}


// Add new Product
const addProduct = (product: any, count: any) => {
    db.collection("products")
    .add({
        id: "",
        name: product.value.name,
        price: product.value.price,
        created_at: Date.now(),
        
    })
    .then(function(docref) {
        console.log(docref.id)
        db.collection("products")
        .doc(docref.id)
        .update({ id: docref.id })
    })
    product.value.name = ""
    product.value.price = ""

    // update store count
    // store.count += 1
    db.collection("product_counts")
    .doc('p_count')
    .update({
        total: count.value.total + 1,
    })
}

// Update Product
const updateProduct = (product: any, productTemp:any, updateState: any, dialog: any) => {
    let p = product.value
    // console.log(p)
    db.collection("products")
    .doc(productTemp.value.id)
    .update({
        name: p.name,
        price: p.price
    })
    
    product.value.name = ""
    product.value.price = ""

    // Update State
    updateState.value = false

    // Close Dialog
    dialog.value = false
}

// Delete Product
const deleteProduct = (product_id: any, dialog_delete: any) => {
    db.collection("products")
    .doc(product_id.value)
    .delete();

    // close delete dialog
    dialog_delete.value = false
}

export default { fetchProducts, addProduct, updateProduct ,deleteProduct }