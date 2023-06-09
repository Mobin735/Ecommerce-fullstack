import Link from "next/link";
import { styled } from "styled-components"

const FWrapper = styled.div`
    padding: 1rem;
    background-color: #222222;
    margin-top: 4em;
`;

const Wrapper = styled.div`
    display: flex;
    /* justify-content: space-between; */
    gap: 0;
    padding: 1.5rem;
    align-items: center;
    @media screen and (min-width: 992px) {
        gap: 10rem;
    }
`;

const Logo = styled(Link)`
    font-weight: 900;
    font-size: 2rem;
    color: #fff;
    text-decoration: none;
    position: relative;
    z-index: 3;
    font-family: 'Satisfy', cursive;
    width: 50%;
    text-align: center;
    @media screen and (min-width: 992px) {
        font-size: 4rem;
    }
`;

const QuickLinks = styled.div`
    width: 50%;
    text-align: center;
`;

const QLinks = styled(Link)`
    text-decoration: none;
    color: #7e7e7e;
    font-size: 13px;
`;

const LinkWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 15px;
`;

const LinkTitle = styled.div`
    /* text-align: center; */
    color: white;
    font-size: 1.2rem;
    letter-spacing: 2px;
`;

const CopyTitle = styled.div`
    color: #949494;
    font-size: 0.9rem;
    padding-top: 1rem;
    text-align: center;
    border-top: 1px solid #575757;
`

export default function Footer() {
    return (
        <FWrapper>
            <Wrapper>
                <Logo href={'/'}>Bintronics</Logo>
                <QuickLinks>
                    <LinkTitle>Quicklinks</LinkTitle>
                    <LinkWrapper>
                        <QLinks href={'/'}>Home</QLinks>
                        <QLinks href={'/products'}>All Products</QLinks>
                        <QLinks href={'/categories'}>Categories</QLinks>
                        <QLinks href={'/account'}>Account</QLinks>
                    </LinkWrapper>
                </QuickLinks>
            </Wrapper>
                <CopyTitle>Copyright © 2023 All Rights Reserved by MobinDesai.</CopyTitle>
        </FWrapper>
    )
};
