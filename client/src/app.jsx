import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Helpers from './helpers.js';
import ProductOverview from './components/ProductOverview.jsx';
import VarianceOverview from './components/VarianceOverview.jsx';
// import CartButton from './components/mini-components/CartButton.jsx';
import exampleData from './data/exampleData.js';
import GlobalStyle from './globalStyle/createGlobalStyle.jsx'
import Sidebar from './components/Sidebar.jsx'
import {BrowserRouter as Router, Route, useParams } from 'react-router-dom';
import axios from 'axios';

const Icon = styled.svg`
flex: none;
transition: fill 0.25s;
width: 1.5rem;
height: 1.5rem;
`;

const likedIcon =
<Icon viewBox="0 0 24 24">
<path fillRule="evenodd" clipRule="evenodd" d="M12.336 5.52055C14.2336 3.62376 17.3096 3.62401 19.2069 5.52129C20.2067 6.52115 20.6796 7.85005 20.6259 9.15761C20.6151 12.2138 18.4184 14.8654 16.4892 16.6366C15.4926 17.5517 14.5004 18.2923 13.7593 18.8036C13.3879 19.0598 13.0771 19.2601 12.8574 19.3973C12.7475 19.466 12.6601 19.519 12.5992 19.5555C12.5687 19.5737 12.5448 19.5879 12.5279 19.5978L12.5079 19.6094L12.502 19.6129L12.5001 19.614C12.5001 19.614 12.4989 19.6147 11.9999 18.748C11.501 19.6147 11.5005 19.6144 11.5005 19.6144L11.4979 19.6129L11.4919 19.6094L11.472 19.5978C11.4551 19.5879 11.4312 19.5737 11.4007 19.5555C11.3397 19.519 11.2524 19.466 11.1425 19.3973C10.9227 19.2601 10.612 19.0598 10.2405 18.8036C9.49947 18.2923 8.50726 17.5517 7.51063 16.6366C5.58146 14.8654 3.38477 12.2139 3.37399 9.15765C3.32024 7.85008 3.79314 6.52117 4.79301 5.52129C6.69054 3.62376 9.76704 3.62376 11.6646 5.52129L11.9993 5.856L12.3353 5.52129L12.336 5.52055ZM11.9999 18.748L11.5005 19.6144L11.9999 19.9019L12.4989 19.6147L11.9999 18.748ZM11.9999 17.573C12.1727 17.462 12.384 17.3226 12.6236 17.1573C13.3125 16.6821 14.2267 15.9988 15.1366 15.1634C17.0157 13.4381 18.6259 11.2919 18.6259 9.13506V9.11213L18.627 9.08922C18.6626 8.31221 18.3844 7.52727 17.7926 6.9355C16.6762 5.81903 14.866 5.81902 13.7495 6.9355L13.7481 6.93689L11.9965 8.68166L10.2504 6.9355C9.13387 5.81903 7.3237 5.81903 6.20722 6.9355C5.61546 7.52727 5.33724 8.31221 5.3729 9.08922L5.37395 9.11213V9.13507C5.37395 11.2919 6.98418 13.4381 8.86325 15.1634C9.77312 15.9988 10.6874 16.6821 11.3762 17.1573C11.6159 17.3226 11.8271 17.462 11.9999 17.573Z"></path>
</Icon>

const ButtonFlex = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const Module = styled.div`
  padding: 0 5rem 0 1.5rem;
  margin-top: 2.5rem;
  width: 25rem;
`;

const Pane = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.15);
  height: 100vh;
  width: 100vw;
`;

const CartButton = styled.button`
  background-color: #0058a3;
  font-size: 1rem;
  color: #fff;
  font-weight: 700;
  border-radius: 20rem;
  width: 80%;
  height: 3.5rem;
  padding: 1rem 5rem;

  &:hover {
    background-color: #004f93;
  }

  &:active {
    background-color: #003e72;
    width: 79%;
    height: 3.4rem;
    margin-right: 1%;
  }
`;

const LikedButton = styled.button`
  border: 1px solid #dfdfdf;
  &:hover {
    border-color: #929292;
  }
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 100%;
  margin-left: 1rem;
`;

const BottomText = styled.div`
  font-size: 0.9rem;
  color: #484848;
  margin: 2rem;
`;

const App = () => {
  const { id } = useParams();

  const getItem = () => {
    if (id) {
      axios.get(`/api/productOptions/products/${id}`)
        .then((results) => {
          const { data } = results;
          setData(data);
          setCurrentColorOption(data.colors[0])
          setCurrentSizeOption(data.sizes[0])
        })
    } else {
      axios.get('/api/productOptions/products/1')
      .then((results) => {
        setData(results.data);
        setCurrentColorOption(data.colors[0])
        setCurrentSizeOption(data.sizes[0])
      })
    }
  }


  useEffect(() => {
    getItem();
  }, [useParams]);

  const [data, setData] = useState()


  const [sidebarClicked, setSidebarClicked] = useState(false);
  const [sidebarToRender, setSidebarToRender] = useState('');
  const [currentColorOption, setCurrentColorOption] = useState([]);
  const [currentSizeOption, setCurrentSizeOption] = useState([]);

  if (data) {
    data.reviewsAverages = Helpers.calculateAverages(data.reviews);
  }

  if (data) {
    return (
      <div>

          {sidebarClicked && <Pane onClick={() => setSidebarClicked(false)} />}
        <Sidebar setCurrentOption={{colors: setCurrentColorOption, sizes: setCurrentSizeOption}} data={data} sidebarClicked={sidebarClicked} setSidebarClicked={setSidebarClicked} sidebarToRender={sidebarToRender}/>
      <Module>
        <GlobalStyle />
        <ProductOverview data={data} setSidebarToRender={setSidebarToRender} setSidebarClicked={setSidebarClicked}/>
        {!!data.colors.length && <VarianceOverview options={{name: 'Color', choices: data.colors, current: currentColorOption}} setSidebarToRender={setSidebarToRender} setSidebarClicked={setSidebarClicked}  />}
        {!!data.sizes.length && <VarianceOverview options={{name: 'Size', choices: data.sizes, current: currentSizeOption}} setSidebarToRender={setSidebarToRender} setSidebarClicked={setSidebarClicked}  />}
        <ButtonFlex>
          <CartButton>Add to bag</CartButton>
          <LikedButton>{likedIcon}</LikedButton>
        </ButtonFlex>
        <BottomText>
          We're sorry, due to COVID-19 delivery times are running longer than usual. We are actively working to improve these issues.
        </BottomText>
        <BottomText>In stock at AZ, Tempe <br></br> To check another store or to get notified when it's back in stock click here</BottomText>
        <BottomText>
          You have 365 days to change your mind.
        </BottomText>
      </Module>

        </div>

    )

  } else {
    return (
      <div></div>
    )
  }
};

export default App;