import { dateFormat } from '@/utils/date';
import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, Tooltip } from '@mui/material';
import React from 'react';
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';

const ReportsTable = ({ columns, page, rowsPerPage, count, rows, setPage, setRowsPerPage, sort, setSort }) => {

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#2C387E",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  }

  const handleSort = (item) => {
      if(item === sort.field) {
        setSort({field: item, value: sort.value === "asc" ? "desc" : "asc"})
      } else {
        setSort({field: item, value: "asc"})
      }
  }

  return (
    <>
      {/* table section */}
      <TableContainer sx={{ height: '70vh' }} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead sx={{ position: 'sticky', top: '0px', zIndex: '5' }}>
            <TableRow>
              {
                columns.map((item, index) => {
                  if (item.display) {
                    return (
                      <StyledTableCell key={index} sx={{ minWidth: item?.width, cursor: 'pointer' }} onClick={() => handleSort(item.field)}>
                        <Tooltip title="Click to Sort Column">
                          <div>
                              {item.field}
                              {sort.field === item.field && sort.value === "asc" && <SouthIcon sx={{position: 'relative', top: '2px', marginLeft: '5px', fontSize: '15px'}} /> }
                              {sort.field === item.field && sort.value === "desc" && <NorthIcon sx={{position: 'relative', top: '2px', marginLeft: '5px', fontSize: '15px'}} />}
                          </div>
                        </Tooltip>
                      </StyledTableCell>
                    )
                  }
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              rows?.length > 0 && rows.map((item, index) => {
                let createDate = dateFormat(item.createdOn);
                let scheduledDate = dateFormat(item.scheduled);


                return (
                  <StyledTableRow key={index}>
                    {columns[columns.findIndex(item => item.field === 'ID' && item.display)] && <StyledTableCell>{item.id}</StyledTableCell>}
                    {columns[columns.findIndex(item => item.field === 'Created On' && item.display)] && <StyledTableCell>{createDate}</StyledTableCell>}
                    {columns[columns.findIndex(item => item.field === 'Payer' && item.display)] && <StyledTableCell>{item.payer}</StyledTableCell>}
                    {columns[columns.findIndex(item => item.field === 'Status' && item.display)] && <StyledTableCell>{item.status}</StyledTableCell>}
                    {columns[columns.findIndex(item => item.field === 'Email' && item.display)] && <StyledTableCell>{item.email}</StyledTableCell>}
                    {columns[columns.findIndex(item => item.field === 'Payer Phone' && item.display)] && <StyledTableCell>{item.payerPhone}</StyledTableCell>}
                    {columns[columns.findIndex(item => item.field === 'Services' && item.display)] && <StyledTableCell>{item.services}</StyledTableCell>}
                    {columns[columns.findIndex(item => item.field === 'Scheduled' && item.display)] && <StyledTableCell>{scheduledDate}</StyledTableCell>}

                  </StyledTableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>

      {/* table pagination */}
      {rows.length > 0 && (
        <TablePagination
          component={Paper}
          elevation={2}
          sx={{
            "& .MuiTablePagination-selectLabel": {
              margin: '0px'
            },
            "& .MuiTablePagination-displayedRows": {
              margin: '0px'
            },
            "& .MuiTablePagination-input .MuiSvgIcon-fontSizeMedium": {
              color: '#fff'
            },
            // marginTop: '-10px',
            // margin: { xs: "5px 0px 0px -5px", md: "5px 0px" },
            backgroundColor: "#2C387E",
            color: "#fff",
            bottom: "0px",
            width: "100%",
          }}
          count={count}
          page={page - 1}
          onPageChange={(event, newPage) => setPage(newPage + 1)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      )}
    </>
  )
}

export default ReportsTable