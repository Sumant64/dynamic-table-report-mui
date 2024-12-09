'use client'
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import data from '@/data/data.json'
import { columnData } from '@/utils/tableHeader';
import ReportsTable from './ReportsTable';

const ReportsPage = () => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [columns, setColumns] = useState([...columnData]);
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    useEffect(() => {
        initialLoad();
    }, [page, rowsPerPage])

    const initialLoad = () => {
        try{
            let dataArr = [...data];
            console.log(dataArr)

            let paginatedData = dataArr.slice(page * rowsPerPage - rowsPerPage, page * rowsPerPage);
            setCount(dataArr.length);
            setRows(paginatedData);
            console.log(paginatedData, "==========")

        } catch(err) {
            console.log(err);
        }
    }


  return (
    <Box paddingTop={"20px"}>
        <ReportsTable setRowsPerPage={setRowsPerPage} page={page} setPage={setPage} columns={columns} count={count} rowsPerPage={rowsPerPage} rows={rows} />
    </Box>
  )
}

export default ReportsPage