import { useState } from "react";
import { AppData } from "../Interfaces/StockData";
import { DEMO_API_TOKEN, E104_MSG, LIVE_API_TOKEN } from "../Helpers/Constants";
import { StockService } from "../Services/StockService";
import { useNavContext } from "../Contexts/NavigationContext";

const useData = () => {
  const stockService = new StockService();
  const [data, setData] = useState<AppData>(initialState);
  const { navState } = useNavContext();

  /*  Fetches stock data from api
   Default stock is used if stock is not specified */
  const fetchData = async (stock?: string) => {
    const apiToken = navState.isLive ? LIVE_API_TOKEN : DEMO_API_TOKEN;
    try {
      const data = await stockService.fetchStockDataAllPeriods(apiToken, stock);
      if (data) {
        setData(data);
      }
    } catch (error) {
      console.error(E104_MSG, error);
    }
  };

  return {
    data,
    fetchData,
  };
};

export default useData;

export const initialState = {
  d: [],
  w: [],
  m: [],
};
