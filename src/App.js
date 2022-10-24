import GlobalStyle from "./styles/GlobalStyles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/auth";
import LoginRoute from "./components/LoginRoute";
import SignUpRoute from "./components/SignUpRoute";
import HabitsRoute from "./components/HabitsRoute";

export default function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <AuthProvider>
                <Routes>
                    <Route
                        path="/"
                        element={<LoginRoute />}
                    />

                    <Route
                        path="/cadastro"
                        element={<SignUpRoute />}
                    />

                    <Route 
                        path="/habitos"
                        element={<HabitsRoute />}
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
};
