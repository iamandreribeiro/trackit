import GlobalStyle from "./styles/GlobalStyles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginRoute from "./components/LoginRoute";
import SignUpRoute from "./components/SignUpRoute";

export default function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Routes>
                <Route
                    path="/"
                    element={<LoginRoute />}
                />

                <Route 
                    path="/cadastro"
                    element={<SignUpRoute />}
                />
            </Routes>
        </BrowserRouter>
    )
};
