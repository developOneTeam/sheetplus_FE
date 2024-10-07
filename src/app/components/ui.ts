import styled from "@emotion/styled";

export const Button = styled.button<{ $disable?: boolean; }>`
    color: ${props => props.$disable ? "#7E7E7E": "#fff"};
    background: ${props => props.$disable ? "#D9D9D9": "#26539C"};
    border-radius: 10px;
    border: none;
`;

export const SecondaryButton = styled(Button)`
    background: #1C9AD6;
`;

export const dialog = styled.dialog`
    border-radius: 10px;
`


