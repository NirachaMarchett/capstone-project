import Header from "@/component/Header";
import GlobalStyle from "../styles";
import { groceries } from "@/resources/groceries";
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { v4 as uuidv4 } from "uuid";
import Navigation from "@/component/Navigation";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { lightTheme, darkTheme } from "./../resources/themes.js";

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");
  const [groceriesList, setGroceriesList] = useLocalStorageState(
    "groceriesList",
    { defaultValue: groceries }
  );

  const handleAddItem = (newItem) => {
    setGroceriesList([
      ...groceriesList,
      { ...newItem, id: uuidv4().slice(0, 8) },
    ]);
  };

  const handleItemUpdate = (updatedDetail) => {
    // Update the groceries list with the updated detail
    const updatedList = groceriesList.map(
      (item) =>
        //To make sure any attributes are not being removed by accident, spread them first. The second spread (...updatedDetail) will overwrite any attributes that has the change
        item.id === updatedDetail.id ? { ...item, ...updatedDetail } : item
      //If use line17, any attribute might be accidentlly removed
      // item.id === updatedDetail.id ? updatedDetail : item
    );
    setGroceriesList(updatedList);
  };

  const handleDeleteItem = (id) => {
    setGroceriesList((items) => items.filter((item) => item.id !== id));
  };

  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyle />
        <Header onToggle={handleToggle} />
        <Navigation />
        <Component
          {...pageProps}
          onAddItem={handleAddItem}
          groceriesList={groceriesList}
          onChange={handleItemUpdate}
          onDelete={handleDeleteItem}
          onToggle={handleToggle}
        />
      </ThemeProvider>
    </>
  );
}

const StyledBody = styled.div`
  background-color: ${(props) => props.theme.body};
`;
