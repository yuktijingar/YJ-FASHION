import { useState } from "react";
import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import Category from "../../components/category/Category";

const AllProduct = () => {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { loading , getAllProduct} = context;

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Add to cart")
    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Delete cart")
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        window.scrollTo(1, 1); // Scroll to top when component mounts or currentPage changes
    }, [currentPage]);

    // Calculate index range for displaying products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    // Function to change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Slice the products array to display only products for the current page
    const productsToShow = getAllProduct.slice(indexOfFirstProduct, indexOfLastProduct);

    // Calculate total number of pages
    const totalPages = Math.ceil(getAllProduct.length / productsPerPage);

    // Generate an array of page numbers for pagination
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Function to handle pagination ellipsis
    const handleEllipsis = (index) => {
        const isWithinRange = Math.abs(currentPage - index) <= 1;
        const isFirstOrLastPage = index === 1 || index === totalPages;
        return isWithinRange || isFirstOrLastPage;
    }

    return (
        <Layout>
            <div className="py-8">
                {/* Select Category  */}
                <div className="">
                    <h1 className=" text-center mb-5 text-2xl font-semibold">Select Product By Category</h1>
                    <Category/>
                </div>
                <br />

                {/* Heading  */}
                <div className="">
                    <h1 className=" text-center mb-5 text-2xl font-semibold">All Products</h1>
                </div>

                {/* main  */}
                <section className="text-gray-600 body-font">
                    <div className="container px-5 lg:px-0 py-5 mx-auto">
                        <div className="flex justify-center">
                            {loading && <Loader/>}
                        </div>
                        <div className="flex flex-wrap -m-4">
                            {productsToShow.map((item, index) => {
                                const { id, title, price, productSize, productImageUrl } = item;
                                return (
                                    <div key={index} className="p-4 w-full md:w-1/4">
                                        <div className="h-full border border-gray-800 rounded-xl overflow-hidden shadow-md cursor-pointer">
                                            <img
                                                onClick={()=> navigate(`/productinfo/${id}`)}
                                                className="lg:h-80  h-96 w-full"
                                                src={productImageUrl}
                                                alt="blog"
                                            />
                                            <div className="p-6">
                                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-800 mb-1 text-center">
                                                    YJ-Fashion
                                                </h2>
                                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3" onClick={() => navigate(`/productinfo/${id}`)}>
                                                    {title.substring(0, 25)}
                                                </h1>
                                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                    Size : {productSize}
                                                </h1>
                                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                    Rs. ₹{price}
                                                </h1>
                                                <div className="flex justify-center ">
                                                    {cartItems.some((p)=> p.id === item.id) ? (
                                                        <button
                                                            onClick={() => deleteCart(item)}
                                                            className=" bg-red-700 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                                                        >
                                                            Delete To Cart
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => addCart(item)}
                                                            className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                                                        >
                                                            Add To Cart
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Pagination controls */}
                <div className="flex justify-center mt-8">
                    <ul className="flex list-none rounded-md border border-gray-50 divide-x divide-gray-50">
                        <li>
                            <button
                                className="px-2 py-2 flex items-center font-semibold bg-pink-600 text-white rounded-md"
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <i className="fas fa-chevron-left mr-2"></i>
                                Previous
                            </button>
                        </li>
                        {pageNumbers.map((number, index) => {
                            if (handleEllipsis(number) || index === 0 || index === pageNumbers.length - 1) {
                                return (
                                    <li key={index} className="ml-1 md:ml-3">
                                        <button
                                            className={`px-3 py-2 md:px-4 md:py-2 rounded-full ${currentPage === number ? 'bg-pink-600 text-white' : 'bg-orange-200 text-gray-700'}`}
                                            onClick={() => paginate(number)}
                                        >
                                            {number}
                                        </button>
                                    </li>
                                );
                            } else if (Math.abs(currentPage - number) === 2) {
                                return (
                                    <li key={index} className="ml-1 md:ml-3">
                                        <span>...</span>
                                    </li>
                                );
                            }
                            return null;
                        })}
                        <li className="ml-1 md:ml-3">
                            <button
                                className="px-2 py-2 flex items-center font-semibold bg-pink-600 text-white rounded-md"
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                                <i className="fas fa-chevron-right ml-2"></i>
                            </button>
                        </li>
                    </ul>
                </div>
                {/* Up arrow button */}
                <div className="fixed bottom-4 right-4">
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="bg-pink-600 hover:bg-red-600 w-12 h-12 text-white rounded-full flex items-center justify-center"
                    >
                        <i className="fas fa-arrow-up"></i>
                    </button>
                </div>
            </div>
        </Layout>
    );
}

export default AllProduct;
