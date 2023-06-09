import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Table from "@/components/Table";
import TopArrow from "@/components/TopArrow";
import Input from "@/components/input";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 20px;

    @media screen and (min-width: 992px) {
        grid-template-columns: 1.2fr .8fr;
        gap: 40px;
        margin-top: 40px;
    } 
`;
const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
`;

const ProductInfoCell = styled.td`
    padding: 10px 0;
`;

const ProductImageBox = styled.div`
    width: 100px;
    height: 100px;
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
        max-width: 80px;
        max-height: 80px;
    }
`;

const QuantityLabel = styled.span`
    padding: 0 3px;
`;

const CityHolder = styled.div`
    display: flex;
    gap: 5px;
`;

const InfoCard = styled.div`
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    font-family: 'Poppins',sans-serif;
`;

const Label = styled.span`
    font-size: 1.2rem;
    color: #b8b8b8;
    font-weight: 600;
    text-align: center;
`;

const CardI = styled.label`
    margin-top: 5px;
    font-size: 1rem;
    font-weight: 500;
    color: #b8b8b8;
`;

const DetailC = styled.label`
    margin-top: 5px;
    font-size: .8rem;
    font-weight: 500;
    color: #b8b8b8;
`;

const EmptyCart = styled.div`
    ${props => props.cartProducts ? `
        display: none;
    ` : `
        display: flex;
    `}
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 35px;
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
    font-size: 28px;
    height: 100vh;
`;

export default function CartPage() {
    const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [country, setCountry] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post('/api/cart', { ids: cartProducts }).then(
                response => {
                    setProducts(response.data);
                }
            )
        } else {
            setProducts([]);
        }
    }, [cartProducts])

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        if (window.location.href.includes('success')) {
            setIsSuccess(true);
            clearCart();
        }
    }, [])

    function moreOfThisProduct(id) {
        addProduct(id);
    }

    function lessOfThisProduct(id) {
        removeProduct(id);
    }

    async function goToPayment() {
        const response = await axios.post('/api/checkout', {
            name, email, city, postalCode, streetAddress, country,
            cartProducts,
        })
        if (response.data.url) {
            window.location = response.data.url;
        }
    }

    let arryproducts = [];

    let total = 0;
    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price;
    }

    if (isSuccess) {
        return (
            <>
                <Header />
                <Center>
                    <Box style={{ marginTop: "12px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", color: "green" }}>
                        <h1>Thanks for your Order!</h1>
                        <p>we will email you when your order will be sent.</p>
                    </Box>
                </Center>
                <Footer />
            </>
        )
    }

    return (
        <>
            <Header />
            <TopArrow />
            <Center>
                <EmptyCart cartProducts={cartProducts.length}>
                    {!cartProducts?.length && (
                        <>
                            <div>Your Cart is empty!</div>
                        </>
                    )}
                </EmptyCart>
                <ColumnsWrapper>
                    {cartProducts?.length > 0 && (
                        <Box>
                            <h2>Cart</h2>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {console.log("hello products", products)}
                                    {products.map(product => {
                                        if (arryproducts.includes(product))
                                        {
                                            console.log("yepp");
                                            return;
                                        }
                                        
                                        return (
                                            <tr key={product._id}>
                                                <ProductInfoCell>
                                                    <ProductImageBox>
                                                        <img src={product.images?.[0]?.link} alt="" />
                                                    </ProductImageBox>
                                                    {product.title}
                                                </ProductInfoCell>
                                                <td>
                                                    <Button gray onClick={() => lessOfThisProduct(product._id)}>-</Button>
                                                    <QuantityLabel>
                                                        {cartProducts.filter(id => id === product._id).length}
                                                    </QuantityLabel>
                                                    <Button gray onClick={() => moreOfThisProduct(product._id)}>+</Button>
                                                </td>
                                                <td>
                                                    ${cartProducts.filter(id => id === product._id).length * product.price}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    <tr>
                                        <td>Sub Total:</td>
                                        <td></td>
                                        <td>${total}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Box>
                    )}
                    {!!cartProducts?.length && (
                        <Box>
                            <h2>Order Information</h2>
                            <Input type="text"
                                placeholder="Name"
                                value={name}
                                name="name"
                                onChange={ev => setName(ev.target.value)} />
                            <Input type="text"
                                placeholder="Email"
                                value={email}
                                name="email"
                                onChange={ev => setEmail(ev.target.value)} />
                            <CityHolder>
                                <Input type="text"
                                    placeholder="City"
                                    value={city}
                                    name="city"
                                    onChange={ev => setCity(ev.target.value)} />
                                <Input type="text"
                                    placeholder="Postal Code"
                                    value={postalCode}
                                    name="postalCode"
                                    onChange={ev => setPostalCode(ev.target.value)} />
                            </CityHolder>
                            <Input type="text"
                                placeholder="Street Address"
                                value={streetAddress}
                                name="streetAddress"
                                onChange={ev => setStreetAddress(ev.target.value)} />
                            <Input type="text"
                                placeholder="Country"
                                value={country}
                                name="country"
                                onChange={ev => setCountry(ev.target.value)} />
                            <Button black={1} block={1} onClick={goToPayment}>Continue to Payment</Button>
                            <InfoCard>
                                <Label>Test Credit Card</Label>
                                <CardI>Card Information:</CardI>
                                <DetailC>4242424242424242/12/23/123</DetailC>
                            </InfoCard>
                        </Box>
                    )}
                </ColumnsWrapper>
            </Center>
            <Footer />
        </>
    )
};
