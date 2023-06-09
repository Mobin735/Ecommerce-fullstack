import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req,res) {
    const {Squery} = req.body;
        await mongooseConnect();

        const relatedSearch = await Product.find({title: { $regex: `^${Squery}`, $options: 'i' }}).select('title');
    
        res.json(relatedSearch);
};
