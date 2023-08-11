import { Box, useTheme } from '@mui/material';
import { useGetAdminsQuery } from '../../state/api';
import { DataGrid } from '@mui/x-data-grid';
import { Header, CustomColumnMenu } from '../../components';
import { productColumns } from '../../assets/data';

const Admins = () => {
    const theme = useTheme();
    const { data, isLoading, error } = useGetAdminsQuery();

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="ADMINS" subtitle="Managing admins and list of admins." />
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
                    slots={{
                        columnMenu: CustomColumnMenu,
                    }}
                />
            </Box>
        </Box>
    )
}

export default Admins
