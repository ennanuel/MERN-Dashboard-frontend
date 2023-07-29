import { GridRenderCellParams } from "@mui/x-data-grid/models";

export const productColumns = [
    {
        field: "_id",
        headerName: "ID",
        flex: 1,
    },
    {
        field: "name",
        headerName: "Name",
        flex: 0.5,
    },
    {
        field: "email",
        headerName: "Email",
        flex: 1,
    },
    {
        field: "phoneNumber",
        headerName: "Phone Number",
        flex: 0.5,
        renderCell: (params : GridRenderCellParams) => params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "{$1)$2-$3")
    },
    {
        field: "country",
        headerName: "Country",
        flex: 0.4,
    },
    {
        field: "occupation",
        headerName: "Occupation",
        flex: 1,
    },
    {
        field: "role",
        headerName: "Role",
        flex: 0.5,
    },
]

export const transactionColumns = [
    {
        field: "_id",
        headerName: "ID",
        flex: 1,
    },
    {
        field: "userId",
        headerName: "User ID",
        flex: 1,
    },
    {
        field: "createdAt",
        headerName: "Created At",
        flex: 1,
    },
    {
        field: "products",
        headerName: "# of Products",
        flex: 0.5,
        sortable: false,
        renderCell: (params : GridRenderCellParams) => params.value.length
    },
    {
        field: "cost",
        headerName: "Cost",
        flex: 1,
        renderCell: (params : GridRenderCellParams) => `${Number(params.value).toFixed(2)}`
    },
]