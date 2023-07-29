import { useState, Dispatch, SetStateAction } from "react";

import { 
    LightModeOutlined, 
    DarkModeOutlined, 
    Menu as MenuIcon, 
    Search, 
    SettingsOutlined, 
    ArrowDropDownOutlined,
} from "@mui/icons-material";
import { AppBar, IconButton, InputBase, Button, Box, Menu, MenuItem, Typography, Toolbar, useTheme } from "@mui/material";

import FlexBetween from "./FlexBetween";
import { useAppDispatch } from "../state/hooks";
import { setMode } from "../state/globalSlice";
import { User } from "scenes/layout";
import { profileImage } from "assets/images/ndex";

// Remember to import image

interface Props {
    isSidebarOpen: boolean;
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
    user: User
}

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, user } : Props) => {
    const dispatch = useAppDispatch()
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = useState(null);

    const isOpen = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => setAnchorEl(null)

    return (
        <AppBar sx={{position: 'static', background: 'none', boxShadow: 'none'}}>
            <Toolbar sx={{justifyContent: 'space-between'}}>
                {/* LEFT SIDE */}
                <FlexBetween>
                    <IconButton onClick={() => { setIsSidebarOpen(!isSidebarOpen) }}>
                        <MenuIcon />
                    </IconButton>

                    <FlexBetween sx={{ backgroundColor: theme.palette.background.alt }} borderRadius="9px" gap="3rem" p="0.1rem 1.5rem">
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                </FlexBetween>

                {/* RIGHT SIDE */}
                <FlexBetween gap="1.5rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {
                            theme.palette.mode === 'dark' ? (
                                <DarkModeOutlined sx={{ fontSize: '25px' }} />
                            ) : (
                                <LightModeOutlined sx={{ fontSize: '25px' }} />
                            )
                        }
                    </IconButton>
                    <IconButton>
                        <SettingsOutlined sx={{ fontSize: '25px' }} />
                    </IconButton>

                    <FlexBetween>
                        <Button 
                            onClick={handleClick}
                            sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', textTransform: 'none', gap: '1rem'}}
                        >
                            <Box
                                component="img"
                                alt="profile"
                                src={profileImage}
                                height="40px"
                                width="40px"
                                borderRadius="50%"
                                sx={{ objectFit: "cover" }}
                            />
                            <Box textAlign="left">
                              <Typography fontWeight="bold" fontSize="0.85rem" sx={{ color: theme.palette.secondary[100] }}>
                                { user.name }
                              </Typography>
                            </Box>
                            <Box textAlign="left">
                              <Typography fontWeight="bold" fontSize="0.75rem" sx={{ color: theme.palette.secondary[100] }}>
                                { user.occupation }
                              </Typography>
                            </Box>
                            <ArrowDropDownOutlined sx={{ color: theme.palette.secondary[400], fontSize: "25px" }} />
                        </Button>
                        <Menu 
                            anchorEl={anchorEl} 
                            open={isOpen} 
                            onClose={handleClose} 
                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        >
                            <MenuItem onClick={handleClose}>Log Out</MenuItem>
                        </Menu>
                    </FlexBetween>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
