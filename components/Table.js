import { styled } from "styled-components";

const StyledTable = styled.table`
    width: 100%;
    th{
        text-align: left;
        text-transform: uppercase;
        color: #919191b8;
        font-weight: 900;
        font-size: .7rem;
    }
    td{
        border-top: 1px solid rgb(0 0 0 / 21%);
    }
`;

export default function Table(props) {
    return <StyledTable {...props} />
};
