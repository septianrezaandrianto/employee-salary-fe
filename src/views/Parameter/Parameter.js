import React, {Component} from 'react';
import './../../assets/style.css';
import axios from 'axios';
import {
	Pagination,
	PaginationItem,
	PaginationLink,
/* 	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText, */
	Button,
	Card,
	CardBody,
  CardHeader,
  CardFooter,
	Col,
	Row,
	Table
} from 'reactstrap';

class Parameter extends Component {
    constructor() {
        super();
        this.state = {
            parameter : [],
            currentPage : 1,
            parameterPerPage : 5,
        }
    }

    onDelete(id) {
    alert('Data berhasil dihapus')
      axios.delete('http://localhost:8085/api/parameter/delete/' +id)
      .then((res) =>{
        console.log(res)
        this.getParameter()
      })
      .catch((error) => {
        console.log(error);
      });
    }

    getParameter() {
        axios.get('http://localhost:8085/api/parameter/all')
        .then(res => {
            this.setState ({ parameter : res.data.Data})
            console.log(res.data.Data)
        })
        .catch((error) => {
            console.log(error.res);
        });
    }

    componentDidMount () {
        this.getParameter();
    }


    /* Paginasi */
    currentPage = (e) => {
      this.setState ({
        [e.target.name] : parseInt(e.target.value)
      });
    };

    firstPage = () => {
      if (this.state.currentPage > 1) {
        this.setState ({
          currentPage : 1
        });
      }
    };

    prevPage = () => {
      if (this.state.currentPage > 1) {
        this.setState ({
          currentPage : this.state.currentPage - 1
        });
      }
    };

    nextPage = () => {
      if(this.state.currentPage < Math.ceil(this.state.parameter.length / this.state.parameterPerPage)) {
        this.setState ({
          currentPage : this.state.currentPage + 1
        });
      }
    };

    lastPage = () => {
      if(this.state.currentPage < Math.ceil(this.state.parameter.length / this.state.parameterPerPage)) {
        this.setState ({
          currentPage : Math.ceil(this.state.parameter.length / this.state.parameterPerPage)
        });
      }
    };

    render() {
        const {parameter, currentPage, parameterPerPage} = this.state;

        const lastIndex = currentPage * parameterPerPage;
        const firstIndex = lastIndex - parameterPerPage;
        const currentParameter = parameter.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(parameter.length/ parameterPerPage);
        return (
            <>
            <Row>
               <Col>
                <Card>
                  <CardHeader>
                    <i className="fa fa-tachometer"></i>List Parameter
                      </CardHeader>
                      <CardBody>
    
                      <Table hover bordered striped responsive size="sm">
                          <thead>
                          <tr>
                            <th className="nomor">No</th>
                            <th>TB Parameter</th>
                            <th>Lembur</th>
                            <th>Bonus Pg</th>
                            <th>Bonus Ts</th>
                            <th>Bonus Tw</th>
                            <th>Batasan Bonus Pg</th>
                            <th>Batasan Bonus Ts</th>
                            <th>Batasan Bonus Tw</th>
                            <th>Max Bonus</th>
                            <th>Tunj. Keluarga</th>
                            <th>Tunj. Transport</th>
                            <th>Potongan BPJS</th>
                            <th className ="aksi">Aksi</th>
                          </tr>
                          </thead>
  
                          <tbody> 

                            {parameter.length === 0 ?
                            <tr>
                                <td colSpan = "12"><h4>Belum ada data</h4></td>
                            </tr> :
                            currentParameter.map((param, index) => (         
                            <tr key= {param.idParam}>
                                <td>{index +1}</td>
                                <td>{param.tbParameter}</td>
                                <td>{param.lembur}</td>
                                <td>Rp. {param.bonusPg}</td>
                                <td>Rp. {param.bonusTs}</td>
                                <td>Rp. {param.bonusTw}</td>
                                <td>{param.batasanBonusPg}</td>
                                <td>{param.batasanBonusTs}</td>
                                <td>{param.batasanBonusTw}</td>
                                <td>Rp. {param.maxBonus}</td>
                                <td>{param.tkeluarga}</td> 
                                <td>{param.pbpjs}</td>
                                <td>Rp. {param.ttransport}</td>                   
                                <td>
                                     <Button type="submit" size="sm" color="warning" /* onClick={this.onEdit.bind(this, pen.idPendapatan)} */ className="mr-2"><i className="fa fa-pencil" name="edit"></i></Button>
                                     
                                <Button type="reset" size="sm" color="danger" onClick={this.onDelete.bind(this, param.idParam)}><i className="fa fa-trash"></i></Button>
                                 </td>
                            </tr>
                          ))}
                          </tbody>
                           
                        </Table>
                      </CardBody>

                      <CardFooter>
                       <div style={{"float" : "left"}}>
                          Halaman {currentPage} dari {totalPages}
                      </div>

                      <nav>
                          <Pagination className= "paginasi">
                          <PaginationItem><PaginationLink previous tag="button" disabled={currentPage === 1 ? true : false} onClick={this.firstPage}>First</PaginationLink></PaginationItem>
                            <PaginationItem><PaginationLink previous tag="button" disabled={currentPage === 1 ? true : false} onClick={this.prevPage}>Prev</PaginationLink></PaginationItem>

                            <PaginationItem active>
                              <PaginationLink tag="button" name="currentPage" value={currentPage} onChange = {this.changePage}>{currentPage}</PaginationLink>
                            </PaginationItem>

                            <PaginationItem ><PaginationLink next tag="button" disabled={currentPage === totalPages ? true : false} onClick={this.nextPage}>Next</PaginationLink></PaginationItem>
                            <PaginationItem ><PaginationLink next tag="button" disabled={currentPage === totalPages ? true : false} onClick={this.lastPage}>Last</PaginationLink></PaginationItem>
                          </Pagination>
                        </nav>

                      </CardFooter>

                    </Card>
                  </Col>
            </Row>
        </>
        )
    }
}

export default Parameter;