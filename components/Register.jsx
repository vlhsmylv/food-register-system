import {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import axios from "axios";

const Register = ({table}) => {
    const [checkout, setCheckout] = useState({
        products: [],
        price: 0
    })
    const [products, setProducts] = useState({});
    const [previewProduct, setPreviewProduct] = useState({});

    const add_product = async (product) => {
        setCheckout({
            products: [...checkout.products, product],
            price: checkout.price+product.price
        });
    }

    const remove_product = async () => {
        return false;
    }

    const get_products = async () => {
        const {data} = await axios.get('/api/products');

        setProducts(data);
    }

    useEffect(() => {
        get_products();
    }, [])

    const Nav = () => {
        return (
            <nav className={"p-3 border-bottom rounded"}>
                <span>
                    Masa {table}
                </span>
                <span className={"float-end"}>
                    <span>{checkout.price} ₼</span>
                    {' '}
                    +
                    {' '}
                    <span className={"text-success fw-bold"}>{(checkout.price*10)/100} ₼</span>
                </span>
            </nav>
        )
    }

    const Category = ({category, title}) => {
        return (
            <div className={"mt-4 mb-4"}>
                <h4>{title.toUpperCase()}</h4>
                <div style={{
                    display: "flex",
                    gap: "10px"
                }}>
                    {category.map((product, i) => (
                        <Button onClick={() => {
                            setPreviewProduct(product);
                        }} key={i} className={"w-100"} variant={product.style.variant}>
                            <div>
                                {product.title}
                            </div>
                            <small>
                                {product.size}
                            </small>
                        </Button>
                    ))}
                </div>
            </div>
        )
    }

    const Menu = () => {
        return (
            <div style={{
                width: "700px",
                height: "70vh",
                display: "flex"
            }}>
                <div className={"me-3"} style={{
                    width: "400px",
                    overflow: "auto"
                }}>
                    {Object.keys(products).map((product, i) => (
                        <Category key={i} category={products[product]} title={product} />
                    ))}
                </div>
                <div style={{
                    width: "300px",
                    height: "70vh",
                    border: '1px dashed black'
                }}>
                    {Object.keys(previewProduct).length === 0 ? (
                        <>Ön baxış üçün sol hissədən məhsul seçin</>
                    ) : (
                        <div className={"m-3"} style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px"
                        }}>
                            <div className={"text-center"}>
                                <img src={previewProduct.image} style={{
                                    width: "150px"
                                }} />
                            </div>
                            <div className={"fs-4 text-center"}>
                                {previewProduct.title}
                            </div>
                            <small className={"text-secondary text-center"}>{previewProduct.size}</small>
                            <div className={"text-center"}>
                                {previewProduct.price} ₼
                            </div>
                            <div className={"text-center"}>
                                <Button variant={"success"} onClick={() => {
                                    add_product(previewProduct)
                                }}>
                                    + Əlavə et
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    const CheckoutProduct = ({product, id}) => {
        return (
            <div>
                <span>{product.title} <sub>{product.size}</sub></span>
                <span className={"float-end"} style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <span>
                        {product.price}  ₼
                    </span>
                    <button className={"border rounded-circle text-light bg-danger"} style={{
                        height: "17.5px",
                        width: "17.5px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }} title={`${product.title} - ləğv et`} onClick={() => {
                        remove_product(id)
                    }}>
                        -
                    </button>
                </span>
            </div>
        )
    }

    const Receipt = () => {
        return (
            <div style={{
                width: "300px",
                height: "70vh"
            }}>
                <div className={"text-center pb-2"} style={{
                    borderBottom: "1px dashed black"
                }}>
                    Masa {table}
                </div>
                <div className={"pt-2 pb-2 pe-3"} style={{
                    borderBottom: "1px dashed black",
                    display: "flex",
                    gap: "10px",
                    flexDirection: "column",
                    height: "250px",
                    overflow: "auto"
                }}>
                    {checkout.products.length === 0 ? (
                        <>Məhsul əlavə edin</>
                    ) : (
                        <>
                            {checkout.products.map((product, i) => (
                                <CheckoutProduct key={i} product={product} id={i} />
                            ))}
                        </>
                    )}
                </div>
                <div className={"pt-2"}>
                    <div>
                        Hesab: {checkout.price} ₼
                    </div>
                    <div>
                        Servis (10%): {((checkout.price*10)/100).toFixed(2)} ₼
                    </div>
                    <div>
                        <b>Ümumi: {(checkout.price + (checkout.price*10)/100).toFixed(2)} ₼</b>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <>
            <Nav />
            <div className={"m-3"} style={{
                display: "flex",
                gap: "20px"
            }}>
                <Menu />
                <Receipt />
            </div>
        </>
    )
}

export default Register;