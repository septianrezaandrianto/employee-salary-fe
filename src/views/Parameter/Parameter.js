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
	Col,
	Row,
	Table
} from 'reactstrap';

class Parameter extends Component {
    constructor() {
        super();
        this.state = {
            parameter : []
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


    render() {
        const {parameter} = this.state;
        return (
            <>
            <Row>
               <Col>
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i>List Parameter
                      </CardHeader>
                      <CardBody>
    
                      <Table hover bordered striped responsive size="sm">
                          <thead>
                          <tr>
                            <th>ID Parameter</th>
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
    
                          {parameter.map((param) => ( 
    
                          <tbody key= {param.idParam}>          
                            <tr>
                                <td>{param.idParam}</td>
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
                                     <Button type="submit" size="sm" color="warning" /* onClick={this.onEdit.bind(this, pen.idPendapatan)} */ className="mr-2"><i className="fa fa-pencil" name="edit"> Ubah</i></Button>
                                     
                                <Button type="reset" size="sm" color="danger" onClick={this.onDelete.bind(this, param.idParam)}><i className="fa fa-eraser"></i> Hapus</Button>
                                 </td>
                            </tr>
    
                          </tbody>
                           ))}
                        </Table>

                        <nav>
                          <Pagination className= "paginasi">
                            <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                            <PaginationItem active>
                              <PaginationLink tag="button">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                            <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                            <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                            <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                          </Pagination>
                        </nav>
                      
                      </CardBody>
                    </Card>
                  </Col>
            </Row>
        </>
        )
    }
}

export default Parameter;