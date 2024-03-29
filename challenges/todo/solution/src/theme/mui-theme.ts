import { createTheme } from "@mui/material";

export const muiTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#cbd5e1",
      light: "rgb(139, 92, 246)",
      dark: "rgb(109, 40, 217)",
    },
    error: {
      main: "#C3462B",
      light: "#C3462B",
      dark: "#C3462B",
    },
    warning: {
      main: "#ECAC27",
      light: "#ECAC27",
      dark: "#ECAC27",
    },
    background: {
      default: "#031116",
      paper: "#131A1C",
    },
    text: {
      primary: "#FFF",
      secondary: "#cbd5e1",
      disabled: "#636B6F",
    },
    success: {
      main: "#179B83",
      light: "#179B83",
      dark: "#179B83",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: "#334155",
          borderWidth: "1px 0px 0px",
          borderRadius: 8,
          "&:hover": { background: "#202a38" },
          textTransform: "none",
          fontWeight: 300,
          color: "#cbd5e1",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: 30,
          lineHeight: 12,
          fontSize: 12,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          lineHeight: 1,
          fontSize: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e293b",
          backgroundImage: "none",
        },
      },
    },
  },
});
