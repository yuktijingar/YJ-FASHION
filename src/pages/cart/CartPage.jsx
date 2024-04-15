import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Trash } from 'lucide-react'
import { decrementQuantity, deleteFromCart, incrementQuantity } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Delete cart")
    }

    const handleIncrement = (id) => {
        const currentItem = cartItems.find(item => item.id === id);
        if (currentItem && currentItem.quantity < 10) {
            dispatch(incrementQuantity(id));
        } else {
            toast.error("Maximum quantity reached (10)");
        }
    };

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    };

    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return function cleanup() {
            window.removeEventListener('scroll', checkScrollTop);
        }
    });

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 100) {
            setShowScroll(true);
        } else if (showScroll && window.pageYOffset <= 100) {
            setShowScroll(false);
        }
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const [razorpayInitialized, setRazorpayInitialized] = useState(false);
    useEffect(() => {
        const loadRazorpayScript = async () => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            script.onload = () => setRazorpayInitialized(true);
            document.body.appendChild(script);
        };

        loadRazorpayScript();

        return () => {
            document.body.removeChild(document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]'));
        };
    }, []);

    // const cartQuantity = cartItems.length;

    //Cart Item Total
    const cartItemTotal = cartItems.map(item => item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);

    const cartTotal = cartItems.map(item => item.price * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])


    // Buy Now Function
    const user = JSON.parse(localStorage.getItem('users'));

     // Address Information State
     const [addressInfo, setAddressInfo] = useState({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    //Buy Now Function
    const buyNowFunction = () => {
        // validation 
        if (addressInfo.name === "" || addressInfo.address === "" || addressInfo.pincode === "" || addressInfo.mobileNumber === "") {
            return toast.error("All Fields are required")
        }

    // Order Info 
    const orderInfo = {
        cartItems,
        addressInfo,
        email: user.email,
        userid: user.uid,
        status: "confirmed",
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    }

    try {
        const orderRef = collection(fireDB, 'order');
        addDoc(orderRef, orderInfo);
        setAddressInfo({
            name: "",
            address: "",
            pincode: "",
            mobileNumber: "",
        })
        toast.success("Order Placed Successfull")
    } catch (error) {
        console.log("Failed to place order")
    }

  }
  // Razorpay payment integration
const handleRazorpayPayment = async () => {
    if (!razorpayInitialized) {
        return toast.error("Razorpay not initialized yet. Please wait.");
    }

    // Validate address info
    if (addressInfo.name === "" || addressInfo.address === "" || addressInfo.pincode === "" || addressInfo.mobileNumber === "") {
        return toast.error("All Fields are required");
    }

    const options = {
        key: "rzp_test_CkOgo94JV6wewb",
        key_secret: "rzp_test_CkOgo94JV6wewb",
        amount: parseInt(cartTotal * 100),
        currency: "INR",
        order_receipt: 'order_rcptid_' + user.name,
        name: "YJ - FASHION",
        description: "Payment for items in shopping cart",
        handler: function (response) {
            console.log(response);
            toast.success('Payment Successful');

            // Call buyNowFunction
            buyNowFunction();

            // You may add code here to update the order status in your database or perform any other actions after successful payment
        },
        theme: {
            color: "#D81B60"
        }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
};
   

    return (
        <Layout>
            <div className="container mx-auto px-4 max-w-7xl  lg:px-0">
                <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Shopping Cart
                    </h1>
                    <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                        <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
                            <h2 id="cart-heading" className="sr-only">
                                Items in your shopping cart
                            </h2>
                            <ul role="list" className="divide-y divide-gray-200">
                                {cartItems.length > 0 ?

                                    <>
                                        {cartItems.map((item, index) => {
                                            const { id, title, price, productImageUrl,productSize, quantity, category } = item
                                            return (
                                                <div key={index} className="">
                                                    <li className="flex py-6 sm:py-6 ">
                                                        <div className="flex-shrink-0">
                                                        <Link to={`/productinfo/${id}`}>
                                                            <img
                                                                src={productImageUrl}
                                                                alt="img"
                                                                className="sm:h-38 sm:w-38 h-28 w-24 rounded-md object-contain object-center"
                                                            />
                                                        </Link>
                                                        </div>

                                                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                                            <div className="pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                                <div>
                                                                    <div className="flex justify-between">
                                                                        <h3 className="text-mm">
                                                                            <div className="font-semibold text-black">
                                                                            <Link to={`/productinfo/${id}`}> 
                                                                                {title}
                                                                            </Link>
                                                                            </div>
                                                                        </h3>
                                                                    </div>
                                                                    <div className="mt-1 flex text-sm">
                                                                        <p className="text-sm text-gray-600">Category : {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}</p>
                                                                    </div>
                                                                    <div className="mt-1 flex items-end">
                                                                        <p className="text-sm font-medium text-gray-900">
                                                                           Size : {productSize}
                                                                        </p>
                                                                    </div>
                                                                    <div className="mt-1 flex items-end">
                                                                        <p className="text-sm font-medium text-gray-900">
                                                                           Price : ₹ {price}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <div className="mb-2 flex">
                                                        <div className="min-w-24 flex">
                                                            <button onClick={() => handleDecrement(id)} type="button" className="h-7 w-7" >
                                                                -
                                                            </button>
                                                            <input
                                                                type="text"
                                                                className="mx-1 h-7 w-9 rounded-md border text-center"
                                                                value={quantity}
                                                            />
                                                            <button onClick={() => handleIncrement(id)} type="button" className="flex h-7 w-7 items-center justify-center">
                                                                +
                                                            </button>
                                                        </div>
                                                        <div className="ml-6 flex text-sm">
                                                            <button onClick={() => deleteCart(item)} type="button" className="flex items-center space-x-1 px-2 py-1 pl-0">
                                                                <Trash size={12} className="text-red-500" />
                                                                <span className="text-xs font-medium text-red-500">Remove</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </>
                                    :

                                    <div className=" justify-center items-center h-screen">
                                    <div className="text-center mt-20">
                                      <div className="flex justify-center">
                                        <img className="mb-2" src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png" alt="" />
                                      </div>
                                      <h1 className="text-black text-xl">No Product Found in Your Cart</h1>
                                    </div>
                                  </div>
                                    
                                }
                            </ul>
                        </section>
                        {/* Order summary */}
                        <section
                            aria-labelledby="summary-heading"
                            className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
                        >
                            <h2
                                id="summary-heading"
                                className=" border-b border-gray-600 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
                            >
                                Price Details
                            </h2>
                            <div>
                                <dl className=" space-y-1 px-2 py-4">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-gray-800">Price ({cartItemTotal} item)</dt>
                                        <dd className="text-sm font-medium text-gray-900">₹ {cartTotal}</dd>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="flex text-sm text-gray-800">
                                            <span>Delivery Charges</span>
                                        </dt>
                                        <dd className="text-sm font-medium text-green-700">Free</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-y border-dashed py-4 ">
                                        <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                                        <dd className="text-base font-medium text-gray-900">₹ {cartTotal}</dd>
                                    </div>
                                </dl>
                                <div className="px-2 pb-4 font-medium text-green-700">
                                    <div className="flex gap-4 mb-6">
                                    {user
                                            ? <BuyNowModal
                                                addressInfo={addressInfo}
                                                setAddressInfo={setAddressInfo}
                                                buyNowFunction={() => handleRazorpayPayment()}
                                            /> 
                                            : 
                                            <Navigate to={'/login'}/>
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>
            </div>

            {showScroll && (
                <button onClick={scrollTop} className="fixed bottom-4 right-4 bg-pink-600 hover:bg-red-600 w-12 h-12 text-white rounded-full flex items-center justify-center">
                    <i className="fas fa-arrow-up"></i>
                </button>
            )}

        </Layout>
    );
}

export default CartPage;