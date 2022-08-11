import React from 'react';
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
    const pages = [
        ["ON AIR", "/room/popular"],
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