import React, { Fragment, useState, useRef, useEffect } from "react";
// Material-ui imports
import { fade, withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import TextField from "@material-ui/core/TextField";
import "./styles.css"

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});
const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "20%",
    padding: "2px 6px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}))(InputBase);

export default function DataTabelVariable(props) {
  // Table
  const classes = useStyles();
  const [rowValue, setRowValue] = useState(0);
  const [columnsValue, setColumnsValue] = useState(0);
  const [tableCellsData, setTableCellsData] = useState();
  const [tableArrayData] = useState([[]]);
  const [tableDictData] = useState([{}]);
  // const header_row = [];
  const ref = useRef(null);

  const getUniqueKeyFromArrayIndex = (rowNum, columnNum) => {
    return `${rowNum}-${columnNum}`;
  };

  const onChangeHandler = (e) => {
    setTableCellsData({
      ...tableCellsData,
      [e.target.name]: e.target.value
    });
    let [row, col] = e.target.name.split("-");
    row = parseInt(row, 10);
    col = parseInt(col, 10);

    if (!tableArrayData[row]) {
      tableArrayData[row] = [];
      tableArrayData[row].push([]);
    }

    tableArrayData[row][col] = e.target.value;
  };

  useEffect(() => {
    // console.log(tableArrayData.length);
    // console.log(tableArrayData[0]);
    // console.log(tableDictData);
    console.log(tableDictData);
  }, [tableCellsData]);

  const generateTable = () => {
    let table = [];
    // Outer loop to create parent
    let rowVariable = 1;
    rowVariable = rowValue + rowVariable;
    // console.log(rowVariable)
    for (let i = 1; i < rowVariable; i++) {
      let children = [];
      //Inner loop to create children
      for (let j = 0; j < columnsValue; j++) {
        children.push(
          <td>
            {rowVariable === 1 ? (
              <BootstrapInput
                placeholder="header_value"
                name={getUniqueKeyFromArrayIndex(i, j)}
                onChange={onChangeHandler}
              />
            ) : (
              <BootstrapInput
                placeholder=""
                name={getUniqueKeyFromArrayIndex(i, j)}
                onChange={onChangeHandler}
              />
            )}
          </td>
        );
      }
      table.push(
        <TableRow key={i}>
          <TableCell>{children}</TableCell>
        </TableRow>
      );
    }
    return table;
  };

  // const handleSubmit = () => {
  //   let header = tableArrayData[0];
  //   // go through cells
  //   for (var i = 1; i < tableArrayData.length; i++) {
  //     var tableRow = tableArrayData[i];
  //     var rowData = {};

  //     for (var j = 0; j < tableRow.length; j++) {
  //       if (tableRow.length === header.length) {
  //         rowData[header[j]] = tableRow[j];
  //       }
  //     }

  //     tableDictData.push(rowData);
  //   }
  //   console.log(tableDictData);
  // };
  return (
    <Fragment>
      <div className="main">
        <h5 className="select">Select Row number and Columns number</h5>
        <div className={"rowColumnsNumber"} style={{ marginTop: 20 }} >
          <TextField 
          className="input"
            id="Row-number"
            label="Row(s)"
            type="number"
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: "0", max: "1000", step: "1" }}
            onChange={(e) => setRowValue(parseInt(e.target.value, 10))}
            variant="outlined"
          />
          <TextField className="input"
            id="Columns-number"
            label="Columns(s)"
            type="number"
            inputProps={{ min: "0", max: "1000", step: "1" }}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setColumnsValue(parseInt(e.target.value, 10))}
            variant="outlined"
          />
        </div>
        <br />
        <div className={"TableContainer"}>
          <div component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody ref={ref}>{generateTable()}</TableBody>
              {/* <TableBody> {generateTable()}</TableBody> */}
            </Table>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
