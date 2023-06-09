import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
    await mongooseConnect();
    const ids = req.body.ids;
    const data = [];
    // console.log(ids);
    for (const id of ids) {
        const findID = await Product.findOne({ _id: id });
        const exists = data.some((item) => item._id.toString() === findID._id.toString());
        if (!exists) {
            // console.log("Yes, it exists");
            data.push(findID)
        }
    }
    // console.log("api checking",data);
    res.json(data);
};
