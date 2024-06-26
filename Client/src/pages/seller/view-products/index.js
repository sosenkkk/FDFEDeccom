import { BASE_URL } from "../../../../helper/helper";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Modal from "../../../../components/Modal";
import { useEffect, useState } from "react";
import ProductBar from "../../../../components/Navbar/ProductBar";
import ProductCard from "../../../../components/products/productCard";
import { Pagination , Spinner } from "@nextui-org/react";
import { useSelector } from "react-redux";

export default function sellerProducts() {
  const [productsLoaded, setproductsLoaded] = useState(false);
  const [seller, setseller]= useState(false)
  const [products, setproducts] = useState([]);
  // const [userId, setUserId] = useState();
  const [page, setpage] = useState(1);
    const [totalPage, settotalPage] = useState(1);
    const [filter, setfilter] = useState("");
    const [sort, setsort] = useState("");
    const router = useRouter();
    const toast = useToast();
    const [isModalOpen, setModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const token = useSelector((state)=>state.auth.userToken)
    const openModal = (id) => {
      setItemToDelete(id);
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setItemToDelete(null)
      setModalOpen(false);
    };
  const fetchProducts = async (token, userId) => {
    const result = await fetch(
      BASE_URL + `seller/view-my-products/${userId}?page=${page}&filter=${filter}&sort=${sort}`,{
        method:"POST",
        headers:{
            Authorization:"Bearer "+ token,
        },
        body:JSON.stringify({userId})
      }
    );
    const res = await result.json();
    if (result.status == 201) {
      setseller(true)
      setproducts(res.products);
      const pages = Math.ceil(res.totalProducts / 8);
      settotalPage(pages);
      setproductsLoaded(true)
    } else if(result.status == 404){
      router.push("/404");
      
    }else {
      router.push("/");
      toast({
        title: res.message,
        status: "error",
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    setproductsLoaded(false)
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")
    fetchProducts(token, userId);
  }, [page,  sort, filter]);
  const deleteProductHandler = async () => {
    const id = itemToDelete;
    const result = await fetch(BASE_URL + "delete-product/"+id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
      const res = await result.json()
      if (result.status == 201) {
      toast({
        title: res.message,
        status: "error",
        isClosable: true,
      });
      router.reload()
      
    } else if (result.status == 433) {
      toast({
        title: res.message,
        status: "error",
        isClosable: true,
      });
      router.reload()
     
    }
  };
  const paginationHandler = (event) => {
    setpage(event);
  };
  const changeProductsHandler = (event) => {
    setfilter(event);
    setpage(1);
  };
  const sortProductsHandler = (event) => {
    setsort(event);
    setpage(1);
  };
  return (
    <>
      {seller && productsLoaded && <div className=" pt-28 transition-colors md:pt-20 bg-[#f9f9f9] dark:bg-[#202020]  p-4 sm:px-8 py-0">
        <ProductBar
          onChangeProducts={changeProductsHandler}
          onsortProducts={sortProductsHandler}
        />
        <div className="  gap-4   gap-y-8 productContainerHolder">
          {products.map((product) => (
            <ProductCard
              onsellerClick={openModal}
              image={product.productImage}
              name={product.productName}
              model={product.productModel}
              price={product.productPrice}
              modelNo={product.productModelNumber}
              key={product._id.toString()}
              id={product._id.toString()}
              isseller={true}
            />
          ))}
          <Modal isOpen={isModalOpen} onClose={closeModal} maxWidth="500px">
                <div className="px-8 rounded-lg py-4 bg-[#f7f7f7]  dark:bg-[#171717] text-gray-800 dark:text-gray-200">
                  <h2 className="text-lg text-center sm:text-xl font-semibold mb-4">
                    Click "Yes" to delete the Product.
                  </h2>
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:justify-around">
                    <button className="cartBtn" onClick={deleteProductHandler}>
                      Yes
                    </button>
                    <button
                      style={{ backgroundColor: "#F24C3D" }}
                      className="cartBtn"
                      onClick={closeModal}
                    >
                      No
                    </button>
                  </div>
                </div>
              </Modal>

        </div>
        <div className="flex justify-center py-4 bg-[#f9f9f9] dark:bg-[#202020] transition">
          <Pagination
            showShadow
            color="secondary"
            total={totalPage}
            initialPage={1}
            page={page}
            onChange={paginationHandler}
          />
        </div>
      </div>}
      {!productsLoaded && 
        <div className="min-h-[500px] pt-28 transition-colors md:pt-20 bg-[#f9f9f9] dark:bg-[#202020]  p-4 sm:px-8 py-0 flex items-center justify-around">
          <Spinner size="lg" color="secondary" />
        </div>
      }
    </>
  );
}

