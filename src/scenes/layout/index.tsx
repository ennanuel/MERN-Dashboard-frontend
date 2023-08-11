import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../state/hooks";
import { useGetUserQuery } from "../../state/api";
import { Navbar, Sidebar } from "../../components";
import { UserType } from "../../types";

const Layout = () => {
  const isNonMobile : boolean = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useAppSelector( state => state.global.userId );
  const { data, isLoading, error } = useGetUserQuery(userId);

  return (
    <Box display={ isNonMobile ? 'flex' : 'block' } width="100%" height="100%">
      <Sidebar 
        user={data || {} as UserType}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
          <Navbar 
            user={data || {} as UserType}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <Outlet />
      </Box>
    </Box>
  )
}

export default Layout;
