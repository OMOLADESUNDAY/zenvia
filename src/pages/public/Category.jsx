import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";

import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import useAxios from "../../hooks/useAxios";

const CategoryPage = () => {
  const { slug } = useParams();
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch category
  const {
    data: category,
    loading: categoryLoading,
    error: categoryError,
  } = useAxios({
    url: `${baseUrl}/api/categories/slug/${slug}`,
  });

  // Fetch products
  const {
    data: products = [],
    loading: productLoading,
    error: productError,
  } = useAxios({
    url: `${baseUrl}/api/product`,
  });

  // Filter products by category (memoized)
  const categoryProducts = useMemo(() => {
    if (!category?._id) return [];
    return products.filter(
      (product) => product.categories?.includes(category._id)
    );
  }, [products, category]);

  if (categoryLoading || productLoading) return <LoadingSpinner />;

  if (categoryError || productError)
    return <p className="text-center">Network Error</p>;

  return (
    <section className="container mx-auto px-4">
      {/* Category Name */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center my-6 font-bold text-green-500">
        {category?.name}
      </h1>

      {categoryProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found in this category
        </p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categoryProducts.map((product) => (
            <Card
              key={product._id}
              sx={{ width: "100%", maxWidth: 380, margin: "auto" }}
            >
              <div>
                <Typography level="title-md">
                  {product.name}
                </Typography>

                <Typography level="body-sm">
                  {new Date(product.createdAt).toLocaleDateString("en-CA")}
                </Typography>

                <IconButton
                  variant="plain"
                  size="sm"
                  sx={{ position: "absolute", top: 14, right: 8 }}
                >
                  <BookmarkAdd />
                </IconButton>
              </div>

              <AspectRatio ratio="1">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="object-contain w-full h-full p-4"
                />
              </AspectRatio>

              <CardContent orientation="horizontal">
                <div>
                  <Typography level="body-xs">Price</Typography>
                  <Typography fontWeight="lg">
                    ${product.price}
                  </Typography>
                </div>

                <Link to={`/single/${product._id}`} className="btn">
                  Buy Now
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoryPage;
