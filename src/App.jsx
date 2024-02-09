/** @format */

import "./App.css";
import Header from "./component/Header";
import React from "react";
import PostProvider from "./contaxt/PostsContext";
import Profile from "./component/Profile";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useMemo } from "react";
import { useState } from "react";
import ToastProvider from "./contaxt/ToastContext";
import CircularProgress from "@mui/material/CircularProgress";
const LazyLoading = React.lazy(() => import("./component/PostList"));

function App() {
  const [mode, setMode] = useState("light");
  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );

  return (
    <ToastProvider>
      <ThemeProvider theme={darkTheme}>
        <PostProvider>
          <CssBaseline />
          <Header mode={mode} setMode={setMode} />
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <React.Suspense
                    fallback={
                      <CircularProgress
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%,-50%)",
                        }}
                      />
                    }
                  >
                    <LazyLoading />
                  </React.Suspense>
                }
              />
              <Route path="users/:profileId" element={<Profile />} />
            </Route>
          </Routes>
        </PostProvider>
      </ThemeProvider>
    </ToastProvider>
  );
}

export default App;
