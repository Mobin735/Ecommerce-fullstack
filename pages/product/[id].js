import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import CartIcon from "@/components/icons/Cart";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext } from "react";
import { styled } from "styled-components";

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 40px;

    @media screen and (min-width: 992px) {
        grid-template-columns: .6fr 1.2fr;
        gap: 40px;
    }
`;

const PriceRow = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
`;

export default function ProductPage({product}) {
    const {addProduct} = useContext(CartContext);
    return (
        <>
            <Header/>
            <Center>
                <ColWrapper>
                    <div style={{backgroundColor:"#fff",borderRadius:"10px",padding:"30px",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                        <ProductImages images={product.images} />
                    </div>
                    <div>
                        <Title>{product?.title}</Title>
                        <p>{product.description}</p>
                        <PriceRow>
                            <div style={{fontSize:"1.4rem",fontWeight:"600"}}>
                                ${product.price}
                            </div>
                            <div>
                                <Button primary={1} onClick={() => addProduct(product._id)}><CartIcon/>Add to cart</Button>
                            </div>
                        </PriceRow>
                    </div>
                </ColWrapper>
            </Center>
            <Footer />
        </>
    )
};


export async function getServerSideProps(context) {
    await mongooseConnect();
    const {id} = context.query;
    const product = await Product.findById(id);
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        }
    }
}