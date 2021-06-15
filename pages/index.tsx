import Layout from "../components/layout";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { getProducts, getProductsInCart, addToCart } from "../api/baseApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatTwoDecimal } from "../util/utilities";

interface Product {
  id: number;
  img: string;
  price: string;
  name: string;
  nutrient: string;
}

export default function Home() {
  const router = useRouter();
  const { cart, setCart, products, setProducts, user } =
    useContext(UserContext);

  useEffect(() => {
    getAllProducts();
    getCarts();
  }, []);

  const getAllProducts = async () => {
    const data = await getProducts();
    const products = data.data.getProducts;
    setProducts(products);
  };

  const getCarts = async () => {
    const userId = user?._id;
    const data = await getProductsInCart(userId);
    const cart = data.data.getProductsInCart;
    setCart(cart);
  };

  const updateCart = async (product: Product) => {
    if (!user) {
      alert("Please logged in to continue adding products to cart.");
      router.push("/login-signup");
    } else {
      const newData = { ...product, belongsTo: user?._id, status: "unpaid" };
      await addToCart(newData);
      await getCarts();
      toast(`${product.name} is added to the cart`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Layout>
      {/* Toast */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
      {/* Cart */}
      <Link href="cart">
        <div className="bg-indigo-600 cursor-pointer absolute top-8 right-20 w-14 h-14 rounded-md shadow-md flex justify-center align-center 3xl:hidden">
          <span
            className={`${
              cart.length > 0 ? "block" : "hidden"
            } h-5 w-5 text-center rounded-3xl bg-white text-indigo-600 absolute right-1 m-1 text-sm font-bold`}
          >
            {cart.length}
          </span>
          <ShoppingBagIcon
            className="h-6 w-h-6 text-white m-auto"
            aria-hidden="true"
          />
        </div>
      </Link>
      <section id="home" className="flex justify-between">
        <div className="my-10 mx-auto px-4 sm:my-12 sm:px-6 md:my-16 lg:my-20 lg:px-8 xl:my-28">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">
                Setel Mart
                <br />
              </span>{" "}
              <span className="block text-indigo-600 xl:inline">
                Buy groceries easily
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Would you like thousands of new customers to taste your amazing
              food? So would we! It's simple: we list your menu online, help you
              process orders, pick them up, and deliver them to hungry people -
              in a heartbeat!
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <AnchorLink
                  href="#products"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Browse groceries!
                </AnchorLink>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:inset-y-0 lg:right-0 lg:w-1/2 lg:my-20 lg:px-8 xl:my-28 flex justify-between flex-wrap">
          {products &&
            products.slice(4).map((p, index) => (
              <div
                key={index}
                className="bg-white shadow overflow-hidden rounded-lg w-52 my-4"
              >
                <img className="h-32 w-full" src={p.img} />
                <div className="flex justify-between">
                  <div className="text-lg ml-4 my-2 tracking-tight font-extrabold text-gray-900 sm:text-lg md:text-lg">
                    {p.name}
                  </div>
                  <div className="text-lg mr-4 my-2 tracking-tight font-extrabold text-gray-900 sm:text-lg md:text-lg">
                    RM {formatTwoDecimal(p.price)}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
      <section id="products" className="block w-full bg-indigo-600">
        <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
          <span className="flex justify-center py-12">
            Setel Mart Products
            <br />
          </span>
        </h1>
        <div className="lg:inset-y-0 lg:px-8 flex-wrap w-3/4 flex justify-center mx-auto pb-40">
          {products &&
            products.map((p: Product, index: number) => (
              <div
                key={index}
                className="bg-white shadow overflow-hidden rounded-lg w-60 my-4 mx-4"
              >
                <img className="h-32 w-full" src={p.img} />
                <div className="flex justify-between">
                  <div className="text-lg ml-4 my-2 tracking-tight font-extrabold text-gray-900 sm:text-lg md:text-lg">
                    {p.name}
                  </div>
                  <div className="text-lg mr-4 my-2 tracking-tight font-extrabold text-gray-900 sm:text-lg md:text-lg">
                    RM {formatTwoDecimal(p.price)}
                  </div>
                </div>
                <p className="text-md ml-4 text-gray-500">{p.nutrient}</p>
                <div className="flex justify-end">
                  <div
                    className="m-4 rounded-md shadow cursor-pointer flex items-center justify-center p-2 border border-transparent text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => updateCart(p)}
                  >
                    Add
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </Layout>
  );
}
