import Layout from "../../components/layout/Layout";
import { useContext } from "react";
import myContext from "../../context/myContext";

const AboutUs = () => {
  const context = useContext(myContext);
  const { loading } = context;

  return (
    <Layout>
      <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="flex flex-wrap items-center mb-24 -mx-4">
            <div className="w-full md:w-1/2 px-4">
              <div className="lg:pr-20">
                <div className="mb-6">
                  <h2 className="mb-6 text-2xl font-semibold leading-loose tracking-wide text-gray-700 md:text-3xl dark:text-gray-300">
                    About YJ-FASHION
                  </h2>
                  <p className="text-gray-700 dark:text-gray-400">
                    At YJ-FASHION, we're passionate about bringing the latest
                    fashion trends directly to your fingertips. Founded on the
                    belief that style should be accessible to all, we curate a
                    diverse selection of high-quality clothing that caters to
                    every taste and occasion. we strive to create an online
                    shopping experience that empowers individuals to express
                    themselves confidently through their personal style. Welcome
                    to our YJ-FASHION community, where every purchase tells a
                    story and every customer is valued.
                  </p>
                </div>
                <div className="mb-6">
                  <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                    Our Mission
                  </h2>
                  <p className="text-gray-700 dark:text-gray-400">
                    Catalyzing a revolution in online clothing shopping, our
                    mission is to simplify the user journey. Beginning with a
                    seamless signup process, we empower users to navigate
                    through our curated selection effortlessly. From discovering
                    their perfect product to effortlessly adding it to their
                    cart and finalizing the order, we're redefining convenience
                    and delight in the world of YJ-FASHION
                  </p>
                </div>
                <div className="mb-6">
                  <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                    Our Vision
                  </h2>
                  <p className="text-gray-700 dark:text-gray-400">
                    In our vision, we're creating a hassle-free online clothing
                    shopping experience. Users sign up, explore our curated
                    collection, add favorites to their cart, and effortlessly
                    complete orders. We're making YJ-FASHION discovery and
                    purchasing seamless and enjoyable."
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-4">
              <div className="">
                <div className="">
                  <img
                    className="w-full rounded-lg"
                    src="https://firebasestorage.googleapis.com/v0/b/yj---fashion.appspot.com/o/YJ-FASHION-SHOP6.jpeg?alt=media&token=c76cbbd2-dbd6-43da-bfc9-9c3f730071de"
                    alt="About Us"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUs;
