import { useContext, useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { Link } from "react-router-dom";
import styled from "styled-components"
import logo from "../assets/TrackIt.png";
import { AuthContext } from "../context/auth";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br'
import axios from "axios";

const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";

let color = "";

export default function TodayRoute() {
    const { image } = useContext(AuthContext);
    const { nome } = useContext(AuthContext);
    const { token } = useContext(AuthContext);

    const [dia, setDia] = useState("");
    const [habitos, setHabitos] = useState([]);

    useEffect(() => {
        if (dayjs().day() === 0) setDia("Domingo");
        else if (dayjs().day() === 1) setDia("Segunda");
        else if (dayjs().day() === 2) setDia("Terça");
        else if (dayjs().day() === 3) setDia("Quarta");
        else if (dayjs().day() === 4) setDia("Quinta");
        else if (dayjs().day() === 5) setDia("Sexta");
        else setDia("Sábado");
    }, []);

    useEffect(() => {
        const promise = axios.get(URL, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        promise.then((d) => {
            console.log(d.data);
            setHabitos(d.data);
            console.log(habitos);
        });
    }, []);

    function validaHabito(id) {
        console.log(id);
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/` + id + `/check`, undefined, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        promise.then((d) => console.log(d));
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
                <h1>{dia}, {dayjs().format('DD/MM')}</h1>
                {
                }
            </StyledHabits>

            {
                habitos.map((h) => {
                    console.log(h.done);  
                    if(h.done) {
                        color = "#8FC549";
                    } else {
                        color = "#E7E7E7";
                    }   
                    return (
                        <StyledHabit>
                            <StyledDays color={color}>
                                <h1>{h.name}</h1>
                                <h2>Sequência atual: {h.currentSequence}</h2>
                                <h2>Seu recorde: {h.highestSequence}</h2>
                                <ion-icon name="checkbox" onClick={() => validaHabito(h.id)} />
                            </StyledDays>
                        </StyledHabit>
                    )
                })
            }

            <StyledFooter>
                <h1>Hábitos</h1>
                <div style={{ width: 80, height: 80, marginBottom: 30 }}>
                    <Link to="/hoje">
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
                    </Link>
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
    z-index: 1;
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
    position: relative;
`

const StyledDays = styled.div`
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;    
    position: relative;
    h1 {
        font-size: 20px;
    }
    h2 {
        font-size: 13px;
    }
    ion-icon {
        color: ${props => props.color};
        font-size: 60px;
        position: absolute;
        right: 0;
    }
`