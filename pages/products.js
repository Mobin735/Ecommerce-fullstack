import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import TopArrow from "@/components/TopArrow";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { styled } from "styled-components";


export default function Products({products}) {
    return (
        <>
            <Header />
            <TopArrow />
            <Center>
                <Title>All Products</Title>
                <ProductsGrid products={products} />
            </Center>
            <Footer />
        </>
    );
};

export async function getServerSideProps() {
    await mongooseConnect();
    const products = await Product.find({}, null, {sort:{'_id':-1}})
    return {
        props:{
            products: JSON.parse(JSON.stringify(products)),
        }
    };
};
