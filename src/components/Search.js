
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useDispatch } from 'react-redux';
import { ADD } from '../redux/actions/action';
import Dropdown from 'react-bootstrap/Dropdown';
import React from 'react';
import LaptopIcon from '@mui/icons-material/Laptop';

import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';



import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';


const Search = ({ searchInput, searchBarHandler }) => {
  const searchList1 = useSelector((state) => state.cartreducer2.SearchItems);
  console.log(searchList1);
  const [age, setAge] = React.useState('');

  const [classnames, setClassnames] = React.useState('grid1');
  const [classnames2, setClassnames2] = React.useState('container1');



  const changeGrid1 = () => {

    setClassnames('grid1');

    setClassnames2('container1');

  }

  const changeGrid2 = () => {

    setClassnames('grid2');
    setClassnames2('container2');

  }

  const lowToHigh = () => {
    searchList1.sort((a, b) => { return (a.price - b.price) });
    console.log(searchList1);
    setAge('Low');

  }

  const highToLow = () => {
    searchList1.sort((a, b) => { return (b.price - a.price) });
    console.log(searchList1);
    setAge('High');


  }


  React.useEffect(() => {
    console.log(age);



  }, [age]);







  const dispatch = useDispatch();
  const send = (e) => {
    // console.log(e);
    dispatch(ADD(e));
  }
  return (
    <div style={{marginLeft:140}}>
      <h2 className='text-center'>Search List</h2>
      <div >
        {searchList1.length !== 1 ?



        <ToggleButtonGroup

          type="radio" name="options" defaultValue={1}>
          <ToggleButton id="tbg-radio-1" onClick={changeGrid1} value={1}><PhoneAndroidIcon /></ToggleButton>
          <ToggleButton id="tbg-radio-2" onClick={changeGrid2} value={2}><LaptopIcon /></ToggleButton>

        </ToggleButtonGroup> : null





      }</div>


      <Dropdown style={{ position: 'relative', top: -40, left: 1100 }}>

        <Dropdown.Toggle variant="primary" id="dropdown-basic">

          Sort By

        </Dropdown.Toggle>



        <Dropdown.Menu>

          <Dropdown.Item onClick={highToLow}>Price : High to Low</Dropdown.Item>

          <Dropdown.Item onClick={lowToHigh}>Price : Low to High</Dropdown.Item>

        </Dropdown.Menu>

      </Dropdown>
      <div className={classnames2}>

        <div className={classnames}>
          {
            searchList1.map((element, id) => {
              return (
                <>
                  <Card style={{ width: '22rem', border: "none" }} className="mx-2 mt-4 card_style">
                    <Card.Img variant="top" src={element.imgdata} style={{ height: "16rem" }} className="mt-3" />
                    <Card.Body>
                      <Card.Title>{element.rname}</Card.Title>
                      <Card.Text>
                        Price : ₹ {element.price}
                      </Card.Text>
                      <div className="button_div d-flex justify-content-center">
                        <Button variant="primary"
                          onClick={() => send(element)}
                          className='col-lg-12'>Add to Cart</Button>
                      </div>

                    </Card.Body>
                  </Card>
                </>
              )
            })
          }

        </div>
      </div>
    </div>




  )
}

export default Search
