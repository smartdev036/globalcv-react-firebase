import React, {  useState, useEffect } from 'react';
import './BoardIntroduction.scss';
import PortfolioImage from '../../../assets/portfolio.png';
import { getStats, setPrices, getPrices } from '../../../firestore/dbOperations'

export default props => {
  const [beginner, setBeginner] = useState('');
  const [intermediate, SetIntermediate] = useState('');
  const [expert, setExpert ] = useState('');
  const [curUser, setcurUser] = useState('');

  const { user } = props;
  useEffect(() => {
    if (user) {
      getPrices().then( value => {
        setBeginner(value.price1);
        SetIntermediate(value.price2);
        setExpert(value.price3);
        localStorage.setItem("price1",value.price1);
        localStorage.setItem("price2",value.price2);
        localStorage.setItem("price3",value.price3);
      });
    }
  }, [ user ]);

  const savePriceToDatabase = () => {
    if(beginner>0 && intermediate >0 && expert >0){
      setPrices(beginner, intermediate, expert).then(value => {
        console.log('value: ', value);
        localStorage.setItem("price1",value.price1);
        localStorage.setItem("price2",value.price2);
        localStorage.setItem("price3",value.price3);
        alert("Successfully changed.");
      })
    }else{
      alert("Input the right number please.");
    }
  }

  const nextPageMove = ()=>{
    getPrices().then( value => {
      localStorage.setItem("price1",value.price1);
      localStorage.setItem("price2",value.price2);
      localStorage.setItem("price3",value.price3);
    });
    props.nextStep();
  }
  /// This  class have nextStep passed to it in props so we be able to navigate between steps 
  return (
    <div className="board">
      <div className="introWrapper">
        <img className="introductionImage" src={PortfolioImage} alt="Portolio Img" />
        <button onClick={()=>nextPageMove()} className="big-btn-js">Select Template</button>
      </div>
      {user ? 
      <div className="price_container">
        <div class="row">
          <div class="col-25">
            <label>Beginner :</label>
          </div>
          <div class="col-75">
            <input type="text" id="begineer-price" name="firstname" placeholder=" Beginner." value = {beginner}
            onChange = {e=>setBeginner(e.target.value)}/>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label> Middle : &nbsp;</label>
          </div>
          <div class="col-75">
            <input type="text" id="Intermediate-price" name="lastname" placeholder="Intermediate.." value={intermediate}
            onChange = { (e)=> SetIntermediate(e.target.value)}/>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label>Expert : &nbsp;</label>
          </div>
          <div class="col-75">
            <input type="text" id="Expert-price" name="lastname" placeholder="Expert.." value={expert} onChange = { e=> setExpert(e.target.value) }/>
          </div>
        </div>
        <button onClick={() => savePriceToDatabase()} className="big-btn-js">
            Save prices</button>
        </div>
      :""}      

      <div className="introFooter">
        All Rights Reserved.
      </div>
    </div>
  );
}
