import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { Spinner } from "@nextui-org/react";

import { BASE_URL } from "../../../../helper/helper";

const ForgotPassword = (props) => {
  const [buttondisabled, setbuttondisabled] = useState(false)
  const toast = useToast();
  const router = useRouter();
  const emailRef = useRef();
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
  const validateConfirmPasswordHandler = (newpassword, confirmpassword) => {
    if (newpassword.trim() === confirmpassword.trim()) {
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

  const forgotPasswordHandler = async (event) => {
    event.preventDefault();
    const { userId, token } = router.query;
    const email = emailRef.current.value;
    const newpassword = passwordRef.current.value;
    const confirmpassword = confirmPasswordRef.current.value;
    const validation =
      validateEmailHandler(email) &&
      validatePasswordHandler(newpassword) &&
      validateConfirmPasswordHandler(newpassword, confirmpassword);
    if (validation) {
      setbuttondisabled(true)
      const response = await fetch(
        BASE_URL + `reset-password/${userId}/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: newpassword,
          }),
        }
      );
      const res = await response.json();
      if (response.status == 433) {
      setbuttondisabled(false)
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
        router.push("/auth/login");
      } else if (response.status == 404) {
      setbuttondisabled(false)
      toast({
          title: res.message,
          status: "error",
          isClosable: true,
        });
      }
    }
  };
  return (
    <>
      <section className="bg-light-theme dark:bg-dark-theme ">
        <div className="flex flex-col h-screen items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0 dark:bg-[#171717] transition-colors">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-700 md:text-2xl dark:text-gray-300">
                Change your password
              </h1>
              <form
                className="space-y-4"
                action="#"
                onSubmit={forgotPasswordHandler}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="bg-gray-50 transition-colors border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-[#272727] dark:border-[#3b3b3b] dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                    placeholder="namecompany@any.com"
                    ref={emailRef}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 transition-colors border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-[#272727] dark:border-[#3b3b3b] dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                    required=""
                    ref={passwordRef}
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmpassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmpassword"
                    id="confirmpassword"
                    placeholder="••••••••"
                    className="bg-gray-50 transition-colors border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-[#272727] dark:border-[#3b3b3b] dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                    required=""
                    ref={confirmPasswordRef}
                  />
                </div>
                <div>
                {
                    !buttondisabled && 
                    <button
                    type="submit"
                    className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                  >
                    Reset Password
                  </button>
                  }
                {
                    buttondisabled && 
                    <div
                    className="w-full cursor-not-allowed text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-1 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                  >
                    <Spinner />
                  </div>
                  }
                </div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account yet?{" "}
                  <Link
                    href="/auth/login"
                    className="font-medium text-teal-600 hover:underline dark:text-teal-500"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
