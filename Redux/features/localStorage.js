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
    return { "error from load state": err.message };
  }
};

export const saveState = (state, loadStateFromLocalStorage) => {
  try {
    console.log("loadStateFromLocalStorage", loadStateFromLocalStorage);
    if (!loadStateFromLocalStorage) {
      localStorage.setItem("state", JSON.stringify({ ChartData: [state] }));
      return "Item Added To Chart";
    }
    localStorage.setItem(
      "state",
      JSON.stringify({ ChartData: state ? [...loadStateFromLocalStorage, state] : [...loadStateFromLocalStorage] })
    );
    return "Item Added To Chart";
  } catch (err) {
    // Handle errors here
    console.log("error from save state", err.message);
    return "Something Went Wrong";
  }
};
