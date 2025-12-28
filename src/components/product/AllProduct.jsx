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

    <section className='container'>
        <div className='flex flex-wrap w-full gap-3 justify-center'>
        {data.slice(0,limit).map((product)=>{
            return(
                <Card sx={{ width: 380 }}>
      <div>
        <Typography level="title-lg">{product.name}</Typography>
        <Typography level="body-sm">{Date()}</Typography>
        <IconButton
          aria-label="bookmark Bahamas Islands"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
        >
          <BookmarkAdd />
        </IconButton>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img
        className='w-1/2'
        src={product.images}
          loading="lazy"
          alt=""
          style={{width:'60%', margin:"auto"}}
        />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs">Price:</Typography>
          <Typography sx={{ fontSize: 'lg', fontWeight: 'lg' }}>${product.price}</Typography>
        </div>
        <Button
          variant="solid"
          size="md"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
          style={{backgroundColor:"green"}}
        >
          Explore
        </Button>
      </CardContent>
    </Card>
            )
        })}
    </div>

    </section>
    
  )
}

export default AllProduct