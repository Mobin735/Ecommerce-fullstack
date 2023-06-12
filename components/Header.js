import Link from "next/link";
import styled, { keyframes } from "styled-components";
import Center from "./Center";
import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/Bars";
import axios from "axios";
import CrossIcon from "./icons/Cross";

const StyledHeader = styled.header`
    background-color: #222;
`;

const Logo = styled(Link)`
    font-weight: 900;
    color:#fff;
    text-decoration:none;
    position: relative;
    z-index: 3;
    font-family: 'Satisfy', cursive;
    font-size: 2.1rem;
`;

const Wrapper = styled.div`
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding: 25px 0;
    font-size: 20px;
`;

const NavLink = styled(Link)`
    display: block;
    color:#aaa;
    text-decoration:none;
`;



const StyleNav = styled.nav`
   
   margin-left: ${props => (props.mobileNavActive ? "0%" : "150%")};
   transition: margin-left 0.5s ease-in-out;
   ${NavLink} {
    opacity: ${props => (props.mobileNavActive ? "1" : "0")};
    transition: opacity 0.15s ease-in-out ${props => (props.mobileNavActive ? "0.3s" : "0.1s")};
   }

   ${NavLink}:hover {
    color: white;
   }
   
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 81px;
  font-size: 30px;
  gap: 25px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 50px 20px 20px;
  background-color: #222;
  

    @media screen and (min-width: 992px) {
        display: flex;
        position: static;
        padding: 0;
        justify-content: center;
        align-items: center;
        margin-left: 0%;
        margin-top: 0;
        flex-direction: row;
        font-size: 24px;

        ${NavLink} {
            opacity: 1;
        }
    }
`;

const NaVButton = styled.button`
    background-color: transparent;
    width: 5em;
    height: fit-content;
    display: flex;
    border: 0;
    color: white;
    cursor: pointer;
    position: relative;
    z-index: 3;
    @media screen and (min-width: 992px) {
        display: none;
    }

    .bars-icon {
        color: #ffacac;
        opacity: ${props => (props.mobileNavActive ? "0" : "1")};
        width: ${props => (props.mobileNavActive ? "0" : "auto")};
        transition: opacity 0.5s ease-in-out, width 0.5s ease-in-out;
    }

    .cross-icon {
        color: #ffacac;
        box-shadow: none !important;
        -webkit-tap-highlight-color: transparent;
        outline: none;
        user-select: none;
        opacity: ${props => (props.mobileNavActive ? "1" : "0")};
        width: ${props => (props.mobileNavActive ? "auto" : "0")};
        transition: opacity 0.5s ease-in-out, width 0.5s ease-in-out;
    }
    transition: display 0.5s ease-in-out;
`;

const slideInAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const slideOutAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const SearchContainer = styled.div`
    background-color: transparent;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    width: 100%;
    align-items: end;

    @media screen and (min-width: 992px) {
        width: fit-content;
        align-items: baseline;
    }    

    input{
        ${props => props.showInput ? `
            width: 7rem;
            z-index: 1;
            transition-delay: 0s;
        ` : `
            width: 0;
            z-index: -1;
            transition-delay: 0.3s;
        `}
        @media screen and (min-width: 992px) {
            ${props => props.showInput ? `
            width: 13rem;
            z-index: 1;
        ` : `
            width: 0;
            z-index: -1;
        `}
        }
        border-radius: 12px;
        background-color: transparent;
        border: 1px solid white;
        color: white;
        padding: 4px 10px;
        transition: width 0.5s ease-in-out, z-index 0s linear ${({ showInput }) =>
        showInput ? "0s" : "0.4s"};
        outline: none;
    }

    input:focus {
    border-color: #5600ff; 
    }

    svg{
        background-color: transparent;
        width: 25px;
        height: 30px;
        border: 0;
        color: white;
        cursor: pointer;
    }
`;

const Search = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 7px;
`;

const DerivedSearches = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    background-color: #565656;
    width: 7rem;
    margin-right: 2.3em;
    padding: 4px 10px;
    font-size: 14px;
    border: 1px solid white;
    border-radius: 6px;
    color: white;
    position: absolute;
    top: ${props => props.top}px;
    transition: 0.5s ease-in-out;
    @media screen and (min-width: 992px) {
        width: 13rem;
        margin-right: 0;
    }
`;

const LinkSearch = styled(Link)`
    text-decoration: none;
    color: white;
`;

export default function Header(params) {
    const [showInput, setShowInput] = useState(false);
    const { cartProducts } = useContext(CartContext);
    const [mobileNavActive, setMobileNavActive] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchSet, setSearchSet] = useState(new Set());
    const inputRef = useRef(null);
    const [top, setTop] = useState(null);

    useEffect(() => {
        function handleResize() {
            if (inputRef.current) {
                const { top } = inputRef.current.getBoundingClientRect();
                setTop(top + inputRef.current.offsetHeight + 5);
            }
        }

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        // Update the body overflow property based on mobileNavActive value
        document.body.style.overflow = mobileNavActive ? 'hidden' : 'auto';
    }, [mobileNavActive]);

    useEffect(() => {
        setSearchInput('');
        setSearchSet(new Set());
    }, [showInput])

    async function searchQuery(search) {
        const searches = search;
        setSearchInput(searches);
        if (search.length > 0) {
            const response = await axios.post('/api/search', { Squery: searches })
            const products = response.data;
            setSearchSet(new Set(products));
        } else {
            setSearchInput('');
            setSearchSet(new Set());
        }
    }

    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href={'/'}>Bintronics</Logo>
                    <StyleNav mobileNavActive={mobileNavActive}>
                        <NavLink href={'/'}>Home</NavLink>
                        <NavLink href={'/products'}>All Products</NavLink>
                        <NavLink href={'/categories'}>Categories</NavLink>
                        <NavLink href={'/account'}>Account</NavLink>
                        <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
                    </StyleNav>
                    <SearchContainer showInput={showInput}>
                        <Search>
                            <input ref={inputRef} type="text" value={searchInput} onChange={ev => searchQuery(ev.target.value)} placeholder="Search..." />
                            <svg onClick={() => setShowInput(prev => !prev)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </Search>
                        {searchSet.size > 0 && searchInput.length > 0 && (
                            <DerivedSearches top={top}>
                                {Array.from(searchSet).map((product) => (
                                    <LinkSearch onClick={() => { setShowInput(false); setSearchInput('') }} href={'/product/' + product._id} key={product._id}>
                                        {product.title}
                                        <br />
                                    </LinkSearch>
                                ))}
                            </DerivedSearches>
                        )}
                    </SearchContainer>
                    <NaVButton mobileNavActive={mobileNavActive} onClick={() => setMobileNavActive(prev => !prev)}>
                        <BarsIcon className="bars-icon" />
                        <CrossIcon className="cross-icon" />
                    </NaVButton>
                </Wrapper>
            </Center>
        </StyledHeader>
    )
};
