import './App.css';
import './global.css';

import {Route, Routes} from "react-router-dom";
import Home from "./pages/home";
import Tron from "./pages/tron";
import NoMatch from "./pages/noMatch";
import * as React from "react";

export default function App() {
    return (
        <div className="App">
            <Routes> {/* The Switch decides which component to show based on the current URL.*/}
                <Route index path='/' element={<Home/>}></Route>
                <Route path='tron' element={<Tron/>}></Route>
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </div>
    );
}