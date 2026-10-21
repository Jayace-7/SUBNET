import MainLayout from "./components/layout/MainLayout";
import { MyListProvider } from "./components/mylist/MyListContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <MyListProvider>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </MyListProvider>
  );
}

export default App;