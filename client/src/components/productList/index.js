import React, { useEffect } from "react";
import ProductItem from "../productItem";
import { useArtContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import { Spinner, Box, Wrap, WrapItem, Center } from "@chakra-ui/react";

function ProductList()
{
  const [state, dispatch] = useArtContext();

  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);

  // const { userShop } = state;

  // const { products } = state;

  useEffect(() =>
  {
    if (data)
    {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) =>
      {
        idbPromise("products", "put", product);
      });
    } else if (!loading)
    {
      idbPromise("products", "get").then((products) =>
      {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  // function filterProducts()
  // {
  //   if (!products)
  //   {
  //     return state.products;
  //   }

  //   return state.products.filter(
  //     (product) => product._id === products
  //   );
  // }

  return (
    <Box className="my-2">
      {loading ? (
        <Spinner />
      ) : (
        <>
          {state.products.length ? (
              <Wrap justify="center">
                {state.products.map((product) => (
                      <ProductItem
                        key={product._id}
                        _id={product._id}
                        image={product.image}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        quantity={product.quantity}
                      />
                ))}
              </Wrap>
          ) : (
            <h3>There are no artworks for sale</h3>
          )}
        </>
      )}
    </Box>
  );
}

export default ProductList;
