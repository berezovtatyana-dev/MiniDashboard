import FocusInput from "./FocusInput";
import FilterList from "./FilterList";

function App() {
  const DATA = [
    { id:1, name: 'Avt' },
    { id:2, name: 'Ab' },
    { id:3, name: 'bAb' },
    { id:4, name: 'nav' }
  ]

  return (
    <>
      <FocusInput />
      <FilterList users={DATA} />
    </>
  )
}

export default App;
