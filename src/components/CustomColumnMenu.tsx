import { GridColumnMenu, GridColumnMenuProps } from '@mui/x-data-grid';

const CustomColumnMenu = (props : GridColumnMenuProps) => {
    return (
        <GridColumnMenu {...props} slots={{ 
            columnMenuSortItem: null, 
            columnMenuPinningItem: null, 
            columnMenuAggregationItem: null, 
            columnMenuGroupingItem: null,
        }} />
    )
}

export default CustomColumnMenu
