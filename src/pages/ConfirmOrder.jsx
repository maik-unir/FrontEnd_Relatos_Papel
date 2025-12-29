import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { Button } from "react-bootstrap";
import ConfirmOrderView from '../views/ConfirmOrderView';

const ConfirmOrder = () => {
  return (
    <ConfirmOrderView />
  );
};

export default ConfirmOrder;