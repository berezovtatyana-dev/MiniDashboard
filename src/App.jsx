import React, {useState, useMemo, useEffect} from "react";
import { generateMockData } from "./mockData";
import DashboardMetrics from './DashboardMetrics';

function App() {
  const [rowData, setRowData] = useState(()=>generateMockData());

  return (
    <>
      <DashboardMetrics filteredData={rowData} />    
    </>
  )
}

export default App;
