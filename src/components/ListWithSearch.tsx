import React, { useEffect, useState } from 'react'
import Pagination from './Pagination'

export interface Product{
    id: string
    name: string
    city : string
    brewery_type: string
    address_1: string
    address_2?: string
    address_3?: string
    state_province: string
    postal_code: string
    country: string
    longitude: string
    latitude: string
    phone: string 
    website_url:string
    state: string
    street: string
}

const useDebounce = <T,>(
    filterFunc: (items:T[], filter:string) => T[],
    items: T[]
)=>{
    const [filteredItems, setFilteredItems] = useState(items)
    const[filter, setFilter] = useState("")
    useEffect(()=>{
        const timer = setTimeout (()=>{
            setFilteredItems(filterFunc(items, filter))
        },1000)
        return()=>{
            clearTimeout(timer)
        }
    },[filter, items])

    const onChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value)
    }
    return{
        onChangeFilter, 
        filter, 
        filteredItems
    }
}

const ListWithSearch = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [filteredProducts, setFilter] =useState<Product[]>()
    
    
    const filterProducts = (items: Product[], filter: string)=>{
        return items.filter(item => item.name.includes(filter))
    }

    const { onChangeFilter, filter, filteredItems} = useDebounce<Product>(filterProducts, products)

    useEffect(() =>{
        fetch("https://api.openbrewerydb.org/v1/breweries")
            .then(result=> result.json()
            ).then(
                result=> {
                    setProducts(result)
                }
            )
    },[])
   
  return (
    <div>
        <input type="text"
            value={filter} 
            onChange={onChangeFilter} 
            placeholder='filter product by name' />
        <Pagination items={filteredItems} />   
    </div>
  )
}

export default ListWithSearch

