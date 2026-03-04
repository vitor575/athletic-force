import React, { useState } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../../tema";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import ViewDayIcon from "@mui/icons-material/ViewDay";

interface ItemProps {
  title: string;
  to: string;
  icon: React.ReactNode;
  selected: string;
  setSelected: (value: string) => void;
}

const Item = ({ title, to, icon, selected, setSelected }: ItemProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => {
        setSelected(title);
      }}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Alunos");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        "& .ps-sidebar-container": {
          backgroundColor: `${colors.primary[400]} !important`,
        },
        "& .ps-menu-button": {
          padding: "5px 35px 5px 20px !important",
          backgroundColor: "transparent !important",
        },
        "& .ps-menu-button:hover": {
          color: "#868dfb !important",
          backgroundColor: "transparent !important",
        },
        "& .ps-menu-item.ps-active .ps-menu-button": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar
        collapsed={collapsed}
        backgroundColor={colors.primary[400]}
        style={{ border: "none" }}
      >
        <Menu>
          <MenuItem
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography
                  variant="h3"
                  fontSize="32px"
                  color={colors.grey[100]}
                >
                  ADMIN
                </Typography>
                <IconButton onClick={() => setCollapsed(!collapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!collapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`https://github.com/MaxMLira.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                  fontSize="25px"
                >
                  Nome
                </Typography>
                <Typography
                  variant="h5"
                  color={colors.greenAccent[500]}
                  fontSize="20px"
                >
                  Cargo
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={collapsed ? undefined : "10%"}>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              informações
            </Typography>
            <Item
              title="Alunos"
              to="/EmpregadoDashboard"
              icon={<DirectionsRunIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Criar usuário"
              to="/EmpregadoDashboard/DashboardAdminUser"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Rotinas"
              to="/EmpregadoDashboard/DashboardAdminRoutines"
              icon={<ViewDayIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Treinos"
              to="/EmpregadoDashboard/DashboardAdminTrainings"
              icon={<FormatListBulletedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Exercícios"
              to="/EmpregadoDashboard/DashboardAdminExercise"
              icon={<FitnessCenterOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
