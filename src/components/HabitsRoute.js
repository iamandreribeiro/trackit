import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { AuthContext } from "../context/auth"
import logo from "../assets/TrackIt.png";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import axios from "axios";
import { Link } from "react-router-dom";

const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";

const days = ["D", "S", "T", "Q", "Q", "S", "S"];

export default function HabitsRoute() {
    const { token } = useContext(AuthContext);
    const { image } = useContext(AuthContext);
    const { nome } = useContext(AuthContext);

    const [habitos, setHabitos] = useState("");
    const [boolean, setBoolean] = useState(false);
    const [nomeHabito, setNomeHabito] = useState("");
    const [diasHabito, setDiasHabito] = useState([]);

    const porcentagem = 66;

    useEffect(() => {
        const promise = axios.get(URL, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        promise.then((d) => {
            console.log(d.data);
            setHabitos(d.data);
        });
    }, [])

    function criarHabito() {
        setBoolean(true);
    }

    function salvaDias(i) {
        const day = [...diasHabito, i];
        setDiasHabito(day);
        console.log(diasHabito);
    }

    function salvarHabito() {
        const dados = {name: nomeHabito, days: diasHabito}
        console.log(dados);
        const promise = axios.post(URL, dados, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        promise.then((d) => console.log(d.data));
    }

    return (
        <StyledContainer>
            <StyledHeader>
                <Link to="/">
                    <StyledLogo src={logo} alt="logo" />
                </Link>
                <StyledProfile src={image} alt={nome} />
            </StyledHeader>


            <StyledHabits>
                <h1>
                    Meus hábitos
                </h1>
                <StyledButton onClick={() => criarHabito()}>
                    <h1>
                        +
                    </h1>
                </StyledButton>
            </StyledHabits>

            {
                habitos.length !== 0 ? habitos.map((h) => {
                    console.log(h.days);
                    return (
                        <StyledHabit>
                            <StyledTitle>{h.name}</StyledTitle>
                            <StyledDays>
                                {
                                    days.map((d, i) => {
                                        return (
                                            <StyledDay color={h.days.includes(i)}>
                                                <h1 color={h.days.includes(i)}>
                                                    {d}
                                                </h1>
                                            </StyledDay>
                                        )
                                    })
                                }
                            </StyledDays>
                        </StyledHabit>
                    )
                }) :
                    <h1>
                        Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
                    </h1>
            }

            {
                boolean ?
                    <StyledNewHabit>
                        <StyledInput onChange={(c) => setNomeHabito(c.target.value)} />
                        <StyledDays>
                            {
                                days.map((d, i) => {
                                    return (
                                        <StyledDay onClick={() => salvaDias(i)}>
                                            <h1>
                                                {d}
                                            </h1>
                                        </StyledDay>
                                    )
                                })
                            }
                        </StyledDays>

                        <StyledButtonContainer>
                            <StyledCancel onClick={() => {
                                setBoolean(false)
                                setNomeHabito("");
                            }} >
                                <h1>
                                    Cancelar
                                </h1>
                            </StyledCancel>

                            <StyledSave onClick={() => salvarHabito()}>
                                <h1>
                                    Salvar
                                </h1>
                            </StyledSave>
                        </StyledButtonContainer>
                    </StyledNewHabit>
                    : console.log()
            }

            <StyledFooter>
                <h1>Hábitos</h1>
                <div style={{ width: 80, height: 80, marginBottom: 30 }}>
                    <CircularProgressbar
                        value={73}
                        text={'Hoje'}
                        background={true}
                        backgroundPadding={8}
                        styles={buildStyles({
                            textSize: '20px',
                            pathColor: '#FFFFFF',
                            textColor: '#FFFFFF',
                            trailColor: '#52B6FF',
                            backgroundColor: '#52B6FF',
                        })}
                    />
                </div>
                <h1>Histórico</h1>
            </StyledFooter>
        </StyledContainer>
    )
};

const StyledContainer = styled.div`
    height: 100vh;
    background-color: #E5E5E5;
    margin-top: 70px;
    margin-bottom: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const StyledHabits = styled.div`
    width: 80vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 0;
    h1 {
        color: #126BA5;
        font-size: 23px;
    }
`
const StyledHabit = styled.div`
    background: #FFFFFF;
    border-radius: 5px;
    width: 80vw;
    height: 90px;
    padding: 10px;
    margin-bottom: 15px;
`

const StyledNewHabit = styled.div`
    background: #FFFFFF;
    border-radius: 5px;
    margin-top: 20px;
    width: 80vw;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

const StyledTitle = styled.div`
    width: 100%;
    height: 20px;
`

const StyledDays = styled.div`
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`

const StyledDay = styled.div`
    background-color: ${props => props.color ? "#CFCFCF" : "#FFFFFF"};
    border: 1px solid #D4D4D4;  
    width: 30px;
    height: 30px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    h1 {
        color: ${props => props.color ? "#FFFFFF" : "#CFCFCF"};
    }
`

const StyledButton = styled.button`
    background-color: #52B6FF;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    h1 {
        color: white;
    }
`

const StyledHeader = styled.div`
    width: 100vw;
    height: 70px;
    background-color: #126BA5;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    position: fixed;
    top: 0;
`
const StyledLogo = styled.img`
    margin-left: 10px;
`

const StyledProfile = styled.img`
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-right: 10px;
`

const StyledFooter = styled.div`
    width: 100vw;
    height: 70px;
    background-color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    padding: 0 10px;
`

const StyledInput = styled.input`
    width: 100%;
    height: 30px;
    border: 1px solid #cfcfcf;
`

const StyledButtonContainer = styled.div`
`

const StyledCancel = styled.button`
    border: 1px solid #52B6FF;
    background-color: white;
    width:  80px;
    height: 35px;
    border-radius: 5px; 
    margin-right: 5px;
    h1 {
        color: #52B6FF;
    }
`

const StyledSave = styled.button`
    border: #52B6FF;
    background-color: #52B6FF;
    width:  80px;
    height: 35px;
    border-radius: 5px;
    margin-left: 5px;
    h1 {
        color: white;
    }
`