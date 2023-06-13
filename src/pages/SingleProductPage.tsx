import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router'
import { Products } from '../types/Products'
import { Box, List, ListItem, ListItemText } from '@mui/material';
import Navbar from '../components/Navbar';

const SingleProductPage = () => {
    const {id} = useParams()
    
    const [product, setProduct] = useState<Products>()
    useEffect(()=>{
        fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`)
            .then(
                data=> data.json()
            ).then(
                data => setProduct(data)
            )
    },[id])
    const renderMap = () => {
        if (product && product.latitude && product.longitude) {
          return (
            <div style={{ height: "450px", width: "100%" }}>
              <iframe
                title="brewery-map"
                width="100%"
                height="100%"
                src={`https://maps.google.com/maps?q=${product.latitude},${product.longitude}&z=15&output=embed`}
              ></iframe>
            </div>
          );
        } else {
          return null;
        }
      };
  return(
    <div>
      <div> <Navbar/></div>
        {product && (
            <Box sx={{width: "100%"}}>
                <List>
            <ListItem>
              <ListItemText sx={{ width: '25%' }} primary="Name" secondary={product.name} />
              <ListItemText sx={{ width: '25%' }} primary="Brewery Type" secondary={product.brewery_type} />
              <ListItemText sx={{ width: '25%' }} primary="Phone" secondary={product.phone} />
              <ListItemText sx={{ width: '25%' }}
                primary="Website"
                secondary={
                  <a href={product.website_url} target="_blank" rel="noopener noreferrer">
                    {product.website_url}
                  </a>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText sx={{ width: '25%' }} primary="City" secondary={product.city} />
              <ListItemText sx={{ width: '25%' }} primary="State/Province" secondary={product.state_province} />
              <ListItemText sx={{ width: '25%' }} primary="Postal Code" secondary={product.postal_code} />
              <ListItemText sx={{ width: '25%' }} primary="Country" secondary={product.country} />
            </ListItem>
            <ListItem>
              <ListItemText sx={{ width: '25%' }} primary="Longitude" secondary={product.longitude} />
              <ListItemText sx={{ width: '25%' }} primary="Latitude" secondary={product.latitude} />
              <ListItemText sx={{ width: '25%' }} primary="State" secondary={product.state} />
              <ListItemText sx={{ width: '25%' }} primary="Street" secondary={product.street} />
            </ListItem>
            <ListItem>
              <ListItemText sx={{ width: '25%' }} primary="Address 1" secondary={product.address_1} />
              <ListItemText sx={{ width: '25%' }} primary="Address 2" secondary={product.address_2 || "N/A"} />
              <ListItemText sx={{ width: '25%' }} primary="Address 3" secondary={product.address_3 || "N/A"} />
              <ListItemText sx={{ width: '25%' }} primary="" secondary="" />
            </ListItem>
            <ListItem>{renderMap()}</ListItem>
          </List>
            </Box>
        )}
    </div>
  )
}
export default SingleProductPage