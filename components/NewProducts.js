import styled from "styled-components"
import Center from "./Center";
import ProductBox from "./ProductBox";
import ProductsGrid from "./ProductsGrid";

const Title = styled.h2`
    font-size: 2rem;
    margin: 30px 0 20px;
    font-weight: 700;
    border-bottom: 1px solid #737373;
    width: fit-content;
    padding-bottom: 5px;
    padding-right: 20px;
`;

export default function NewProducts({products}) {
    return (
        <Center>
            <Title>New Arrivals</Title>
            <ProductsGrid products={products} />
        </Center>
    )
};
