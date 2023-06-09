import { useEffect, useState } from "react";
import { styled } from "styled-components";

const Wrapper = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    color: black;
    display: ${props => (props.show ? "block" : "none")};
    svg {
        fill: #d6d6d6;
    }
`;

export default function TopArrow() {
    const [showArrow, setShowArrow] = useState(false);

    const handleScroll = () => {
        const scrollTop = window.pageYOffset;

        if (scrollTop > 0) {
            setShowArrow(true);
        } else {
            setShowArrow(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        // return () => {
        //     window.removeEventListener("scroll", handleScroll);
        // };
    }, []);

    return (
        <Wrapper show={showArrow} onClick={scrollToTop}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </Wrapper>
    );
}
