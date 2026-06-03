import React, {useState, useMemo, useEffect} from "react";
import { generateMockData } from "./mockData";
import DashboardMetrics from './DashboardMetrics';
import FilterPanel from "./FilterPanel";
import AnaliticTable from "./AnaliticTable";

function App() {
  const [rowData, setRowData] = useState(()=>generateMockData());
  const [filters, setFilters] = useState({search: '', category: '', status: ''});

  const filteredData = useMemo(()=>{

  },[rowData, filters.search, filters.category, filters.status]);

  return (
    <>
      <DashboardMetrics filteredData={rowData} />

    </>
  )
}

export default App;
