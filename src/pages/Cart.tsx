import { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState<Array<number>>([
    JSON.parse(localStorage.getItem("cart") ?? "[]"),
  ]);
  useEffect(() => {
    localStorage.setItem("kosar", JSON.stringify(cart));
  }, [cart]);
  return <></>;
};

export default Cart;
