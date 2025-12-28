import React from 'react'
import useAxios from '../../hooks/useAxios'
import LoadingSpinner from '../common/LoadingSpinner'
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
const AllProduct = ({value}) => {
    const url =`${import.meta.env.VITE_BACKEND_URL}/api/product`
    const {data,loading,error}=useAxios({url})
    if(loading){
        return(
            <LoadingSpinner/>
        )
    }
    if(error){
        return(
            <p>Network Error</p>
        )
    }
    const limit=value ?? data.length
  return (

    <section className="container mx-auto px-4">
      
     <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center my-4 sm:my-6 text-green-500 font-bold">
  Our Products
</h1>
  <div className="
    grid gap-4
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
  ">
    {data.slice(0, limit).map(product => (
      <Card
        key={product._id}
        sx={{ width: "100%", maxWidth: 380, margin: "auto" }}
      >
        <div>
          <Typography level="title-md">{product.name}</Typography>
          <Typography level="body-sm">
            {new Date().toLocaleDateString("en-CA")}
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
            <Typography fontWeight="lg">${product.price}</Typography>
          </div>

          <Button
            sx={{ ml: "auto", bgcolor: "#00C950", fontWeight: 600 }}
          >
            Buy Now
          </Button>
        </CardContent>
      </Card>
    ))}
  </div>
</section>

    
  )
}

export default AllProduct