import { useEffect, useState } from "react";
import { styled } from "styled-components"

const Image = styled.img`
        max-width: 100%;
        max-height: 100%;
`;

const ImageButtons = styled.div`
        display: flex;
        gap: 10px;
        flex-grow: 0;
        margin-top: 15px;
`;

const BigImage = styled.img`
    max-width: 100%;
    max-height: 200px;
`;
const ImageButton = styled.div`
    border: 1px solid #ccc;
    ${props => props.active ? `border-color: red; box-shadow: 4px 4px 3px 1px rgb(170 170 170);` : ``}
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 0;
        height: 60px;
        width: 60px;
        padding: 2px;
        cursor: pointer;
        border-radius: 5px;
`;

const BigImageWrapper = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        max-height: 200px;
        min-height: 200px;
`;


export default function ProductImages({ images }) {
    const [activeImage, setActiveImage] = useState(images?.[0].link)
    useEffect(() => {
        setActiveImage(images?.[0].link);
    }, [images])

    return (
        <>
                <BigImageWrapper>
                    <BigImage src={activeImage} />
                </BigImageWrapper>
                <ImageButtons>
                    {images.map(image => (
                        <ImageButton
                            key={image.id}
                            onClick={() => setActiveImage(image.link)}
                            active={image.link === activeImage}>
                            <Image src={image.link} />
                        </ImageButton>
                    ))}
                </ImageButtons>
        </>
    )
};
