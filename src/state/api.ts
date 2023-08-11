import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductType, UserType, TransactionsType, GeographyType, SalesType, DashboardType, PerformanceType, TransactionsArg } from '../types';

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' /* We should be using process.env.BASE_URL */ }),
    reducerPath: 'adminAPI',
    tagTypes: ["User", 'Products', 'Customers', 'Transactions', 'Geography', 'Sales', 'Admins', 'Performance', 'Dashboard'],
    endpoints: (build) => ({
        getUser: build.query<UserType, string>({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"]
        }),
        getProducts: build.query<ProductType[], void>({
            query: () => 'client/products',
            providesTags: ['Products']
        }),
        getCustomers: build.query<UserType[], void>({
            query: () => 'client/customers',
            providesTags: ['Customers']
        }),
        getTransactions: build.query<TransactionsType, TransactionsArg>({
            query: ({ page, pageSize, sort, search }) => ({
                url: 'client/transactions',
                method: "GET",
                params: { page, pageSize, sort, search }
            }),
            providesTags: ['Transactions']
        }),
        getGeography: build.query<GeographyType[], void>({
            query: () => 'client/geography',
            providesTags: ['Geography']
        }),
        getSales: build.query<SalesType, void>({
            query: () => 'sales',
            providesTags: ['Sales']
        }),
        getAdmins: build.query<UserType[], void>({
            query: () => 'management/admins',
            providesTags: ['Admins']
        }),
        getPerformance: build.query<PerformanceType, string>({
            query: (id) => `management/performance/${id}`,
            providesTags: ['Performance']
        }),
        getDashboard: build.query<DashboardType, void>({
            query: () => "general/dashboard",
            providesTags: ['Dashboard']
        })
    })
});

export const {
    useGetUserQuery,
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetGeographyQuery,
    useGetSalesQuery,
    useGetAdminsQuery,
    useGetPerformanceQuery,
    useGetDashboardQuery,
} = api;