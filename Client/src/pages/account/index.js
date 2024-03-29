import Link from "next/link";
import { useSelector } from "react-redux";
import AccountCard from "./../../../components/cards/accountCard";
import { useState, useRef } from "react";
import { useToast } from "@chakra-ui/react";
import Modal from "../../../components/Modal";
import { BASE_URL } from "../../../helper/helper";
import { Spinner } from "@nextui-org/react";

export default function Account() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const messageRef = useRef();
  const token = useSelector((state) => state.auth.userToken);
  const toast = useToast();
  const [buttondisabled, setbuttondisabled] = useState(false)


  const validationHandler = (message) => {
    if (message.trim().length < 6) {
      return false;
    }
    return true;
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const contactHandler = async (event) => {
    event.preventDefault();
    const message = messageRef.current.value;
    const validation = validationHandler(message);
    if (validation) {
      setbuttondisabled(true)
      const response = await fetch(BASE_URL + "contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          message: message,
        }),
      });
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
        closeModal();
      }
    } else {
      toast({
        title: "Message too short. Atleast 6 characters long.",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <div className="w-full bg-[#fff]  dark:bg-[#171717] dark:text-gray-200 transition-colors pt-32 p-8 md:p-24">
        <div className=" text-center sm:text-left">
          <h1 className="text-3xl ">Hello {userInfo.firstName}!</h1>
          <Link className="md:text-xl text-teal-700 dark:text-teal-500 hover:underline" href="/account/details">
            Manage your account
          </Link>
        </div>
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row  gap-8 flex-wrap w-full accountContainer">
            <AccountCard
              title="Your Orders"
              link="/account/my-orders"
              description="Get info about your orders"
            />
            <AccountCard
              title="Security"
              link="/account/change-password"
              description="Change your password."
            />
            <AccountCard
              title="Cart"
              link="/account/my-cart"
              description="What's in your cart."
            />
            <AccountCard
              title="Contact Us"
              onClick={openModal}
              description="Order related or any query."
            />
            <Modal isOpen={isModalOpen} onClose={closeModal} maxWidth="768px">
              <form
                onSubmit={contactHandler}
                action="#"
                className="bg-[#f7f7f7] dark:bg-[#171717] rounded-lg shadow-xl  p-4 pt-6 sm:py-8 sm:px-12 "
              >
                <h1 className="text-3xl sm:text-4xl text-gray-800 dark:text-gray-300 mb-4">
                  Contact us
                </h1>
                <div className="mb-6 col-span-2 sm:col-span-1">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-teal-700 block w-full p-2.5 dark:bg-[#262626] dark:border-[#3b3b3b] dark:placeholder-gray-400 dark:text-white  dark:focus:border-teal-700"
                    placeholder={userInfo.email}
                    readOnly
                    style={{ cursor: "not-allowed" }}
                  />
                </div>
                <div className="mb-6 col-span-2 sm:col-span-1">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    ref={messageRef}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-teal-700 block w-full p-2.5 dark:bg-[#262626] dark:border-[#3b3b3b] dark:placeholder-gray-400 dark:text-white  dark:focus:border-teal-700"
                    placeholder="What you wanna talk about?"
                  />
                </div>

                {
                    !buttondisabled && 
                    <button
                    type="submit"
                    className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                  >
                    Submit
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
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
