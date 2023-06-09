import { CartContextProvider } from "@/components/CartContext";
import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  body{
    background-color: #cacaca;
    padding:0;
    margin:0;
    font-family: 'Poppins', sans-serif;
    -webkit-tap-highlight-color: transparent !important;
  }

  body::-webkit-scrollbar {
  display: none;
}

`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  )
}
