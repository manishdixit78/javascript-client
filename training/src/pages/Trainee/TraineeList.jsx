/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles } from '@material-ui/core';
import { Mutation } from '@apollo/react-components';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { graphql } from '@apollo/react-hoc';
import Compose from 'lodash.flowright';
import { AddDialog, EditDialog, DeleteDialog } from './components/index';
import { TableComponent } from '../../components';
import { GET_TRAINEE } from './Query';
import { MyContext } from '../../contexts/index';
import { UPDATE_TRAINEE, CREATE_TRAINEE } from './Mutation';
import { DELETED_TRAINEE_SUB, UPDATED_TRAINEE_SUB, CREATE_SUB } from './Subscription';

const useStyles = (theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  dialog: {
    textAlign: 'right',
  },
});

class TraineeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      orderBy: '',
      order: 'asc',
      EditOpen: false,
      RemoveOpen: false,
      editData: {},
      deleteData: {},
      page: 0,
      rowsPerPage: 5,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    const { open } = this.state;
    this.setState({ open: false });
    return open;
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0,

    });
  };

  onSubmitAdd = async (data, openSnackBar, createTrainee) => {
    try {
      const { name, email, password } = data;
      await createTrainee({ variables: { name, email, password } });
      this.setState({
        open: false,
      }, () => {
        openSnackBar('Trainee Created Successfully', 'success');
      });
    } catch (err) {
      console.log('err :', err);
      this.setState({
        open: false,
      }, () => {
        openSnackBar('Error While Creating', 'error');
      });
    }
  }

  handleSelect = (event) => {
    console.log(event);
  };

  handleSort = (field) => (event) => {
    const { order } = this.state;
    console.log(event);
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
    });
  };

  // eslint-disable-next-line no-unused-vars
  handleRemoveDialogOpen = (element) => (event) => {
    this.setState({
      RemoveOpen: true,
      deleteData: element,
    });
  };

  handleRemoveClose = () => {
    this.setState({
      RemoveOpen: false,
    });
  };

  handleRemove = () => {
    const { deleteData } = this.state;
    this.setState({
      RemoveOpen: false,
    });
    console.log('Deleted Item ', deleteData);
  };

  // eslint-disable-next-line no-unused-vars
  handleEditDialogOpen = (element) => (event) => {
    this.setState({
      EditOpen: true,
      editData: element,
    });
  };

  handleEditClose = () => {
    this.setState({
      EditOpen: false,
    });
  };

  onSubmitEdit = async (data, openSnackBar, updateTrainee) => {
    try {
      const { name, email, id } = data;
      await updateTrainee({ variables: { name, email, id } });
      this.setState({
        EditOpen: false,
      }, () => {
        openSnackBar('Trainee Updated Successfully', 'success');
      });
    } catch (err) {
      console.log('err :', err);
      this.setState({
        open: false,
      }, () => {
        openSnackBar('Error While Updating', 'error');
      });
    }
  };

  handlePageChange = (refetch) => (event, newPage) => {
    // const { rowsPerPage } = this.state;
    const { data: { variables } } = this.props;
    this.setState({
      page: newPage,
    }, () => {
      refetch({ variables });
    });
  }

  componentDidMount = () => {
    const { data: { subscribeToMore } } = this.props;
    subscribeToMore({
      document: UPDATED_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const { getAllTrainees: { record } } = prev;
        const { data: { traineeUpdated } } = subscriptionData;
        const updatedRecords = [...record].map((records) => {
          if (records.originalId === traineeUpdated.originalId) {
            return {
              ...records,
              ...traineeUpdated,
            };
          }
          return records;
        });
        return {
          getAllTrainees: {
            ...prev.getAllTrainees,
            ...prev.getAllTrainees.TraineeCount,
            record: updatedRecords,
          },
        };
      },
    });
    subscribeToMore({
      document: DELETED_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const { getAllTrainees: { record } } = prev;
        const { data: { traineeDeleted } } = subscriptionData;
        // eslint-disable-next-line max-len
        const updatedRecords = [...record].filter((records) => records.originalId !== traineeDeleted.data.originalId);
        return {
          getAllTrainees: {
            ...prev.getAllTrainees,
            ...prev.getAllTrainees.TraineeCount - 1,
            record: updatedRecords,
          },
        };
      },
    });
    subscribeToMore({
      document: CREATE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const { getAllTrainees: { record } } = prev;
        const { data: { traineeAdded } } = subscriptionData;
        record.unshift(traineeAdded);
        // eslint-disable-next-line max-len
        const updatedRecords = [...record].unshift((records) => records.originalId !== traineeAdded.originalId);
        return {
          getAllTrainees: {
            ...prev.getAllTrainees,
            // eslint-disable-next-line radix
            totalCountOfData: parseInt(prev.getAllTrainees.TraineeCount) + 1,
            record: updatedRecords,
          },
        };
      },
    });
  }

  render() {
    const {
      open, order, orderBy, page,
      rowsPerPage, EditOpen, RemoveOpen, editData, deleteData,
    } = this.state;
    const { classes } = this.props;
    const {
      data: {
        getAllTrainees: { record = [], TraineeCount = 0 } = {},
        refetch,
        loading,
      },
    } = this.props;
    const variables = { skip: page * rowsPerPage.length, limit: rowsPerPage.length };
    return (
      <>
        <Mutation
          mutation={CREATE_TRAINEE}
          refetchQueries={[{ query: GET_TRAINEE, variables }]}
        >
          {(createTrainee, createrLoader = { loading }) => (
            <Mutation
              mutation={UPDATE_TRAINEE}
              refetchQueries={[{ query: GET_TRAINEE, variables }]}
            >
              {(updateTrainee, updateLoader = { loading }) => (
                <MyContext.Consumer>
                  {({ openSnackBar }) => (
                    <>
                      <div className={classes.root}>
                        <div className={classes.dialog}>
                          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                            ADD TRAINEELIST
                          </Button>
                          <AddDialog
                            open={open}
                            onClose={this.handleClose}
                            onSubmit={
                              (data) => this.onSubmitAdd(
                                data, openSnackBar, createTrainee,
                              )
                            }
                            loading={createrLoader}
                          />
                        </div>
          &nbsp;
          &nbsp;
                        <EditDialog
                          Editopen={EditOpen}
                          handleEditClose={this.handleEditClose}
                          handleEdit={
                            (data) => this.onSubmitEdit(
                              data, openSnackBar, updateTrainee,
                            )
                          }
                          data={editData}
                          loading={updateLoader}
                        />
                        <br />
                        <DeleteDialog
                          data={deleteData}
                          onClose={this.handleRemoveClose}
                          onSubmit={this.handleRemove}
                          open={RemoveOpen}
                          refetch={refetch}
                        />
                        <br />
                        <br />
                        <TableComponent
                          loader={loading}
                          id="id"
                          data={record}
                          column={
                            [
                              {
                                field: 'name',
                                label: 'Name',
                              },
                              {
                                field: 'email',
                                label: 'Email Address',
                                format: (value) => value && value.toUpperCase(),
                              },
                              {
                                field: 'createdAt',
                                label: 'Date',
                                align: 'right',
                                format: this.getDateFormat,
                              },
                            ]
                          }
                          actions={[
                            {
                              icon: <EditIcon />,
                              handler: this.handleEditDialogOpen,

                            },
                            {
                              icon: <DeleteIcon />,
                              handler: this.handleRemoveDialogOpen,
                            },
                          ]}
                          onSort={this.handleSort}
                          orderBy={orderBy}
                          order={order}
                          onSelect={this.handleSelect}
                          count={TraineeCount}
                          page={page}
                          onChangePage={this.handlePageChange(refetch)}
                          rowsPerPage={rowsPerPage}
                          onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                      </div>
                    </>
                  )}
                </MyContext.Consumer>
              )}
            </Mutation>
          )}
        </Mutation>
      </>
    );
  }
}
TraineeList.contextType = MyContext;
TraineeList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default Compose(
  withStyles(useStyles),
  graphql(GET_TRAINEE, {
    options: { variables: { skip: 0, limit: 50, sort: 'name' } },
  }),
)(TraineeList);
