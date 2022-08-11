import React from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import BeforeEmailAuth from "../user/BeforeEmailAuth";
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogoutHandler = () => {
        dispatch(logoutRequest())
            .then((res) => navigate('/'))
            .catch((err) => {
                state.user = initState;
                localStorage.removeItem('persist:root');
                navigate('/');
                // console.log(err);
            });
    };

    const pages = [
        ["ON AIR", "/session/popular"],
        ["옥상", "/room/list"],
        ["자유게시판", "/board/general"],
    ];

    return (
        <div className='nav-bar'>
            {pages.map((page, idx) => (
                <Link to={page[1]} key={idx}>
                    <Button sx={{ mr: 4, color: "black", display: "block" }}>
                        {page[0]}
                    </Button>
                </Link>
            ))}
        </div>
    )
}

export default Navbar;