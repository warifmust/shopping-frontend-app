import { useMemo, useState } from "react";
import "tailwindcss/tailwind.css";
import { UserContext } from "../context/userContext";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState(null);

  const providerValue = useMemo(
    () => ({ user, setUser, cart, setCart, products, setProducts }),
    [user, setUser, cart, setCart, products, setProducts]
  );

  return (
    <UserContext.Provider value={providerValue}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
