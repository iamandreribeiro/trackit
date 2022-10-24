import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"
import logo from "../assets/logo.png";
import { AuthContext } from "../context/auth";

const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";

export default function LoginRoute() {
    const navigate = useNavigate();
    
    const {setImage} = useContext(AuthContext);
    const {setToken} = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function login() {
        const dados = {email: email, password: senha};
        console.log(email, senha);
        console.log(dados);
        const promise = axios.post(URL, dados);
        promise.then((d) => {
            console.log(d.data);
            console.log(d.data.image);
            setImage(d.data.image);
            setToken(d.data.token);
            navigate("/habitos");
        });

        promise.catch(alert("Deu ruim!"));
    }

    return (
        <StyledContainer>
            <StyledLogo src={logo} />            
            <StyledInput type="email" placeholder="email" onChange={(c) => setEmail(c.target.value)} />
            <StyledInput type="password" placeholder="senha" onChange={(c) => setSenha(c.target.value)}/>
            <StyledButton onClick={() => login()}>
                <h1>
                    Entrar
                </h1>
            </StyledButton>
            <Link to="/cadastro">
                <StyledH1>
                    Não tem uma conta? Cadastre-se!
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