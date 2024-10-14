import Product from "../models/productModel.js";
import { v4 as uuidv4 } from "uuid";

export const postProduct = async (req, res) => {
    try {
    const { name, image, desc } = req.body;

    const uuid = uuidv4();

    const newData = new Product ({
        productId: uuid,
        name,
        image,
        desc
    })

    await newData.save();

    res.status(201).json({
        "Messages" : "User berhasil di post",
        newData
    });
} catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in postUser: ", err.message);
}
}