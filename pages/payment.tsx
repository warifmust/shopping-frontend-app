import router from "next/router";
import { useContext, useEffect, useState } from "react";
import Layout from "../components/layout";
import { UserContext } from "../context/userContext";
import { formatTwoDecimal } from "../util/utilities";
import { createOrder } from "../api/baseApi";

interface Card {
  cardNumber: string;
  expiredDate: string;
  cvc: string;
}

interface Order {
  belongsTo: string;
  totalPrice: string;
  orders: Array<{
    img: string;
    price: string;
    name: string;
    nutrient: string;
  }>;
}

export default function Payment() {
  const { cart, setCart, user } = useContext(UserContext);
  const [order, setOrder] = useState<any>(cart);
  const [name, setName] = useState<string | "">(user?.name);
  const [email, setEmail] = useState<string | "">(user?.email);
  const [country, setCountry] = useState<string | "Malaysia">("Malaysia");
  const [streetAddress, setStreetAddress] = useState<string | "">("");
  const [city, setCity] = useState<string | "">("");
  const [state, setState] = useState<string | "">("");
  const [postal, setPostal] = useState<string | "">("");
  const [cardNumber, setCardNumber] = useState<string | "">("");
  const [cardExpiry, setCardExpiry] = useState<string | "">("");
  const [cardCVC, setCardCVC] = useState<string | "">("");
  const [error, setError] = useState<string | null>("");
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    countTotal();
  }, []);

  const checkError = async (e: any) => {
    const list = {
      name,
      email,
      country,
      streetAddress,
      city,
      state,
      postal,
      cardNumber,
      cardExpiry,
      cardCVC,
    };
    let tempArr = [];
    let emptyState = "";
    for (let property in list) {
      if (list[property] === "") {
        [...tempArr, tempArr.push(property)];
        emptyState = tempArr.toString();
        setError(`${emptyState} is empty. Please fill in and retry.`);
        return true;
      } else {
        setError("");
        return false;
      }
    }
  };

  const payOrder = async (e: any) => {
    e.preventDefault();

    const cartCopy = cart;
    cartCopy.map((copy: any) => {
      delete copy.status;
    });

    const orders = cartCopy;

    const data: Order = {
      belongsTo: user._id,
      totalPrice: total.toString(),
      orders: orders,
    };
    // Create Order API
    await createOrder(data);
    // Redirect to Account
    router.push("/account");
  };

  const countTotal = () => {
    const prices = order.map((o) => o.price);
    let tempArr = [];
    for (const price of prices) {
      [...tempArr, tempArr.push(parseInt(price))];
    }
    const total = tempArr.reduce((a, b) => a + b, 0);
    setTotal(total);
  };

  return (
    <Layout>
      <div className="mx-20 lg:mt-20 lg:px-8 xl:mt-28 sm:rounded-lg">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Your Order
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Please fill in the information needed for shipping. Once your
                payment is completed, your order will be created and the
                products will be delivered.
              </p>
            </div>
          </div>
          {/* Order */}
          <div className="flex flex-col my-4">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Product Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Price
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {cart.length > 0 &&
                        cart.map((c, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={c.img}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {c.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {c.nutrient}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              RM {formatTwoDecimal(c.price)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Please fill in the information needed for shipping. Once your
                payment is completed, your order will be created and the
                products will be delivered.
              </p>
            </div>
          </div>

          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="email_address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        type="text"
                        name="email_address"
                        id="email_address"
                        autoComplete="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="website@provider.com"
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country / Region
                      </label>
                      <select
                        id="country"
                        name="country"
                        autoComplete="country"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                      >
                        <option>Malaysia</option>
                        <option>Singapore</option>
                        <option>Brunei</option>
                      </select>
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="street_address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Street address
                      </label>
                      <input
                        type="text"
                        name="street_address"
                        id="street_address"
                        autoComplete="street-address"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        placeholder="Suite No, Street No, Street No"
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Sungai Buloh"
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State / Province
                      </label>
                      <input
                        type="text"
                        name="state"
                        id="state"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="Kuala Lumpur"
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="postal_code"
                        className="block text-sm font-medium text-gray-700"
                      >
                        ZIP / Postal
                      </label>
                      <input
                        type="text"
                        name="postal_code"
                        id="postal_code"
                        autoComplete="postal-code"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={postal}
                        onChange={(e) => setPostal(e.target.value)}
                        placeholder="00000"
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="postal_code"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Credit/Debit Card Number
                      </label>
                      <input
                        type="text"
                        name="card_number"
                        id="card_number"
                        autoComplete="postal-code"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234123412341234"
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="postal_code"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        id="expiry"
                        autoComplete="postal-code"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="12/34"
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="postal_code"
                        className="block text-sm font-medium text-gray-700"
                      >
                        CVC
                      </label>
                      <input
                        type="password"
                        name="cvc"
                        id="cvc"
                        autoComplete="postal-code"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={cardCVC}
                        onChange={(e) => setCardCVC(e.target.value)}
                        placeholder="***"
                        required
                      />
                    </div>
                  </div>
                  <p
                    className={`${
                      error ? "block" : "hidden"
                    } text-xs text-red-600 my-4`}
                  >
                    {error}
                  </p>
                </div>

                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <div className="mt-5 flex justify-between">
                    <div className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                      {`Total price: RM ${total.toFixed(2)}`}
                    </div>
                    <div className="rounded-md shadow cursor-pointer">
                      <button
                        onClick={(e) => payOrder(e)}
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                      >
                        Pay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
