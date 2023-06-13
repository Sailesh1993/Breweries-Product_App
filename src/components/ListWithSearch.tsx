import React, { useEffect, useMemo, useState } from 'react'
import Navbar from './Navbar'
import { TextField } from '@mui/material'
import { Avatar, Box } from '@mui/material';
import { GridCellParams } from '@mui/x-data-grid'
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { Products } from '../types/Products';

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
    },[filter, items,filterFunc])
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
    const [products, setProducts] = useState<Products[]>([])
    const [filteredProducts, setFilteredProducts] =useState<Products[]>()
    const filterProducts = (items: Products[], filter: string)=>{
        return items.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
    }
    const { onChangeFilter, filter, filteredItems} = useDebounce<Products>(filterProducts, products)
    useEffect(() =>{
        fetch("https://api.openbrewerydb.org/v1/breweries")
            .then(result=> result.json()
            ).then(
                result=> {
                    setProducts(result)
                }
            )
    },[filteredProducts])
    const navigate = useNavigate()
    const updatedData = useMemo(() => {
        function getRandomColor() {
          const letters = "0123456789ABCDEF";
          let color = "#";
          for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        }
        return filteredItems.map(row => {
          return {
            ...row,
            avatarColor: getRandomColor(),
          }
        })
      }, [filteredItems]);
    const columns: GridColDef[] = [
        {
          field: 'avatar',
          headerName: '',
          width: 100,
          renderCell: (params: GridCellParams) => (
            <Avatar style={{ backgroundColor: params.row.avatarColor }}>{params.row.id.charAt(0)}</Avatar>
          ),
          headerClassName: 'super-app-theme--header'
        },
          { field: 'id', headerName: 'ID', width: 350, headerClassName: 'super-app-theme--header' },
          { field: 'name', headerName: 'Name', width: 200, headerClassName: 'super-app-theme--header' },
          { field: 'brewery_type', headerName: 'Brewery_Type', width: 150, headerClassName: 'super-app-theme--header' },
          { field: 'country', headerName: 'Country', width: 150, headerClassName: 'super-app-theme--header' },
          { field: 'state', headerName: 'State', width: 350, headerClassName: 'super-app-theme--header' },
          { field: 'city', headerName: 'City', width: 200, headerClassName: 'super-app-theme--header' },
          { field: 'longitude', headerName: 'Longitude', width: 150, headerClassName: 'super-app-theme--header' },
          { field: 'latitude', headerName: 'Latitude', width: 150, headerClassName: 'super-app-theme--header' },
          { field: 'address_1', headerName: 'Address_1', width: 350, headerClassName: 'super-app-theme--header' },
          { field: 'phone', headerName: 'Phone', width: 200, headerClassName: 'super-app-theme--header' },
        ]
        const handleRowClick = (params: GridRowParams) => {
          const id = params.row.id;
          navigate(`/products/${id}`);
          setFilteredProducts(id)
        }
  return (
    <div>
        <Navbar/>        
            <TextField
                id="search-field"
                label="Search by name"
                variant="outlined"
                fullWidth
                value={filter}
                onChange={onChangeFilter}
                InputProps={{
                    endAdornment: (
                      <SearchIcon />
                     ),
                }}
            />
        <div style={{ display: 'flex', justifyContent: 'center' , height: '100vh', marginTop: '10vh' }}>
        <Box sx={{ height: 600, width: '75%' }}>
        <DataGrid
            rows={updatedData}
            columns={columns}
            onRowClick={handleRowClick}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
          />
        </Box>

        </div>
    </div>
  )
}
export default ListWithSearch

