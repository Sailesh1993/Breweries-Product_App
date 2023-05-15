import React, { useEffect, useState } from 'react'
import { Product } from '../components/ListWithSearch'
import { useParams } from 'react-router'
import Home from './Home'

const SingleProductPage = () => {
    const {id} = useParams()
    
    const [product, setProduct] = useState<Product|undefined>()
    useEffect(()=>{
        fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`)
            .then(
                data=> data.json()
            ).then(
                data => setProduct(data)
            )
    },[])
  return (
    <div>
        {product && (
            <>
                <p>{product.name}</p>
                <p>{product.city}</p>
                <p>{product.brewery_type}</p>
                <p>{product.address_1}</p>
                <p>{product.address_2}</p>
                <p>{product.address_3}</p>
                <p>{product.state_province}</p>
                <p>{product.postal_code}</p>
                <p>{product.country}</p>
                <p>{product.longitude}</p>
                <p>{product.latitude}</p>
                <p>{product.phone}</p>
                <p>{product.website_url}</p>
                <p>{product.state}</p>
                <p>{product.street}</p>  
            </>
        )}
    </div>
  )
}

export default SingleProductPage