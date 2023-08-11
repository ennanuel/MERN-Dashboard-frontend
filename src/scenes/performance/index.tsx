import { useAppSelector } from '../../state/hooks';
import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Header, CustomColumnMenu } from '../../components';
import { useGetPerformanceQuery } from '../../state/api';
import { performanceColumns } from '../../assets/data';

const Performance = () => {
    const theme = useTheme();
    const userId = useAppSelector((state) => state.global.userId);
    const { data, isLoading, error } = useGetPerformanceQuery(userId);

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="PERFORMANCE" subtitle="Track your Affiliate Sales Performance" />
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
                    rows={(data && data.sales) || []}
                    columns={performanceColumns}
                    slots={{
                        columnMenu: CustomColumnMenu,
                    }}
                />
            </Box>
        </Box>
    )
}

export default Performance
