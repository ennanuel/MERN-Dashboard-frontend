interface MongoDBObject { 
    _id: string;
    __v?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface OverallStatType extends MongoDBObject {
    totalCustomers: number;
    yearlySalesTotal: number;
    yearlyTotalSoldUnits: number;
    year: number;
    monthlyData: MonthlyDataType[];
    dailyData: DailyDataType[];
    salesByCategory: {
        [key: string]: number;
    }
}

interface StatType extends MongoDBObject {
    productId: string;
    yearlySalesTotal: number;
    monthlyData: MonthlyDataType[];
    dailyData: DailyDataType[];
}

interface TransactionType extends MongoDBObject {
    userId: string;
    cost: string;
    products: string[];
}

interface TimedDataType extends MongoDBObject {
    totalUnits: number;
    totalSales: number;
}

interface AffiliateStatType extends MongoDBObject {
    userId: string; 
    affliateSales: string[];
}

export interface MonthlyDataType extends TimedDataType {
    month: string;
}

export interface DailyDataType extends TimedDataType {
    date: string;
}

export interface UserType extends MongoDBObject {
    name: string;
    email: string;
    city: string;
    occupation: string;
    state?: string;
    country: string;
    phoneNumber: string;
    transaction?: string;
    role: 'user' | 'admin' | 'superadmin';
}

export interface ProductType extends MongoDBObject {
    name: string;
    price: string;
    description: string;
    category: string;
    rating: number;
    supply: number;
    stat: StatType;
}

export interface TransactionsType {
    transactions: TransactionType[];
    total: number
}

export interface GeographyType {
    id: string;
    value: number;
}

interface UserWithAffliateType extends UserType {
    affliateStat: AffiliateStatType[]
    sales: TransactionType[]
}

export interface PerformanceType extends MongoDBObject {
    user: UserWithAffliateType;
    sales: TransactionType[];
}

export interface SalesType extends OverallStatType {
    year: number;
}

export interface DashboardType extends OverallStatType {
    thisMonthStats: MonthlyDataType;
    todayStats: DailyDataType;
    transactions: TransactionType[];
}

export type TransactionsArg = {
    page: number;
    pageSize: number;
    sort: string;
    search: string;
}