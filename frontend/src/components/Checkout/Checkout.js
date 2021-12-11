import "./Checkout.css";
import React, { Fragment, useState } from "react";
import { Country, State, City } from "country-state-city";

import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../_actions/cartAction";

const Checkout = ({ history }) => {
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cartState);

  const [shipping, setShipping] = useState({
    address: shippingInfo.address ? shippingInfo.address : "",
    country: shippingInfo.country ? shippingInfo.country : "ID",
    province: shippingInfo.province ? shippingInfo.province : "",
    city: shippingInfo.city ? shippingInfo.city : "",
    postCode: shippingInfo.postCode ? shippingInfo.postCode : "",
  });

  const handleShippingSubmit = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingInfo({
        address: shipping.address,
        country: Country.getCountryByCode(shipping.country).name,
        province: State.getStateByCodeAndCountry(shipping.province, shipping.country)
          .name,
        city: shipping.city,
        postCode: shipping.postCode,
      })
    );

    history.push("/order/create");
  };

  const onChangeHandler = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <form onSubmit={handleShippingSubmit} className='shippingForm'>
        <div>
          <h1>Shipping Details</h1>

          <div className='shippingFormInput'>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              name='address'
              placeholder='Enter your address'
              required
              value={shipping.address}
              onChange={onChangeHandler}
            />
          </div>

          <div className='twoInput'>
            <div className='shippingFormInput'>
              <label htmlFor='country'>Country</label>
              <select
                name='country'
                required
                value={shipping.country}
                onChange={onChangeHandler}
              >
                <option value='' disabled selected>
                  Choose your country
                </option>
                {Country &&
                  Country.getAllCountries().map((country, index) => (
                    <option key={index} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className='shippingFormInput'>
              <label htmlFor='province'>Province</label>
              <select
                name='province'
                required
                value={shipping.province}
                onChange={onChangeHandler}
                disabled={shipping.country ? false : true}
              >
                <option value='' disabled selected>
                  Choose your province
                </option>
                {State &&
                  State.getStatesOfCountry(shipping.country).map((province, index) => (
                    <option key={index} value={province.isoCode}>
                      {province.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className='twoInput'>
            <div className='shippingFormInput'>
              <label htmlFor='city'>City</label>
              <select
                name='city'
                required
                value={shipping.city}
                onChange={onChangeHandler}
                disabled={shipping.province ? false : true}
              >
                <option value='' disabled selected>
                  Choose your city
                </option>
                {City &&
                  City.getCitiesOfState(shipping.country, shipping.province).map(
                    (city, index) => (
                      <option key={index} value={city.name}>
                        {city.name}
                      </option>
                    )
                  )}
              </select>
            </div>

            <div className='shippingFormInput'>
              <label htmlFor='postCode'>Post Code</label>
              <input
                name='postCode'
                placeholder='Enter your post code'
                required
                value={shipping.postCode}
                onChange={onChangeHandler}
                disabled={shipping.city ? false : true}
              />
            </div>
          </div>
        </div>
        <div>
          <h1>Summary</h1>
          <div className='cartSummaryHeader'>
            <p>Description</p>
            <p>Price</p>
          </div>

          <div className='cartSummaryList'>
            <div>
              <p>Gross Total</p>
              <p>
                {cartItems
                  .reduce((acc, item) => acc + item.productType.price * item.quantity, 0)
                  .toLocaleString("en-US", {
                    style: "currency",
                    currency: "IDR",
                  })}
              </p>
            </div>
            <div>
              <p>Tax</p>
              <p>
                {(
                  cartItems.reduce(
                    (acc, item) => acc + item.productType.price * item.quantity,
                    0
                  ) * 0.02
                ).toLocaleString("en-US", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
            </div>
          </div>

          <div className='cartSummaryTotal'>
            <h3>Total</h3>
            <h3>
              {(
                cartItems.reduce(
                  (acc, item) => acc + item.productType.price * item.quantity,
                  0
                ) +
                cartItems.reduce(
                  (acc, item) => acc + item.productType.price * item.quantity,
                  0
                ) *
                  0.02
              ).toLocaleString("en-US", {
                style: "currency",
                currency: "IDR",
              })}
            </h3>
          </div>
          <input
            type='submit'
            value='Continue'
            className='shippingBtn'
            disabled={shipping.postCode ? false : true}
          />
        </div>
      </form>
    </Fragment>
  );
};

export default Checkout;
