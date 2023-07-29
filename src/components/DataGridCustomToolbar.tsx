import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment } from '@mui/material';
import { GridToolbarDensitySelector, GridToolbarContainer, GridToolbarExport, GridToolbarColumnsButton } from '@mui/x-data-grid';
import { FlexBetween } from "../components"

type ToolbarPropTypes = {
    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch } : ToolbarPropTypes ) => {
  return (
    <GridToolbarContainer>
        <FlexBetween width="100%">
            <FlexBetween>
                <GridToolbarColumnsButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
            </FlexBetween>
            <TextField 
                label="Search..."
                variant="standard"
                sx={{ mb: "0.5rem", width: "15rem" }} 
                onChange={(e) => setSearchInput(e.target.value)} 
                value={searchInput}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => {
                                setSearch(searchInput);
                                setSearchInput("");
                            }}>
                                <Search />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </FlexBetween>
    </GridToolbarContainer>
  )
}

export default DataGridCustomToolbar
