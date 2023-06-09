import { styled } from "styled-components"
import Button from "./Button";
import CartIcon from "./icons/Cart";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const ProductWrapper = styled.div`
    
`;

const WhiteBox = styled(Link)`
    background-color: white;
    padding: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    img{
        width: 100%;
        aspect-ratio: 3/2;
        object-fit: contain;
    }
`;

const Title = styled(Link)`
    font-weight: normal;
    font-size: .9rem;
    margin: 0;
    color: inherit;
    text-decoration: none;
`;

const ProductInfoBox = styled.div`
    margin-top: 5px;
`;

const PriceRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2px;

    .CartButton {
        font-size: 0;
        @media screen and (min-width: 992px) {
          font-size: 20px;
        }
    }
`;

const Price = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
`;

export default function ProductBox({ _id, title, description, price, images }) {
    const {addProduct} = useContext(CartContext);
    const url = '/product/'+_id;
    return (
        <ProductWrapper>
            <WhiteBox href={url}>
                <img src={images?.[0].link} alt=""/>
            </WhiteBox>
            <ProductInfoBox>
                <Title href={url}>
                    {title}
                </Title>
                <PriceRow>
                    <Price>
                        ${price}
                    </Price>
                    <Button className="CartButton" onClick={() => addProduct(_id)} primary={1} outline={1}><CartIcon />Add to cart</Button>
                </PriceRow>
            </ProductInfoBox>
        </ProductWrapper>
    );
};
