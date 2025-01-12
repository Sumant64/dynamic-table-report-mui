'use client'
import { Box, Button, Dialog, FormControl, InputBase, InputLabel, MenuItem, Paper, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import data from '@/data/data.json'
import { columnData } from '@/utils/tableHeader';
import ReportsTable from './ReportsTable';
import { CiFilter } from "react-icons/ci";
import { LuDownload } from "react-icons/lu";
import ColumnFilterDialog from './ColumnFilterDialog';
import SearchIcon from '@mui/icons-material/Search';
import * as XLSX from 'xlsx';

const ReportsPage = () => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [columns, setColumns] = useState([...columnData]);
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    const [openDialog, setOpenDialog] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [createdDate, setCreatedDate] = useState({ from: '', to: '', field: 'All' });
    const [isCustom, setIsCustom] = useState({ from: '', to: '', display: false });
    const [sort, setSort] = useState({field: '', value: ""});

    useEffect(() => {
        initialLoad(searchValue);
    }, [page, rowsPerPage, createdDate, sort]);

    const initialLoad = (search) => {
        try {
            let dataArr = [...data];

            // for the search
            if (search?.length > 0) {
                let searchList = dataArr.filter((item) => {
                    if (item.payer.includes(search)) {
                        return item
                    }
                })
                dataArr = searchList;
            }

            // for the sort by created date:
            if (createdDate.field !== "All" && createdDate.from && createdDate.to) {
                let from = new Date(createdDate.from);
                let to = new Date(createdDate.to);
                console.log(from);
                console.log(to);

                let dateFilterList = dataArr.filter((item) => {
                    let created = new Date(item.createdOn);

                    return created >= from && created <= to;
                })
                dataArr = dateFilterList;
            }

            if(sort.field && sort.value) {
                
                dataArr = sortColumn(dataArr);
            }

            let paginatedData = dataArr.slice(page * rowsPerPage - rowsPerPage, page * rowsPerPage);
            setCount(dataArr.length);
            setRows(paginatedData);

        } catch (err) {
            console.log(err);
        }
    }

    const sortColumn = (dataArr) => {
        let sortArr = JSON.parse(JSON.stringify(dataArr));
        switch(sort.field) {
            case "ID":
                if(sort.value === "asc"){
                    sortArr.sort((a, b) => a.id - b.id);
                } else {
                    sortArr.sort((a, b) => b.id - a.id);
                }
                break;
            case "Payer" :
                if(sort.value === "asc"){
                    sortArr.sort((a, b) => a.payer.localeCompare(b.payer));
                } else {
                    sortArr.sort((a, b) => b.payer.localeCompare(a.payer));
                }
                break;
            case "Created On" :
                if(sort.value === "asc"){
                    sortArr.sort((a, b) => new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime());
                } else {
                    sortArr.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
                }
                break;
            case "Status" :
                if(sort.value === "asc"){
                    sortArr.sort((a, b) => a.status.localeCompare(b.status));
                } else {
                    sortArr.sort((a, b) => b.status.localeCompare(a.status));
                }
                break;
            case "Email" :
                if(sort.value === "asc"){
                    sortArr.sort((a, b) => a.email.localeCompare(b.email));
                } else {
                    sortArr.sort((a, b) => b.email.localeCompare(a.email));
                }
                break;
            case "Payer Phone" :
                if(sort.value === "asc"){
                    sortArr.sort((a, b) => a.payerPhone.localeCompare(b.payerPhone));
                } else {
                    sortArr.sort((a, b) => b.payerPhone.localeCompare(a.payerPhone));
                }
                break;
            case "Services" :
                if(sort.value === "asc"){
                    sortArr.sort((a, b) => a.services.localeCompare(b.services));
                } else {
                    sortArr.sort((a, b) => b.services.localeCompare(a.services));
                }
                break;
            case "Scheduled" :
                if(sort.value === "asc"){
                    sortArr.sort((a, b) => new Date(a.scheduled).getTime() - new Date(b.scheduled).getTime());
                } else {
                    sortArr.sort((a, b) => new Date(b.scheduled).getTime() - new Date(a.scheduled).getTime());
                }
                break;
        }
        return sortArr 
    }

    const sortByDate = (val) => {
        setIsCustom({ from: '', to: '', display: false });
        let to = '';
        let from = '';
        switch (val) {
            case 'All':
                setCreatedDate({ from: '', to: '', field: 'All' });
                break;
            case '7Days':
                to = new Date();
                from = new Date().setDate(to.getDate() - 7);
                from = new Date(from);
                setCreatedDate({ from, to, field: '7Days' });
                break;
            case '15Days':
                to = new Date();
                from = new Date().setDate(to.getDate() - 15);
                from = new Date(from);
                setCreatedDate({ from, to, field: '15Days' });
                break;
            case '30Days':
                to = new Date();
                from = new Date().setDate(to.getDate() - 30);
                from = new Date(from);
                console.log(from)
                setCreatedDate({ from, to, field: '30Days' });
                break;
            case 'custom':
                setCreatedDate({ field: '', to: '', field: 'custom' });
                setIsCustom({ display: true, from: '', to: '' })
                break;
            default:
                return dataArr;
        }
    }

    const handleNoSearch = () => {
        setSearchValue("")
        initialLoad("")
    }

    const handleEnterPress = (e) => {
        if (searchValue !== "" && e.key === "Enter") {
            setPage(1);
            setRowsPerPage(10);
            initialLoad(searchValue);
        }
    }

    const handleSearch = () => {
        initialLoad(searchValue);
    }

    const handleCustomClick = () => {
        setCreatedDate({ field: 'custom', from: isCustom.from, to: isCustom.to });
    }

    const handleDownload = () => {
        try {
            let downloadData = JSON.parse(JSON.stringify(rows));
            if(downloadData.length > 0) {
                downloadData.forEach((item) => {
                    if(columns[columns.findIndex(item => item.field === 'ID' && item.display === false)]) delete item.id
                    if(columns[columns.findIndex(item => item.field === 'Created On' && item.display === false)]) delete item.createdOn
                    if(columns[columns.findIndex(item => item.field === 'Payer' && item.display === false)]) delete item.payer
                    if(columns[columns.findIndex(item => item.field === 'Status' && item.display === false)]) delete item.status
                    if(columns[columns.findIndex(item => item.field === 'Email' && item.display === false)]) delete item.email
                    if(columns[columns.findIndex(item => item.field === 'Payer Phone' && item.display === false)]) delete item.payerPhone
                    if(columns[columns.findIndex(item => item.field === 'Services' && item.display === false)]) delete item.services
                    if(columns[columns.findIndex(item => item.field === 'Scheduled' && item.display === false)]) delete item.scheduled
                })
            }

            let fileName = createdDate.field.toLowerCase();
            fileName = fileName + '.xlsx';
            exportToExcel(downloadData, fileName);
        } catch (err) {
            console.log(err);
        }
    }

    const exportToExcel = (data, filename) => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, filename);
        setTimeout(() => {
            // setIsDisabled(false);
        }, 1000);
    };


    return (
        <>
            {/* Columns filter dialog */}
            <Dialog open={openDialog === "filter"} onClose={() => setOpenDialog("")}>
                <ColumnFilterDialog columns={columns} setColumns={setColumns} setOpenDialog={setOpenDialog} />
            </Dialog>


            <Box paddingTop={"20px"}>
                {/* Options Container */}
                <Box sx={{
                    display: 'flex',
                    marginBottom: '10px',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap'
                }}>
                    <Box component={Paper} elevation={3} sx={{
                        display: 'inline-flex',
                    }}>
                        <Box sx={{ cursor: 'pointer', padding: '4px 10px', borderRight: '1px solid black' }} onClick={() => setOpenDialog('filter')}>
                            <CiFilter />
                        </Box>
                        <Box sx={{ cursor: 'pointer', padding: '4px 10px' }} onClick={() => handleDownload()}>
                            <LuDownload />
                        </Box>
                        <Box>
                            <Select
                                value={createdDate.field}
                                onChange={(e) => sortByDate(e.target.value)}
                                // label="Select Action"
                                style={{
                                    height: '30px'
                                }}
                            >
                                <MenuItem value="All">All</MenuItem>
                                <MenuItem value="7Days">Last 7 Days</MenuItem>
                                <MenuItem value="15Days">Last 15 Days</MenuItem>
                                <MenuItem value="30Days">Last 30 Days</MenuItem>
                                <MenuItem value="custom">Custom</MenuItem>
                            </Select>
                        </Box>
                    </Box>

                    {/* Search Container */}
                    <Box sx={{
                        position: 'relative',
                        borderRadius: '10px',
                        backgroundColor: "#fffffff0",
                        border: `1px solid #e0e0e0`,
                        padding: '5px',
                        marginRight: '15px',
                        marginTop: { xs: '10px', md: '0px' },
                        width: { xs: '100%', md: '200px' },
                        height: '30px',
                        display: { xs: 'flex', md: 'flex' },
                    }}>
                        <SearchIcon sx={{ marginRight: '10px', cursor: 'pointer' }} onClick={handleSearch} />
                        <InputBase
                            placeholder="Search Payer"
                            value={searchValue}
                            sx={{
                                height: '30px',
                                position: 'relative',
                                top: '-4px'
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            type="search"
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                                if (e.target.value == '') {
                                    handleNoSearch();
                                }
                            }}
                            onKeyDown={(e) => handleEnterPress(e)}
                        />
                    </Box>
                </Box>

                {/* Custom Sort */}
                {
                    isCustom.display &&
                    <Box sx={{
                        display: 'inline-flex',
                        marginBottom: '10px',
                        width: { xs: '100%', md: '20vw' }
                    }} component={Paper} elevation={3}>
                        <input
                            style={{
                                flex: '1'
                            }}
                            type='date'
                            value={isCustom.from}
                            onChange={(event) => event.target.value?.length > 0 && setIsCustom({ ...isCustom, from: event.target.value })}
                        />
                        <input
                            style={{
                                flex: '1'
                            }}
                            type='date'
                            onChange={(event) => event.target.value?.length > 0 && setIsCustom({ ...isCustom, to: event.target.value })}
                            value={isCustom.to}
                        />
                        <Button
                            variant='contained'
                            sx={{
                                height: '30px',
                                backgroundColor: '#2C387E',
                                flex: '1'
                            }}
                            onClick={() => handleCustomClick()}
                        >
                            Submit
                        </Button>
                    </Box>
                }


                <ReportsTable sort={sort} setSort={setSort} setRowsPerPage={setRowsPerPage} page={page} setPage={setPage} columns={columns} count={count} rowsPerPage={rowsPerPage} rows={rows} />
            </Box>
        </>
    )
}

export default ReportsPage