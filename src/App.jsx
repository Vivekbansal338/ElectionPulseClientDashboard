// import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/themes/lara-light-purple/theme.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { store, persistor } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import ElectionById from "./Pages/ElectionById";
import PendingElection from "./Pages/ElectionStatusWise/PendingElection";
import CompletedElection from "./Pages/ElectionStatusWise/CompletedElection";
import OngoingElection from "./Pages/ElectionStatusWise/OngoingElection";
import UpcomingElection from "./Pages/ElectionStatusWise/UpcomingElection";
import Employees from "./Pages/Employees";
import EmployeeById from "./Pages/EmployeeById";
import Elections from "./Pages/Elections";
import Settings from "./Pages/Settings";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import NotFound from "./Pages/NotFound";
import SideBarWithHeader from "./Layout/SideBarWithHeader";
import "@fortawesome/fontawesome-free/css/all.css";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <PrimeReactProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<SideBarWithHeader />}>
                  <Route path="/" element={<Home />} />
                  <Route path="elections" element={<Elections />} />

                  {/* <Route path="election/:id" element={<ElectionById />} /> */}
                  <Route path="election/:id" element={<ElectionById />}>
                    <Route path="pending" element={<PendingElection />} />
                    <Route path="upcoming" element={<UpcomingElection />} />
                    <Route path="ongoing" element={<OngoingElection />} />
                    <Route path="completed" element={<CompletedElection />} />
                  </Route>
                  <Route path="employees" element={<Employees />} />
                  <Route path="employee/:id" element={<EmployeeById />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </PrimeReactProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
