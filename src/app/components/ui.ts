import styled from "@emotion/styled";

export const Button = styled.button<{ $disable?: boolean; }>`
    color: ${props => props.$disable ? "#7E7E7E": ""};
    background: ${props => props.$disable ? "#D9D9D9": "#26539C"};
    border-radius: 10px;
    border: none;

    width: 100%;    
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 1.2rem;

    :hover, :focus {
        background: ${props => props.$disable ?? "#26539CE6"};
        outline: ${props => props.$disable ?? "solid 2px #26539CE6"};
    }
`;

export const SecondaryButton = styled(Button)`
    background: #1C9AD6;
    
    width: 100%;

    :hover, :focus {
        background: ${props => props.$disable ?? "#1C9AD6E6"};
        outline: ${props => props.$disable ?? "solid 2px #1C9AD6E6"};
    }
`;

export const IconButton = styled.button`
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;

    :hover, :focus {
        background: #959595E6;
    }

    :focus {
        outline: solid 2px #1C9AD6E6;
    }
`;

export const NavButton = styled.button<{ $enabled?: boolean; }>`
    background: transparent;
    border-radius: 8px;
    color: ${props => props.$enabled ? "#1c9ad6" : "#1c1b1f"};

    :hover, :focus {
        background: #959595E6;
    }

    :focus {
        outline: solid 2px #1C9AD6E6;
    }
`;

export const FaqLink = styled.a`
    color: #959595;
    text-decoration: solid;
    font-size: 1rem;
`;

export const InputWrapper = styled.div<{ $active?: boolean; }>`
    border: none;
    border-bottom: solid 2px #1C9AD6;
    color: ${props => props.$active ? "#1C9AD6":"#959595"};
    width: 100%;
    
    display: flex;
    gap: 2px;

    .material-symbols-rounded {
        font-variation-settings:
            'FILL' 0,
            'wght' 300,
            'GRAD' 0,
            'opsz' 32;
    }

    input {
        border: none;
    }
`;

export const NavToast = styled.div`
    border-radius: 25px;
    background: #26539C1A;
    text-align: center;

    ::after {
        
    }
`

export const Dialog = styled.dialog`
    border-radius: 10px;
    box-shadow: 3px 3px 5px #c9c9c9;
`;

export const IconDesc = styled.div<{ $iconSize?: number; $iconColor?: string }>`
    display: flex;
    align-items: center;
    flex-direction: column;

    .material-symbols-rounded {
        font-variation-settings:
            'FILL' 0,
            'wght' 300,
            'GRAD' 0,
            'opsz' ${props => props.$iconSize ?? "24"};
        color: ${props => props.$iconColor ?? "#1c1b1f"};
    }

    h2 {
        font-size: 1.5rem;
    }

    p {
        font-size: 1rem;
    }
`;

export const AccentArea = styled.div<{ $center?: boolean; }>`
    background: #26539C1A;
    border-radius: 10px;
    padding: 0.5em;

    p {
        text-align: ${props => props.$center ? "center": ""};
    }
`;

export const Nav = styled.nav<{ $page?: string; }>`
    position: fixed;
    bottom: 1em;
    margin: 0 1em;
    width: 100%;

    border-radius: 10px;
    background: #FAFAFA;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    display: flex;
    align-items: center;
    gap: 0.5em;

    .material-symbols-rounded {
        font-variation-settings:
            'FILL' 0,
            'wght' 300,
            'GRAD' 0,
            'opsz' 24;
    }
`;

export const Header = styled.header`
    display: flex;
    justify-content: space-between;

    .title {
        display: flex;
        flex-direction: column;
        font-size: 1.4rem;
        font-weight: 900;

        .sheet {
            font-size: 1.2rem;
            font-weight: 300;
        }

        .subtitle {
            color: #959595;
            font-size: 1rem;
            font-weight: 300;
        }
    }

    .icon-nav {
        display: flex;
        gap: 0.5em;
        color: #1c1b1f;
        .material-symbols-rounded {
            font-variation-settings:
                'FILL' 0,
                'wght' 300,
                'GRAD' 0,
                'opsz' 24;
        }
    }
`;

