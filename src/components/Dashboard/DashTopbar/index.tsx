import { Box, IconButton, useTheme } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import  LightModeOutlinedIcon  from "@mui/icons-material/LightModeOutlined";
import  DarkModeOutlinedIcon  from "@mui/icons-material/DarkModeOutlined";
import  NotificationsOutlinedIcon  from "@mui/icons-material/NotificationsOutlined";
import  SettingsOutlinedIcon  from "@mui/icons-material/SettingsOutlined";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import  SearchIcon  from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { tokens } from "../../../tema";
import { toggleColorMode } from "../../../store/reducers/temaSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


const DashTopbar = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    const handleExit = () => {
        Cookies.remove('token');
        navigate('/')
    }

    return (
        <Box display="flex" justifyContent="space-between" p={1.5} >
            <Box display="flex" borderRadius="3px" bgcolor={colors.primary[400]}>
                <InputBase sx={{ml: 2, flex: 1}} placeholder="Procurar"/>
                <IconButton type="button" sx={{ p: 1}}>
                    <SearchIcon />
                </IconButton>
            </Box>
            <Box display="flex">
                <IconButton onClick={() => dispatch(toggleColorMode())}>
                    {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
                </IconButton>
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton onClick={handleExit}>
                    <ExitToAppIcon />
                </IconButton>
            </Box>
        </Box>
    )
};

export default DashTopbar;