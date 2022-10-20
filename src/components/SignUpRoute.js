import { Link } from "react-router-dom";
import styled from "styled-components"
import logo from "../assets/logo.png";

export default function LoginRoute() {
    return (
        <StyledContainer>
            <StyledLogo src={logo} />
            <StyledInput type="text" placeholder="email"></StyledInput>

            <StyledInput type="text" placeholder="senha"></StyledInput>

            <StyledInput type="text" placeholder="nome"></StyledInput>

            <StyledInput type="text" placeholder="foto"></StyledInput>

            <StyledButton>
                <h1>
                    Cadastrar
                </h1>
            </StyledButton>

            <Link to="/">
                <StyledH1>
                    Já tem uma conta? Faça login!
                </StyledH1>
            </Link>
        </StyledContainer>
    )
};

const StyledContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
`

const StyledLogo = styled.img`
    margin-bottom: 30px;
`

const StyledInput = styled.input`
    height: 45px;
    width: 80vw;
    border-radius: 5px;
    margin-bottom: 10px;
    border: 1px solid #D4D4D4;
`

const StyledButton = styled.button`
    background-color: #52B6FF;
    height: 45px;
    width: 80vw;
    border: none;
    border-radius: 5px;
    margin-bottom: 20px;
    cursor: pointer;

    :active {
        position: relative;
        top: 1px;
    }

    h1 {
        color: white;
        font-weight: 400;
        font-size: 21px;
    }
`

const StyledH1 = styled.h1`
    color: #52B6FF;
    font-size: 14px;
    font-weight: 400;
`