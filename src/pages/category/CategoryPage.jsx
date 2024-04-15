import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { useContext, useEffect } from "react";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const CategoryPage = () => {
  const { categoryname } = useParams();

  const context = useContext(myContext);
  const { getAllProduct, loading } = context;

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        // console.log(item)
        dispatch(addToCart(item));
        toast.success("Add to cart")
    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Delete cart")
    }

    // console.log(cartItems)

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top when component mounts or currentPage changes
    }, [currentPage]);

    // Calculate index range for displaying products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Slice the filtered products array to display only products for the current page
  const filterProduct = getAllProduct.filter((obj) =>
    obj.category.includes(categoryname)
  );
  const productsToShow = filterProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <Layout>
      <div className="mt-10">
        {/* Heading  */}
        <div className="">
          <h1 className=" text-center mb-5 text-2xl font-semibold first-letter:uppercase">
            {categoryname}
          </h1>
        </div>
        {loading ?

        <div className="flex justify-center">
            <Loader/>
        </div>
        :
        <section className="text-gray-600 body-font">
          {/* main 2 */}
          <div className="container px-5 py-5 mx-auto">
            {/* main 3 */}
            <div className="flex flex-wrap -m-4 justify-center">
                {filterProduct.length > 0 ? 
                <>

              {productsToShow.map((item, index) => {
                const { id, title, price,productSize, productImageUrl } = item;
                return (
                  <div key={index} className="p-4 w-full md:w-1/4">
                    <div className="h-full border border-gray-800 rounded-xl overflow-hidden shadow-md cursor-pointer">
                      <img
                        onClick={() => navigate(`/productinfo/${id}`)}
                        className="lg:h-80  h-96 w-full"
                        src={productImageUrl}
                        alt="img"
                      />
                      <div className="p-6">
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-800 mb-1 text-center">
                          YJ-Fashion
                        </h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                          {title.substring(0, 25)}
                        </h1>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        Size : {productSize}
                        </h1>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        Rs. ₹{price}
                        </h1>

                        <div className="flex justify-center ">
                        {cartItems.some((p) => p.id === item.id)
                        ?

                          <button 
                          onClick={() => deleteCart(item)}
                          className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold">
                            Delete From Cart
                          </button>
                          :
                          <button 
                          onClick={() => addCart(item)}
                          className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold">
                            Add To Cart
                          </button>
                        }
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}


                </>

                :
                <div>
                <div className="flex justify-center">
                    <img className=" mb-2" src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png" alt="" />
                </div>
                <h1 className=" text-black text-xl">No {categoryname} product found</h1>
            </div>
            }
              
            </div>
          </div>
        </section>
    }

     {/* Pagination controls */}
     <div className="flex justify-center mt-8 mb-8">
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
            {Array(Math.ceil(filterProduct.length / productsPerPage))
              .fill()
              .map((_, index) => (
                <li key={index} className="ml-3">
                  <button
                    className={`px-4 py-2 rounded-full ${
                      currentPage === index + 1
                        ? "bg-pink-600 text-white"
                        : "bg-orange-200 text-gray-700"
                    }`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            <li className="ml-3">
              <button
                className="px-4 py-2 flex items-center font-semibold bg-pink-600 text-white rounded-md"
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(filterProduct.length / productsPerPage)
                }
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
};

export default CategoryPage;
