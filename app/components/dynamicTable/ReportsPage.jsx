'use client'
import { Box } from '@mui/material';
import React, { useState } from 'react';
import data from '@/data/data.json'
import { columnData } from '@/utils/tableHeader';
import ReportsTable from './ReportsTable';

const ReportsPage = () => {
    const [rows, setRows] = useState([...data]);
    const [columns, setColumns] = useState([...columnData]);


  return (
    <Box paddingTop={"20px"}>
        <ReportsTable columns={columns} rows={rows} />
    </Box>
  )
}

export default ReportsPage