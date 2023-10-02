// src/redux/localStorage.js
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return [];
    }
    console.log("//////serializedState////", JSON.parse(serializedState));
    return JSON.parse(serializedState);
  } catch (err) {
    return err.message;
  }
};

export const saveState = (state, loadStateFromLocalStorage) => {
  try {
    localStorage.setItem(
      "state",
      JSON.stringify({ ChartData: [...(loadStateFromLocalStorage?.ChartData ?? []), state] })
    );
    return "Item Added To Chart";
  } catch {
    // Handle errors here
    return "Something Went Wrong";
  }
};
