import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IAssets, IAssetsIcon } from "../../utils/TypeScript";
import coinInstance from "../../utils/Axios";
import { useDidMount } from "beautiful-react-hooks";
import NumberFormat from "react-number-format";
import Sorting from "../sorting";
import FilterByPrice from "../sorting/filterByPrice";

interface GetCoinListState {
  error?: string;
  data: IAssets[];
  loading: boolean;
}

function useGetCoins() {
  const [state, setState] = useState<GetCoinListState>({
    data: [],
    loading: false,
  });
  const [allAssets, setAllAssets] = useState<IAssets[]>([]);

  let allIcons: Record<string, string> = {};
  const actions = {
    filterByName(query: string) {
      console.log(allAssets);
      const data = allAssets
        .filter((a) => a.name.toLowerCase().includes(query.toLowerCase()))
        .splice(0, 10);

      setState({ ...state, data });
    },
    filterByPrice(query: string) {
      console.log(allAssets);
      const data = allAssets
        .filter((a) => a.name.toLowerCase().includes(query.toLowerCase()))
        .splice(0, 10);

      setState({ ...state, data });
    },
    async fetchCoins() {
      if (allAssets.length > 0) {
        return allAssets;
      }
      let assets = await coinInstance.getAssets();
      const icons = await coinInstance.getAssetsIcon();
      icons.forEach((value) => {
        allIcons[value.asset_id] = value.url;
      });
      assets = assets.map((value) => ({
        ...value,
        imageurl: allIcons[value.asset_id],
      }));
      setAllAssets([...allAssets, ...assets]);
      console.log(JSON.stringify(allAssets));
      return assets;
    },

    async fetchCoinSubset(skip: number = 0, limit: number = 10) {
      try {
        setState({ ...state, loading: true, error: undefined });

        const assets = await this.fetchCoins();

        setState({ data: assets.splice(skip, skip + limit), loading: false });
      } catch (error) {
        setState({ ...state, loading: false, error: (error as Error).message });
      }
    },
  };

  return { state, actions };
}

const TableSection = () => {
  // const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const { state, actions } = useGetCoins();
  const loadNextPage = async () => {
    const nextpage = currentPage - 1;
    const limit = 10;

    await actions.fetchCoinSubset(nextpage * limit, limit);
    setCurrentPage(currentPage + 1);
  };
  useDidMount(async () => {
    await loadNextPage();
  });

  return (
    <div className="container white table-section">
      <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: "-120px", marginBottom: "20px" }}>
        <div className="me-2">

        <Sorting filterByName={actions.filterByName} />
        </div>
        <div>
          <FilterByPrice filterByPrice={actions.filterByPrice}/>
          </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow className="uppercase">
              <TableCell>Icon</TableCell>
              <TableCell className="text-dark">
                <strong>Asset id</strong>
              </TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Price($)</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.data.map((st) => (
              <TableRow
                key={st.asset_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <img src={st.imageurl} alt="" />
                </TableCell>
                <TableCell component="th" scope="row">
                  {st.name}
                </TableCell>
                <TableCell align="right">{st.name}</TableCell>
                <TableCell align="right">
                  <NumberFormat
                    value={st.price_usd}
                    displayType={"text"}
                    decimalScale={2}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>

                <TableCell align="right">
                  <div className="dropdown">
                    <button
                      className="btn btn-danger dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      shop
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          Buy
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Sell
                        </a>
                      </li>
                    </ul>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="text-center">
        <span
          className="btn btn-danger mt-3 text-center px-2 py-2"
          onClick={loadNextPage}
        >
          Load More
        </span>
      </div>
    </div>
  );
};

export default TableSection;
