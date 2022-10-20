import GlobalStyle from "./styles/GlobalStyles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginRoute from "./components/LoginRoute";

export default function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Routes>
                <Route
                    path="/"
                    element={<LoginRoute />}
                />
            </Routes>
        </BrowserRouter>
    )
};
