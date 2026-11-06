import MainLayout from "./components/layout/MainLayout";
import { MyListProvider } from "./components/mylist/MyListContext";
import { NotificationsProvider } from "./components/notifications/NotificationsContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <MyListProvider>
      <NotificationsProvider>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </NotificationsProvider>
    </MyListProvider>
  );
}

export default App;