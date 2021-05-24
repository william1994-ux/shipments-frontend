import React, {useState, useContext} from "react";
import { AppContext } from "../AppContext";
import { useLogout } from "../config/auth";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useMutation } from "@apollo/react-hooks";

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const Private = ({ user }) => {
const logout = useLogout();
const history = useHistory();
const user_id = user.id; 
const appContext = useContext(AppContext);
const { data, loading, error, refetch } = appContext;

const deleteshipmentMutationGQL = gql`
    mutation deleteshipment($id: ID!) {
    deleteshipment( id: $id ) {
      id 
    }
  }
`;
const [deleteshipment] = useMutation(deleteshipmentMutationGQL);

if (loading) return 'Loading...';
if (error) return `Error! ${error.message}`;
const rows = data.shipments_by_user; 


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.address}</TableCell>
        <TableCell align="right">{row.phone}</TableCell>

        <TableCell align="right">
        <IconButton  className="mr-5" aria-label="expand row" size="small" onClick={handleShow} >
        <DeleteIcon />
            
          </IconButton>
          </TableCell>
          <TableCell align="right">
        <IconButton  className="mr-5" aria-label="expand row" size="small" onClick={
                          () => { history.push({
                            pathname: '/updateshipment',
                            state: { shipmentId: row.id }

                          });
                          } 
        }> 
        <EditIcon />
            
          </IconButton>
          </TableCell>
          <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title style={{color: "red"}} >Warning!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this shipment ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <form onSubmit={e => {
          e.preventDefault();
          let id = parseInt(row.id); 
          deleteshipment({ variables: { id
         } });
          refetch();
          handleClose(); 
        }}>
          <Button type ="submit" variant="primary">Yes</Button>
          </form>
        </Modal.Footer>
      </Modal>

          </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Waybill
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>From</TableCell>
                    <TableCell>To</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                    <TableCell align="right"></TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                {row.waybill !== null
                ?

                    <TableRow >
                      
                      <TableCell component="th" scope="row" style={{borderBottom: "0px"}}>
                        {row.waybill.from}
                      </TableCell>
                      <TableCell style={{borderBottom: "0px"}}>{row.waybill.to}</TableCell>
                      <TableCell align="right" style={{borderBottom: "0px"}}>{row.waybill.price}</TableCell>
                      <TableCell align="right" style={{borderBottom: "0px"}}>
        <IconButton  className="mr-5" aria-label="expand row" size="small" onClick={
                          () => { history.push({
                            pathname: '/updatewaybill',
                            state: { waybillId: row.waybill.id }

                          });
                          } 
        }> 
        <EditIcon />
            
          </IconButton>
          </TableCell>
                    </TableRow>
                    :
                    <TableRow> 
                    <TableCell component="th" scope="row" style={{borderBottom: "0px"}}>
                        NO WAY BILL YET !
                      </TableCell>

                      <TableCell align="right" style={{borderBottom: "0px"}}>
        <IconButton  className="mr-5" aria-label="expand row" size="small"
        onClick={
                          () => { history.push({
                            pathname: '/addwaybill',
                            state: { shipmentId: row.id }

                          });
                          } 
        }> 
        <AddIcon   />
            
          </IconButton>
          </TableCell>

                      </TableRow>
                }


                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


  return (
    <div>
    { (user && user !== {}) &&
    <div style={{ margin: "auto", padding: "100px" }} >
     <div className="d-flex justify-content-between"s>
     <h4>Hello {user.name}, you can manage your shipments now!</h4>
      <button className="btn btn-primary" onClick={logout}>Logout</button>

     </div>
     
     
     <TableContainer className="mt-5" component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Shipment Name</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Phone Number</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div className="add">
            <IconButton aria-label="expand row" size="small" onClick={
                          () => { history.push({
                            pathname: '/addshipment',
                            state: { userId: user_id }

                          });
                          } 
        }> 
            <AddIcon  className="add-icon"/> 
          </IconButton>
    </div>
    </div>
    }
    </div>
  );
};

export default Private;
