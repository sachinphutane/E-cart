import React, { useEffect, useRef, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Badge from '@mui/material/Badge';
import Nav from 'react-bootstrap/Nav';
import Menu from '@mui/material/Menu';

import Form from 'react-bootstrap/Form';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/esm/Table';
import { DLT, SEARCH } from '../redux/actions/action';
import Cardsdata from './CardsData';

const Header = () => {

    const [value, setValue] = useState("");


    const suggestions = Cardsdata.filter(option => { return option.rname.toLowerCase().includes(value.toString().toLowerCase()) });



    const [showSuggestions, setShowSuggestions] = useState(true);

    const [price, setPrice] = useState(0);
    // console.log(price);

    const getdata = useSelector((state) => state.cartreducer.carts);
    // console.log(getdata);

    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const dlt = (id) => {
        dispatch(DLT(id))
    }


    const total = () => {
        let price = 0;
        getdata.map((ele, k) => {
            price = ele.price * ele.qnty + price
        });
        setPrice(price);
    };

    useEffect(() => {
        total();
        const handleClick = (event) => {

            if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {

                setShowSuggestions(true)

            }

        };

        document.addEventListener("click", handleClick);

        return () => {

            document.removeEventListener("click", handleClick)

        }

    }, [total])

    const searchFun = (e) => {
        console.log(e);


        if (e.length >= 3) {
            setShowSuggestions(false)
        } else {
            setShowSuggestions(true)
        }


        setValue(e);


        let SearchedItems = Cardsdata.filter((el) => {

            return el.rname.toLowerCase().match(e.toLowerCase());


        });


        console.log(SearchedItems);
        dispatch(SEARCH(SearchedItems));

    }

    const autocompleteRef = useRef();

    const suggestionClick = (e) => {

        console.log(e);

        setValue(e);

        searchFun(e);
        setShowSuggestions(true)

    }




    return (
        <>

            <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
                <Container>
                    <NavLink to="/" className="text-decoration-none text-light mx-3">Add to Cart</NavLink>
                    <Nav className="me-auto">
                        <NavLink to="/" className="text-decoration-none text-light">Home</NavLink>
                    </Nav>
                    <Form className='d-flex justify-content-center col-md-10' ref={autocompleteRef}>
                        <Form.Group className=" mx-2 col-lg-4" controlId="formBasicEmail">
                            <Form.Control style={{width:500,marginLeft:-150}}
                            value={value} type="search"

                                onChange={(e) => { searchFun(e.target.value) }}
                                placeholder="Search Restaurant" />

                            <div style={{ backgroundColor: 'gray', width: 500, borderRadius: '0 0 10px 10px', display: 'flex',marginLeft:-150, marginTop:0, position: 'absolute' }} hidden={showSuggestions} >

                                <ul className="suggestions">

                                    {suggestions.length !== 0 ?

                                        suggestions.map(suggestion => (

                                            <li key={suggestion.id} onClick={() => { suggestionClick(suggestion.rname) }}>

                                                {suggestion.rname}

                                            </li>

                                        )) :

                                        <li>

                                            No Suggestions Available

                                        </li>

                                    }

                                </ul>

                            </div>
                        </Form.Group>
                        <Link to='/search'>
                            <button className='btn text-light mx-1' style={{ background: "#ed4c67",marginLeft:300}}>Submit</button>
                        </Link>

                    </Form>

                    <Badge badgeContent={getdata.length} color="primary"
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <i className="fa-solid fa-cart-shopping text-light" style={{ fontSize: 25, cursor: "pointer" }}></i>
                    </Badge>

                </Container>



                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >

                    {
                        getdata.length ?
                            <div className='card_details' style={{ width: "24rem", padding: 10 }}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Photo</th>
                                            <th>Restaurant Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getdata.map((e) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>
                                                                <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                                                                    <img src={e.imgdata} style={{ width: "5rem", height: "5rem" }} alt="" />
                                                                </NavLink>
                                                            </td>
                                                            <td>
                                                                <p>{e.rname}</p>
                                                                <p>Price : ₹{e.price}</p>
                                                                <p>Quantity : {e.qnty}</p>
                                                                <p style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => dlt(e.id)}>
                                                                    <i className='fas fa-trash smalltrash'></i>
                                                                </p>
                                                            </td>

                                                            <td className='mt-5' style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => dlt(e.id)}>
                                                                <i className='fas fa-trash largetrash'></i>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }
                                        <p className='text-center'>Total :₹ {price}</p>
                                    </tbody>
                                </Table>
                            </div> :

                            <div className='card_details d-flex justify-content-center align-items-center' style={{ width: "24rem", padding: 10, position: "relative" }}>
                                <i className='fas fa-close smallclose'
                                    onClick={handleClose}
                                    style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer" }}></i>
                                <p style={{ fontSize: 22 }}>Your carts is empty</p>
                                <img src="./cart.gif" alt="" className='emptycart_img' style={{ width: "5rem", padding: 10 }} />
                            </div>
                    }

                </Menu>

            </Navbar>




        </>
    )
}

export default Header