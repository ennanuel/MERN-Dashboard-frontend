import { useState } from 'react'
import { Box, Card, CardActions, CardContent, Collapse, Button, Typography, Rating, useTheme, useMediaQuery } from '@mui/material'
import { Header } from '../../components'
import { useGetProductsQuery } from '../../state/api'
import { ProductType } from '../../types'

const Product = ({ _id, name, description, price, rating, category, supply, stat } : ProductType) => {
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <Card sx={{ backgroundImage: "none", backgroundColor: theme.palette.background.alt, borderRadius: "o.55rem" }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color={theme.palette.secondary[700]} gutterBottom>
                    { category }
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
                    ${Number(price).toFixed(2)}
                </Typography>
                <Rating value={rating} readOnly />

                <Typography variant="body2">{description}</Typography>
            </CardContent>
            <CardActions>
                <Button variant="outlined" size="small" onClick={() => setIsExpanded( prev => !prev )}>
                    See More
                </Button>
            </CardActions>
            <Collapse
                in={isExpanded}
                timeout="auto"
                unmountOnExit
                sx={{ color: theme.palette.neutral[300] }}
            >
                <CardContent>
                    <Typography>id: {_id}</Typography>
                    <Typography>Supply Left: { supply }</Typography>
                    <Typography>Yearly Sales This Year: { stat.yearlySalesTotal } </Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

const Products = () => {
    const isNonMobile : boolean = useMediaQuery("(min-width: 600px)");
    const { data, isLoading, error } = useGetProductsQuery();

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="PRODUCTS" subtitle="See Your list of products" />
            {
                (data || isLoading) ?
                <Box 
                    mt="20px" 
                    display="grid" 
                    gridTemplateColumns="repeat(4, minmax(0, 1fr)" 
                    justifyContent="space-between" 
                    rowGap="20px" 
                    columnGap="1.33%"
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? "" : "span 4"}
                    }}
                >
                    {
                        data && data.map( ({ _id, name, description, price, rating, category, supply, stat } : ProductType) => (
                            <Product
                                key={_id}
                                _id={_id}
                                name={name}
                                description={description}
                                price={price}
                                rating={rating}
                                category={category}
                                supply={supply}
                                stat={stat}
                            />
                        ))
                    }
                </Box>
                :
                <>Loading...</>
            }
        </Box>
    )
}

export default Products