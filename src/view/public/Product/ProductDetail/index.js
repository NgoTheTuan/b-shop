import styles from "./productDetail.module.scss";
import Breadcrumb from "../../../../components/breadcrumb";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NavbarMenuProduct from "../../../../components/navbarMenuProduct";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { ProductService } from "../../../../network/productService";
import { CategoriyService } from "../../../../network/categoryService";
import { number_to_price } from "../../../../ultis";
import NoData from "../../../../components/noData";
import ProductItem from "../../../../components/productItem";
import toast from "react-hot-toast";
import SettingAction from "../../../../store/actions/setting";
import CartAction from "../../../../store/actions/cart";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailPreview from "./productDetailPreview";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useSelector((state) => state?.auth);
  const [nameProduct, setNameProduct] = useState("");
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState({});
  const [categories, setCategories] = useState({});
  const [quantity, setQuantity] = useState(1);

  const [relatedProduct, setRelatedProduct] = useState([]);

  const breadcrumb = [
    {
      id: 1,
      name: "Trang chủ",
      link: "/",
      text: false,
    },
    {
      id: 2,
      name: "Sản phẩm",
      link: "/product",
      text: false,
    },
    {
      id: 3,
      name: nameProduct,
      link: "",
      text: true,
    },
  ];
  let addCart = true;

  useEffect(() => {
    (async function () {
      await ProductService.getDetail(id).then(async (res) => {
        if (res) {
          setNameProduct(res?.name);
          setProduct(res);
          await CategoriyService.getDetailCategories(res?.categoriesId).then(
            (resCategories) => {
              if (resCategories) {
                setCategories(resCategories);
              }
            }
          );
          await CategoriyService.getDetailCategory(res?.categoryId).then(
            (resCategory) => {
              if (resCategory) {
                setCategory(resCategory);
              }
            }
          );

          await ProductService.sort({
            limit: 10,
            categoriesId: res?.categoriesId,
          }).then((res) => {
            if (res?.length > 0) {
              const data = res.filter((item) => item?._id !== id);
              setRelatedProduct(data.slice(0, 4));
            }
          });
        }
      });
    })();
  }, [id]);

  const increasingNumber = () => {
    if (product?.quantity > quantity) {
      setQuantity((quantity) => quantity + 1);
    } else {
      toast.error(`Số lượng sản phẩm tồn kho: ${product?.quantity} `);
    }
  };

  const reduceNumber = () => {
    if (quantity > 1) {
      setQuantity((quantity) => quantity - 1);
    }
  };

  const handleAddCart = () => {
    if (window.localStorage.getItem("user-cart-b-shop") === null) {
      const dataAddToCart = { ...product, quantity };
      window.localStorage.setItem(
        "user-cart-b-shop",
        JSON.stringify([dataAddToCart])
      );
      dispatch({
        type: CartAction.CART_UPDATE,
      });
      if (addCart) {
        toast.success("Thêm vào giỏ hàng thành công!");
      }
    } else {
      const cartJSON = window.localStorage.getItem("user-cart-b-shop");
      let cart = JSON.parse(cartJSON || "[]");
      let duplicateProduct = false;
      let quantityDuplicate = 0;
      if (cart.length > 0) {
        cart = cart.filter((dataCart) => {
          if (dataCart?._id === product?._id) {
            duplicateProduct = true;
            quantityDuplicate = dataCart.quantity + quantity;
          }
          return dataCart?._id !== product?._id;
        });
      }
      if (!duplicateProduct) {
        cart.push({ ...product, quantity });
      } else {
        cart.push({ ...product, quantity: quantityDuplicate });
      }

      window.localStorage.setItem(
        "user-cart-b-shop",
        JSON.stringify([...cart])
      );
      if (addCart) {
        toast.success("Thêm vào giỏ hàng thành công!");
      }
      dispatch({
        type: CartAction.CART_UPDATE,
      });
    }
  };

  const buyNow = () => {
    if (auth?._id) {
      addCart = false;
      handleAddCart();
      navigate("/checkout");
    } else {
      dispatch({
        type: SettingAction.CHANGE_URL_LOGIN,
        payload: location,
      });
      navigate("/login");
    }
  };

  return (
    <div className={`container ${styles.productDetail}`}>
      <div>
        <Breadcrumb data={breadcrumb} />
      </div>

      <div className="row">
        <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className={styles.boxImg}>
                <img
                  src={product?.image || ""}
                  alt={product?.name || ""}
                  className={styles.img}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className={styles.boxInfomation}>
                <div className={styles.title}>
                  {product?.name || ""}
                  <div className={styles.category}>
                    <div>
                      <b>Danh mục:</b> {categories?.title || ""}
                    </div>
                    <div>
                      <b>Thể loại:</b> {category?.title || ""}
                    </div>
                    <div>
                      <b>Nhà cung cấp:</b> {product?.supplier?.company || ""}
                    </div>
                  </div>
                </div>

                <div className={styles.price}>
                  <span className={styles.priceNumber}>
                    {product?.discount > 0
                      ? number_to_price(
                          Number(product?.price || 0) -
                            Number(product?.price || 0) *
                              (Number(product?.discount || 0) / 100)
                        )
                      : number_to_price(product?.price || 0)}
                    ₫
                  </span>
                  {product?.discount > 0 && (
                    <span className={styles.cost}>
                      {number_to_price(product?.price || 0)}₫
                    </span>
                  )}
                </div>

                {product?.quantity > 0 ? (
                  <>
                    <div className={styles.quantity}>
                      <div className={styles.text}>Số lượng:</div>
                      <div className={styles.inputWrapper}>
                        <div className={styles.btn} onClick={reduceNumber}>
                          <IoMdArrowDropup className={styles.icon} />
                        </div>
                        <div className={styles.input}>
                          <input type="text" value={quantity} />
                        </div>
                        <div className={styles.btn} onClick={increasingNumber}>
                          <IoMdArrowDropdown className={styles.icon} />
                        </div>
                      </div>
                    </div>

                    <div className={styles.buy}>
                      <button
                        className={styles.addCart}
                        onClick={handleAddCart}
                      >
                        Thêm vào giỏ hàng
                      </button>
                      <button className={styles.buyProduct} onClick={buyNow}>
                        Mua hàng
                      </button>
                    </div>
                  </>
                ) : (
                  <div className={styles.outOfStock}>
                    <span>Hết hàng</span>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.description}>
              <div className={styles.title}>
                <span className={styles.text}>MÔ TẢ SẢN PHẨM</span>
              </div>

              <div className={styles.content}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: product?.description + "",
                  }}
                ></span>
              </div>
            </div>

            <div>
              <ProductDetailPreview />
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 hiddenMobile">
          <NavbarMenuProduct />
        </div>
      </div>

      <div className={`row ${styles.boxRelatedProduct}`}>
        <div className={styles.relatedProduct}>
          <span className={styles.text}>SẢN PHẨM LIÊN QUAN</span>
        </div>

        {relatedProduct.length > 0 ? (
          relatedProduct.map((item) => {
            return (
              <div
                className="col-lg-3 col-md-3 col-sm-6 col-xs-12"
                key={item?._id}
              >
                <ProductItem item={item} />
              </div>
            );
          })
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
