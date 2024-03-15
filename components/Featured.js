import { styled } from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/Cart";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Bg = styled.div`
    background-color: #222;
    color: white;
    padding: 50px 0;
`;

const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    font-size: 2.5rem;
    text-align: center;

    @media screen and (min-width: 992px) {
        font-size: 4rem;
        text-align: inherit;
    }
`;

const Desc = styled.p`
    color: #aaa;
    font-size: 0.75rem;
    text-align: center;

    @media screen and (min-width: 992px) {
        font-size: 1rem;
        text-align: inherit;
    }
`;

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    
    gap: 20px;
    img{
        max-width: 100%;
    }

    div:nth-child(1) {
        order: 2;
    }

    @media screen and (min-width: 992px) {
        grid-template-columns: 1.1fr .9fr;
        div:nth-child(1) {
            order: 0;
        }
    }
`;
const Column = styled.div`
    display: flex;
    align-items: center;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 25px;
    justify-content: center;

    .ButtonLink {
        font-size: 14px;
        @media screen and (min-width: 992px) {
            font-size: 19px;
        }
    }
    .ButtonLink:active {
        background-color: #6b6b6b;
        color: white;
    }
    .IconButton {
        font-size: 14px;
        @media screen and (min-width: 992px) {
            font-size: 19px;
        }
    }
    .CartIcon {
        height: 1.2em;
    }

    @media screen and (min-width: 992px) {
        justify-content: flex-start;
    }
`;


export default function Featured({product}) {

    const {addProduct} = useContext(CartContext);
    function addFeaturedToCart() {
        addProduct(product._id);
    }

    return (
        <Bg>
            <Center>
                <ColumnsWrapper>
                    <Column>
                        <div>
                            <Title>{product.title}</Title>
                            <Desc>{product.description}</Desc>
                            <ButtonsWrapper>
                                <ButtonLink className="ButtonLink" href={'/product/'+product._id} outline={1} white={1}>Read more</ButtonLink>
                                <Button className="IconButton" white={1} onClick={addFeaturedToCart}>
                                    <CartIcon className="CartIcon" />
                                    Add to cart
                                </Button>
                            </ButtonsWrapper>
                        </div>
                    </Column>
                    <Column>
                        <img src="https://lh3.google.com/u/0/d/1VjImSmlxN9IFX7gxtHDWWN8uhGFV0Xbs" alt="" />
                    </Column>
                </ColumnsWrapper>

            </Center>
        </Bg>
    )
};
