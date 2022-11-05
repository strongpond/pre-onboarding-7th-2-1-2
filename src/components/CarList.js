import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import { getCarList } from "../apis";
import CarListItem from "./CarListItem";

const CarList = () => {
  const [cars, setCars] = useState([]);

  const getCars = useCallback(async () => {
    const result = await getCarList();
    setCars(result.data.payload);
  }, []);

  useEffect(() => {
    getCars();
  }, [getCars]);

  return (
    <ListWrapper>
      {cars.map(data => {
        const { id, attribute, amount } = data;
        const { brand, name, fuelType, segment, imageUrl } = attribute;

        return (
          <CarListItem
            key={id}
            id={id}
            brand={brand}
            name={name}
            fuelType={fuelType}
            segment={segment}
            imageUrl={imageUrl}
            amount={amount}
          />
        );
      })}
    </ListWrapper>
  );
};

export default CarList;

const ListWrapper = styled.div``;
