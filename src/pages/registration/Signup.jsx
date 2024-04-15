/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import Navbar from "../../components/navbar/Navbar";

const Signup = () => {
    const context = useContext(myContext);
    const {loading, setLoading}  = context;

    //Navigate
    const naviagte = useNavigate();

    //User SignUp State
    const [userSignup, setUserSignup] = useState({
        name : "",
        email : "",
        password : "",
        role : "user",
    });

     // State to track whether password is visible or not
     const [showPassword, setShowPassword] = useState(false);

     const togglePasswordVisibility = () => {
         setShowPassword(!showPassword);
     };

    //User Signup Function
    const userSignupFunction = async () =>{
        //validation
        if (userSignup.name === "" || userSignup.email === "" || userSignup.password === ""){
            return toast.error("All fields are required!");
        }
         
        setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

            // create user object
            const user = {
                name: userSignup.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userSignup.role,
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

            // create user Refrence
            const  userReference = collection(fireDB, "user");

             // Add User Detail
             addDoc(userReference, user)

             setUserSignup({
                name: "",
                email: "",
                password: ""
            })

            toast.success("Signup Successfully");

            setLoading(false);
            naviagte('/login')

        } catch (error) {
            toast.error("Email Already Exist");
            console.log(error);
            setLoading(false);
            
        }

    }

    return (
        <div>
            <Navbar/>
        <div className='flex justify-center items-center h-screen'>
            {/* Loader Component */}
            {/* {loading && <Loader/>} */}
            {/* Login Form  */}
            <div className="login_Form bg-pink-50 px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">

                {/* Top Heading  */}
                <div className="mb-5">
                <img src="https://firebasestorage.googleapis.com/v0/b/yj---fashion.appspot.com/o/YJ-FASHION%20LOGO.png?alt=media&token=db1a0298-5bef-4164-bc8c-6de12b2f6bda" alt="logo" className='mx-auto' style={{width:'300px',height:'50px'}} />
                    <h2 className='text-center text-2xl font-bold text-pink-500 '>
                        Signup
                    </h2>
                </div>

                {/* Input One  */}
                <div className="mb-3 relative">
                    <input
                        type="text"
                        placeholder='Full Name'
                        value={userSignup.name}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                name : e.target.value
                            })
                        }}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200 pr-10'
                    />
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-800 absolute right-3 top-1/2 transform -translate-y-1/2" viewBox="0 0 512 512" fill="currentColor" stroke="currentColor">
                    <path d="M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z"/>
                    </svg>
                </div>

                {/* Input Two  */}
                <div className="mb-3 relative">
                    <input
                        type="email"
                        placeholder='Email Address'
                        value={userSignup.email}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                email : e.target.value
                            })
                        }}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200 pr-10'
                        style={{ paddingRight: "40px" }}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-800 absolute right-3 top-1/2 transform -translate-y-1/2" viewBox="0 0 512 512" fill="currentColor" stroke="currentColor">
                     <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/>
                    </svg>
                </div>

                {/* Input Three  */}
                <div className="mb-5 relative">
                    <input
                       type={showPassword ? "text" : "password"}
                        placeholder='Password'
                        value={userSignup.password}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                password : e.target.value
                            })
                        }}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                    {/* Eye Icon to toggle password visibility */}
                    <span
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M2 10c0-1.635 1.29-3.142 3.261-4.228A15.032 15.032 0 0110 4c1.66 0 3.221.266 4.609.754A5.495 5.495 0 0117.42 10c.134.692.21 1.402.219 2.114l-1.473-.29A3.995 3.995 0 0016 10a4 4 0 10-8 0zm1.858 1.566l-1.42 1.42A7.03 7.03 0 015 10c0-.93.145-1.825.412-2.684l1.442.287c-.215.598-.354 1.236-.41 1.897zM10 6a6 6 0 00-5.196 3.027l1.42 1.42A7.03 7.03 0 0110 7c.93 0 1.825.145 2.684.412l1.42-1.42A6 6 0 0010 6z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 2c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm0 2a6 6 0 100 12 6 6 0 000-12zm0 3a3 3 0 00-3 3c0 .733.267 1.402.707 1.924l1.686-1.686C9.402 8.267 8.733 8 8 8a3 3 0 000 6c1.13 0 2.104-.627 2.624-1.548l1.686-1.686C11.402 9.267 10.733 9 10 9zm0 2a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                                </svg>
                            )}
                        </span>
                </div>

                {/* Signup Button  */}
                <div className="mb-5">
                    <button
                    onClick={userSignupFunction}
                        type='button'
                        className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        Signup
                    </button>
                </div>

                <div>
                    <h2 className='text-black'>Have an account <Link className=' text-pink-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>

            </div>
        </div>
        </div>
    );
}

export default Signup;