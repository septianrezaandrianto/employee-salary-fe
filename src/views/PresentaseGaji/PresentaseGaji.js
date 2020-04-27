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

  class PresentaseGaji extends Component {
    constructor() {
        super();
        this.state = {
            presentaseGaji : []
        }
    }

    onDelete(id) {
    alert('Data berhasil didelete')
    axios.delete('http://localhost:8085/api/presentasegaji/delete/' + id)
      .then((res) => {
        console.log(res)
        this.getPresentaseGaji();
      })
      .catch((error) => {
        console.log(error)
      })
    }

    getPresentaseGaji() {
      const {pgId} = this.state
      this.setState ({
        presentaseGaji : [],
        isLoading : true
      })

        axios.get('http://localhost:8085/api/presentasegaji/all')
        .then (res =>{
            this.setState ({ presentaseGaji : res.data.Data, isLoading : false})
            console.log(res.data.Data)
        })
        .catch((error) => {
            console.log(error.res);
        });
    }

    componentDidMount () {
        this.getPresentaseGaji();
    }

    render () {
        const {presentaseGaji} = this.state;

        if (this.state.isLoading) {
          return (
            <p>Loading...</p>
          )
        }
        return (

            <>
            <Row>
               <Col>
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i>List Presentase Gaji
                      </CardHeader>
                      <CardBody>
    
                      <Table hover bordered striped responsive size="sm">
                          <thead>
                          <tr>
                            <th>ID Presentase Gaji</th>
                            <th>Posisi</th>
                            <th>Tingkatan</th>
                            <th>Besaran Gaji</th>
                            <th>Masa Kerja</th>
                            <th className ="aksi">Aksi</th>
                          </tr>
                          </thead>
    
                          {presentaseGaji.map((pg) => ( 
    
                          <tbody key= {pg.idPresentaseGaji}>          
                            <tr>
                                <td>{pg.idPresentaseGaji}</td>
                                <td>{pg.posisiDto.namaPosisi}</td>
                                <td>{pg.idTingkatan}</td>
                                <td>{pg.besaranGaji}</td>
                                <td>{pg.masaKerja}</td>                     
                                <td>
                                <Button type="submit" size="sm" color="warning" /* onClick={this.onEdit.bind(this, pen.idPendapatan)} */ className="mr-2"><i className="fa fa-pencil" name="edit"> Ubah</i></Button>
                                    
                                <Button type="reset" size="sm" color="danger" onClick={this.onDelete.bind(this, pg.idPresentaseGaji)}><i className="fa fa-eraser"></i> Hapus</Button>
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

export default PresentaseGaji;