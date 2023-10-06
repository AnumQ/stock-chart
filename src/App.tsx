/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import HighStockChart from "./Components/HighStockChart";
import Navigation from "./Components/Navigation";
import {
  DAILY_PERIOD,
  WEEKLY_PERIOD,
  MONTHLY_PERIOD,
  DEFAULT_STOCK_TITLE,
  NAV_ITEM_DEMO,
  CARD_BLUR,
  CARD,
  E109_MSG,
} from "./Helpers/Constants";
import { StockData } from "./Interfaces/StockData";
import useData from "./Hooks/useData";
import { useNavContext } from "./Contexts/NavigationContext";

function App() {
  const { data, fetchData } = useData();
  const { navState } = useNavContext();
  const [activeButton, setActiveButton] = useState<string>(NAV_ITEM_DEMO);
  const [isLoading, setLoading] = useState(false);

  async function loadData(stock?: string) {
    try {
      setLoading(true);
      await fetchData(stock || undefined);
    } catch (e) {
      console.error(E109_MSG);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (navState.search && navState.search.length > 0) {
      // Fetches stock data for all periods with stock
      loadData(navState.search);
    }
  }, [navState.search]);

  useEffect(() => {
    // Fetches data for all periods based on LIVE or DEMO

    loadData();
  }, [navState.isLive]);

  // Renders stock chart for a specific period
  const renderChart = (period: string, index: number) => {
    return (
      <div className={isLoading ? CARD_BLUR : CARD} key={index}>
        <HighStockChart
          data={data[period] as StockData[]}
          chartId={`stock-chart-${index + 1}`}
          stock={navState.search ?? DEFAULT_STOCK_TITLE}
          period={periodLabels[period] || ""}
        />
      </div>
    );
  };

  return (
    <div className="container">
      <header>
        <Navigation
          activeButton={activeButton}
          setActiveButton={setActiveButton}
          // isLive={isLive}
          // toggleLive={toggleLive}
        />
      </header>
      <div className="card-container">
        {/* Render charts for all periods */}
        {[DAILY_PERIOD, WEEKLY_PERIOD, MONTHLY_PERIOD].map(renderChart)}
      </div>
      <footer>
        <i className="fa-sharp fa-solid fa-copyright logo"></i>
        <p>Copyright 2023 </p>
      </footer>
    </div>
  );
}

export default App;

interface PeriodLabel {
  [key: string]: string;
}
const periodLabels = {
  [MONTHLY_PERIOD]: "Monthly",
  [DAILY_PERIOD]: "Daily",
  [WEEKLY_PERIOD]: "Weekly",
} as PeriodLabel;
