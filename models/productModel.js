import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    desc: {
        type: String,
        required: true,
    }
})

const Product = mongoose.model("products", productSchema)

export default Product