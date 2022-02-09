import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IAssets } from "../../utils/TypeScript";
import coinInstance from "../../utils/Axios";
import { useDidMount } from "beautiful-react-hooks";
import NumberFormat from "react-number-format";

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

  let allAssets: IAssets[] = [];

  const actions = {
    async fetchCoins() {
      if (allAssets.length < 1) {
        allAssets = await coinInstance.getAssets();
      }

      return allAssets;
    },

    async fetchCoinSubset(skip: number = 0, limit: number = 10) {
      try {
        setState({ ...state, loading: true, error: undefined });

        const assets = await this.fetchCoins();

        setState({ data: assets.slice(skip, skip + limit), loading: false });
      } catch (error) {
        setState({ ...state, loading: false, error: (error as Error).message });
      }
    },
  };

  return { state, actions };
}

const TableSection = () => {
  // const dispatch = useDispatch();

  const { state, actions } = useGetCoins();
  useDidMount(async () => {
    await actions.fetchCoinSubset();
  });



  // useEffect(() => {
  //   setLoading(true)
  //   getAPI('/assets').then((res) => {
  //     setAssets(res.data)
  //     setLoading(false)
  //   })
  //   .catch((err) => {
  //     setError(err.response.data.msg)
  //     setLoading(false)
  //   })
  //   return () => setAssets(undefined)
  // },[])

  return (
    <div className="container white table-section">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow className="uppercase">
              <TableCell className="text-dark">
                <strong>Asset id</strong>
              </TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Price($)</TableCell>
              <TableCell align="right">Volume(1hr)</TableCell>
              <TableCell align="right">VOLUME(24hrs)</TableCell>
              <TableCell align="right">VOLUME(1month)</TableCell>
              <TableCell align="right">Data start</TableCell>
              <TableCell align="right">Data end</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.data.map((st) => (
              <TableRow
                key={st.asset_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {st.asset_id}
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
                  <NumberFormat
                    value={st.volume_1hrs_usd}
                    displayType={"text"}
                    decimalScale={2}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                <NumberFormat
                    value={st.volume_1day_usd}
                    displayType={"text"}
                    decimalScale={2}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                <NumberFormat
                    value={st.volume_1mth_usd}
                    displayType={"text"}
                    decimalScale={2}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </TableCell>
                <TableCell align="right">
                {st.data_start}
                </TableCell>
                <TableCell align="right">
                {st.data_end}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </TableContainer>
      <div className="text-center">

      <span className="btn btn-danger mt-3 text-center px-2 py-2">Load More</span>
      </div>
    </div>
  );
};

export default TableSection;
