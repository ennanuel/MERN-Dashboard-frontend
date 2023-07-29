import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "../../state/api";
import { Header } from "components";
import { DataGrid } from "@mui/x-data-grid";
import { productColumns } from "../../assets/data";

const Customers = () => {
    const theme = useTheme();
    const { data, isLoading, error } = useGetCustomersQuery();

    
    return (
        <Box m="1.5rem 2.5rem">
            <Header title="CUSTOMERS" subtitle="List of Customers" />
            <Box mt="40px" height="75vh" sx={{ 
                "& .MuiDataGrid-root" : { border: "none" },
                "& .MuiDataGrid-cell": { borderBottom: "none"},
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderBottom: "none"
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: theme.palette.primary.light,
                },
                "& .MuiDataGrid-footerContainer": {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderTop: "none"
                },
                "& .MuiDataGrid-toolBarContainer .MuiButton-text": {
                    color: `${theme.palette.secondary[200]} !important`,
                }
            }}
            >
                <DataGrid 
                    loading={isLoading}
                    getRowId={(row) => row._id}
                    rows={data || []}
                    columns={productColumns}
                />
            </Box>
        </Box>
    ) 
}

export default Customers
