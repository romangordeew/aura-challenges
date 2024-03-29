import React from "react";
import { Stack, ThemeProvider } from "@mui/material";
import { sepolia } from "wagmi/chains";
import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { http, WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import TodoList from "./pages/todo-list";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { SnackbarProvider } from "notistack";
import { muiTheme } from "./theme/mui-theme";

const config = getDefaultConfig({
  appName: "Blockchain todo list",
  projectId: "55dcb3ea8784371faa2a1efc7a77dd4e", //need to verify project domain name
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(
      "https://eth-sepolia.g.alchemy.com/v2/g1fCpIN_-xHJXqvOBpfeNMGcSqMjG7OX",
    ),
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={muiTheme}>
        <SnackbarProvider maxSnack={3}>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <RainbowKitProvider theme={darkTheme()}>
                <Stack className="App" minHeight="100vh" height="100vh">
                  <TodoList />
                </Stack>
              </RainbowKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
