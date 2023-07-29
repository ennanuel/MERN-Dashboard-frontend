import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../state/hooks";
import { useGetUserQuery } from "state/api";
import { Navbar, Sidebar } from "../../components";

export type User = {
  name: string
  occupation: string
}

const Layout = () => {
  const isNonMobile : boolean = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useAppSelector( state => state.global.userId );
  const { data, isLoading, error } = useGetUserQuery(userId)

  return (
    <Box display={ isNonMobile ? 'flex' : 'block' } width="100%" height="100%">
      <Sidebar 
        user={data || {} as User}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
          <Navbar 
            user={data || {} as User}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <Outlet />
      </Box>
    </Box>
  )
}

export default Layout
