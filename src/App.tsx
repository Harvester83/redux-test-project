import { Provider } from "react-redux";
import { store } from "./store";
import "./App.css";
import UserPage from "./pages/UserPage";

const App = () => {
  return (
    <Provider store={store}>
      <UserPage />
    </Provider>
  );
};

export default App;
