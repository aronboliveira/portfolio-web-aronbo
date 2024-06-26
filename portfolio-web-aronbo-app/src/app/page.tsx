"use client";

import { useRouter } from "next/navigation";
import Home from "./components/home";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App() {
  const router = useRouter();
  return (
    <Provider store={store}>
      <Home router={router} />
    </Provider>
  );
}
