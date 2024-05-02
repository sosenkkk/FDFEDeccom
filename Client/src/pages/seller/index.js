import { useSelector } from "react-redux";
import AccountCard from "../../../components/cards/accountCard";
import { BASE_URL } from "../../../helper/helper";
import { useRouter } from "next/router";
import {  Spinner } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';

export default function seller(props) {
  const toast = useToast()
  const [seller, setseller]= useState(false)
  const userInfo = useSelector((state) => state.user.userInfo);
  const router = useRouter()
  const fetchData = async(token)=>{
    const result = await fetch(BASE_URL + "seller/get-add-product", {
      headers: {
        Authorization: "Bearer " + token,
      },
      method:"POST"
    });
    const res = await result.json();
    if (result.status === 201) {
      setseller(true)
    } else {
      router.push("/404")
    }
  }
  useEffect(()=>{
    const token = localStorage.getItem("token")
    fetchData(token)
  },[])
  return (
    <>{seller && 
      <div className="w-full min-h-[500px] bg-[#fff]  dark:bg-[#171717] dark:text-gray-200 transition-colors pt-32 p-8 md:p-28">
        <div className=" text-center sm:text-left">
          <h1 className="text-3xl ">Hello Merchant.</h1> 
          
        </div>
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row  gap-8 flex-wrap w-full accountContainer">
            <AccountCard
              title="Add a product"
              link="/seller/add-product"
              description="Add a product."
            />
           
            <AccountCard
              title="User Orders"
              link="/seller/view-orders"
              description="View Customer orders."
            />
            <AccountCard
              title="My Products"
              link="/seller/view-products"
              description="View my products."
            />
           <AccountCard
              title="Order Status"
              link="/seller/order-status"
              description="Change order status."
            />
          </div>
        </div>
      </div>}
      {!seller && 
        <div className="min-h-[500px] pt-28 transition-colors md:pt-20 bg-[#f9f9f9] dark:bg-[#202020]  p-4 sm:px-8 py-0 flex items-center justify-around">
          <Spinner size="lg" color="secondary" />
        </div>
      }
    </>
  );
}


