/* eslint-disable react/no-unescaped-entities */

const Testimonial = () => {
    return (
        <div>
            <section className="text-gray-600 body-font mb-10">
                {/* main  */}
                <div className="container px-5 py-10 mx-auto">
                    {/* Heading  */}
                    <h1 className=' text-center text-3xl font-bold text-black' >Testimonial</h1>
                    {/* para  */}
                    <h2 className=' text-center text-2xl font-semibold mb-10' >What our <span className=' text-pink-500'>customers</span> are saying</h2>

                    <div className="flex flex-wrap -m-4">
                        {/* Testimonial 1 */}
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-pink-200 bg-gray-100" src="https://firebasestorage.googleapis.com/v0/b/yj---fashion.appspot.com/o/women%20img.jpg?alt=media&token=626fe9b6-b44a-4ce2-ac82-0082c9583746" />
                                <p className="leading-relaxed">YJ-Fashion is my go-to destination for trendy clothes! Their extensive collection offers something for every style, and the quality is top-notch. From casual basics to statement pieces, I always find exactly what I need to elevate my wardrobe. Plus, their customer service is exceptional my shopping experience truly enjoyable</p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Priya Sharma</h2>
                                <p className="text-gray-500">Customer</p>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-pink-200 bg-gray-100" src="https://firebasestorage.googleapis.com/v0/b/yj---fashion.appspot.com/o/PHOTO.jpg?alt=media&token=df8f313e-b4cd-4784-9bbd-34015d78c198" />
                                <p className="leading-relaxed">YJ-Fashion is a fashionista's dream come true! With an incredible selection of chic apparel, I'm constantly inspired to revamp my wardrobe. Their intuitive website makes browsing a breeze, and the fast shipping ensures I can rock the latest trends in no time. Shopping here is a delight every time</p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Yukti Jingar</h2>
                                <p className="text-gray-500">Customer</p>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="lg:w-1/3 lg:mb-0 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-pink-200 bg-gray-100" src="https://firebasestorage.googleapis.com/v0/b/yj---fashion.appspot.com/o/OTHER%20IMAGE-1.jpg?alt=media&token=322ea695-ff5a-4c03-bcfa-a0fc921fd1f2" />
                                <p className="leading-relaxed">YJ-Fashion never disappoints! From stunning dresses to cozy sweaters, their collection caters to every occasion and season. The attention to detail in their designs is evident, and the affordable prices are just the cherry on top. Trustworthy, stylish, and always on-trend - YJ-Fashion is my fashion sanctuary</p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Neel Makwana</h2>
                                <p className="text-gray-500">Customer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Testimonial