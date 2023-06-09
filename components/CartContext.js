import { useEffect, useState } from "react";
import { createContext } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {

    const ls = typeof window !== "undefined" ? window.localStorage : null;
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')));
            console.log("get items from ls",cartProducts)
        }
    }, []);

    useEffect(() => {
        if (cartProducts?.length > 0) {
            ls?.setItem('cart', JSON.stringify(cartProducts));
        }
    }, [cartProducts]);


    function addProduct(ProductId) {
        setCartProducts(prev => {
            const newP = [...prev];
            const index = newP.indexOf(ProductId);
            newP.splice(index + 1, 0, ProductId);
            // newP.push(ProductId)
            return newP;
        });
    }

    async function removeProduct(ProductId) {
        setCartProducts(prev => {
            const updatedCartProducts = [...prev];
            const index = updatedCartProducts.indexOf(ProductId);
            if (index !== -1) {
              updatedCartProducts.splice(index, 1);
            }
            ls?.setItem('cart', JSON.stringify(updatedCartProducts));
            return updatedCartProducts;
          });
    }

    function clearCart() {
        setCartProducts([]);
        ls?.setItem('cart', JSON.stringify(cartProducts));
    }

    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct, removeProduct, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
