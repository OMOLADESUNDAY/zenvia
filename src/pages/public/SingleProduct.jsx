import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import SingleProduct from "../../components/product/SingleProduct";
import LoadingSpinner from "../../components/common/LoadingSpinner"
const SingleProductPage = () => {
  const { id } = useParams();
  const url = `${import.meta.env.VITE_BACKEND_URL}/api/product/${id}`;
  const { data: product, loading, error } = useAxios({ url });

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error loading product</p>;
  console.log("i'm here")
  return <SingleProduct product={product} />;
};

export default SingleProductPage;
