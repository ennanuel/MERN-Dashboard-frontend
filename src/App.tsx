import { Routes, Route, Navigate } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme }  from '@mui/material/styles';
import { useMemo } from "react";
import { useAppSelector } from "./state/hooks";
import { themeSettings } from "./theme";

import { Dashboard, Layout, Customers, Products, Transactions, Geography, Overview, Daily, Monthly, Breakdown, Admins, Performance } from "./scenes";

function App() {
  const mode = useAppSelector( (state) => state.global.mode );
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/geography" element={<Geography />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/daily" element={<Daily />} />
            <Route path="/monthly" element={<Monthly />} />
            <Route path="/breakdown" element={<Breakdown />} />
            <Route path="/admin" element={<Admins />} />
            <Route path="/performance" element={<Performance />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  )
}

export default App
