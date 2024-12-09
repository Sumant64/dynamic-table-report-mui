import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'

const ReportsTable = ({columns, rows}) => {

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

  return (
    <>
        {/* table section */}
      <TableContainer sx={{ height: '70vh' }} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead sx={{ position: 'sticky', top: '0px', zIndex: '5' }}>
            <TableRow>
              {
                columns.map((item, index) => {
                  if(item.display) {
                    return (
                      <StyledTableCell key={index} sx={{ minWidth: item?.width }}>
                        {item.field}
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
                  return (
                    <StyledTableRow key={index}>
                      {columns[columns.findIndex(item => item.field === 'ID' && item.display)] && <StyledTableCell>{item.id}</StyledTableCell>}
                      {columns[columns.findIndex(item => item.field === 'Created On' && item.display)] && <StyledTableCell>{item.createdOn}</StyledTableCell>}
                      {columns[columns.findIndex(item => item.field === 'Payer' && item.display)] && <StyledTableCell>{item.payer}</StyledTableCell>}
                      {columns[columns.findIndex(item => item.field === 'Status' && item.display)] && <StyledTableCell>{item.status}</StyledTableCell>}
                      {columns[columns.findIndex(item => item.field === 'Email' && item.display)] && <StyledTableCell>{item.email}</StyledTableCell>}
                      {columns[columns.findIndex(item => item.field === 'Payer Phone' && item.display)] && <StyledTableCell>{item.payerPhone}</StyledTableCell>}
                      {columns[columns.findIndex(item => item.field === 'Services' && item.display)] && <StyledTableCell>{item.services}</StyledTableCell>}
                      {columns[columns.findIndex(item => item.field === 'Scheduled' && item.display)] && <StyledTableCell>{item.scheduled}</StyledTableCell>}

                    </StyledTableRow>
                  )
                })
              }
            </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ReportsTable