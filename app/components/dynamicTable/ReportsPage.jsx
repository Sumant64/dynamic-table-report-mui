'use client'
import { Box, Dialog, FormControl, InputLabel, MenuItem, Paper, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import data from '@/data/data.json'
import { columnData } from '@/utils/tableHeader';
import ReportsTable from './ReportsTable';
import { CiFilter } from "react-icons/ci";
import { LuDownload } from "react-icons/lu";
import ColumnFilterDialog from './ColumnFilterDialog';

const ReportsPage = () => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [columns, setColumns] = useState([...columnData]);
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    const [openDialog, setOpenDialog] = useState('');
    const [sort, setSort] = useState('7Days');

    useEffect(() => {
        initialLoad();
        console.log(sort)
    }, [page, rowsPerPage, sort]);

    const initialLoad = () => {
        try {
            let dataArr = [...data];

            let paginatedData = dataArr.slice(page * rowsPerPage - rowsPerPage, page * rowsPerPage);
            setCount(dataArr.length);
            setRows(paginatedData);

        } catch (err) {
            console.log(err);
        }
    }


    return (
        <>
            {/* Columns filter dialog */}
            <Dialog open={openDialog === "filter"} onClose={() => setOpenDialog("")}>
                <ColumnFilterDialog columns={columns} setColumns={setColumns} setOpenDialog={setOpenDialog} />
            </Dialog>


            <Box paddingTop={"20px"}>
                {/* Options Container */}
                <Box sx={{
                    display: 'inline-flex',
                    marginBottom: '10px'
                }} component={Paper} elevation={3}>
                    <Box sx={{ cursor: 'pointer', padding: '4px 10px', borderRight: '1px solid black' }} onClick={() => setOpenDialog('filter')}>
                        <CiFilter />
                    </Box>
                    <Box sx={{ cursor: 'pointer', padding: '4px 10px' }}>
                        <LuDownload />
                    </Box>
                    <Box>
                        <Select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            // label="Select Action"
                            style={{
                                height: '30px'
                            }}
                        >
                            <MenuItem value="7Days">Last 7 Days</MenuItem>
                            <MenuItem value="15Days">Last 15 Days</MenuItem>
                            <MenuItem value="30Days">Last Month</MenuItem>
                            <MenuItem value="custom">Custom</MenuItem>
                        </Select>
                    </Box>


                </Box>
                {/* Custom Sort */}
                {
                    sort === 'custom' &&
                    <Box sx={{
                        display: 'inline-flex',
                        marginBottom: '10px'
                    }} component={Paper} elevation={3}>
                    
                    </Box>
                }


                <ReportsTable setRowsPerPage={setRowsPerPage} page={page} setPage={setPage} columns={columns} count={count} rowsPerPage={rowsPerPage} rows={rows} />
            </Box>
        </>
    )
}

export default ReportsPage