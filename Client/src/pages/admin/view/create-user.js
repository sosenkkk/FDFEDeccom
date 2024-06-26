import { useRef } from "react";
import Link from "next/link";
import { BASE_URL } from "../../../../helper/helper";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "@nextui-org/react";

const SignUp = (props) => {
  const [buttondisabled, setbuttondisabled] = useState(false)
  const isAuth = useSelector((state)=>state.auth.isAuthenticated)
  
  const toast = useToast();
  const router = useRouter();
  const emailRef = useRef();
  const isSellerRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const validateEmail = new RegExp(
    /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/
  );
  const validateEmailHandler = (email) => {
    if (validateEmail.test(email)) {
      return true;
    } else {
      toast({
        title: "Enter correct email address",
        status: "error",
        isClosable: true,
      });
      return false;
    }
  };
  const validatePasswordHandler = (password) => {
    if (password.trim().length > 5) {
      return true;
    } else {
      toast({
        title: "Password must contain atleast 6 characters.",
        status: "error",
        isClosable: true,
      });
      return false;
    }
  };
  const validateConfirmPasswordHandler = (password, confirmpassword) => {
    if (password.trim() === confirmpassword.trim()) {
      return true;
    } else {
      toast({
        title: "Passwords does not match.",
        status: "error",
        isClosable: true,
      });
      return false;
    }
  };

  const signUpHandler = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmpassword = confirmPasswordRef.current.value;
    const validation =
      validateEmailHandler(email) &&
      validatePasswordHandler(password) &&
      validateConfirmPasswordHandler(password, confirmpassword);
    if (validation) {
      setbuttondisabled(true)
      const response = await fetch(BASE_URL + "admin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          isSeller: isSellerRef.current.checked,
        }),
      });
      const res = await response.json();
      if (response.status == 433) {
      setbuttondisabled(false)
        router.push("/admin");
        toast({
          title: res.message,
          status: "error",
          isClosable: true,
        });
      } else if (response.status == 201) {
      setbuttondisabled(false)
      toast({
          title: res.message,
          status: "success",
          isClosable: true,
        });
        router.push("/admin");
      }
    } else {
      setbuttondisabled(false)
      router.push("/admin");
    }
  };
  return (
    <>
      <section className="bg-light-theme dark:bg-dark-theme  ">
        <div className="flex flex-col h-screen items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow-xl  md:mt-0 sm:max-w-md xl:p-0 dark:bg-[#171717] transition-colors">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-700 md:text-2xl dark:text-gray-300">
                Create User you want
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={signUpHandler}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    User email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="bg-gray-50 transition-colors border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2 dark:bg-[#272727] dark:border-[#3b3b3b] dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                    placeholder="name@company.com"
                    required=""
                    ref={emailRef}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    User Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 transition-colors border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2 dark:bg-[#272727] dark:border-[#3b3b3b] dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                    required=""
                    ref={passwordRef}
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmpassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm User Password
                  </label>
                  <input
                    type="password"
                    name="confirmpassword"
                    id="confirmpassword"
                    placeholder="••••••••"
                    className="bg-gray-50 transition-colors border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2 dark:bg-[#272727] dark:border-[#3b3b3b] dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                    required=""
                    ref={confirmPasswordRef}
                  />
                </div>
                <div>
                    <label
                        htmlFor="isSeller"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Is a seller?
                    </label>
                    <input
                        type="checkbox"
                        name="isSeller"
                        id="isSeller"
                        className="bg-gray-50 transition-colors border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block p-2 dark:bg-[#272727] dark:border-[#3b3b3b] dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                        ref={isSellerRef}
                    />
                    </div>

                <div>
                  {
                    !buttondisabled && 
                    <button
                    type="submit"
                    className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                  >
                    Create User
                  </button>
                  }
                  {
                    buttondisabled && 
                    <div
                    className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-1 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800 cursor-not-allowed"
                  >
                    <Spinner />
                  </div>
                  }
                  
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
