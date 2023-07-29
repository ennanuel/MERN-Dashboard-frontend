import { useState } from 'react';
import { useTheme, Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { useGetTransactionsQuery } from 'state/api';
import { Header, DataGridCustomToolbar } from '../../components';
import { transactionColumns } from 'assets/data';


type SortType = {}

const Transactions = () => {
  const theme = useTheme();
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 20 });
  const [sort, setSort] = useState({} as SortType);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading, error } = useGetTransactionsQuery({
    ...paginationModel,
    sort: JSON.stringify(sort),
    search,
  });

  return (
    <Box
      m="1.5rem 2.5rem" 
      sx={{ 
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
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
      <Box height="80vh">
        <DataGrid 
          columns={transactionColumns}
          loading={ isLoading } 
          getRowId={( row ) => row._id }
          rows={data && data.transactions }
          rowCount={ (data && data.total) || 0 }
          pagination
          pageSizeOptions={[20, 50, 100]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          paginationMode="server"
          sortingMode="server"
          onSortModelChange={(newSortModel: SortType) => setSort({...newSortModel})}
          slots={{ toolbar: DataGridCustomToolbar }}
          slotProps={{ toolbar: {searchInput, setSearchInput, setSearch} }}
        />
      </Box>
    </Box>
  )
}

export default Transactions
