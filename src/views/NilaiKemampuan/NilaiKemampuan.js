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


  class NilaiKemampuan extends Component {
      constructor() {
          super();
          this.state = {
              nilaiKemampuan : []
          }
      }

      onDelete(id) {
      alert('Data berhasil dihapus')
        axios.delete('http://localhost:8085/api/ListKemampuan/delete/' + id)
        .then((res) => {
          console.log(res)
          this.getNilaiKemampuan();
        })
        .catch((error) => {
          console.log(error);
        });
    }

      getNilaiKemampuan () {
          axios.get('http://localhost:8085/api/ListKemampuan/all')
          .then(res => {
              this.setState ({ nilaiKemampuan : res.data.Data})
          })
          .catch(console.log)
      }

      componentDidMount() {
          this.getNilaiKemampuan();
      }

      render() {
          const {nilaiKemampuan} = this.state;
          return (
            <>
            <Row>
               <Col>
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i>List Nilai Kemampuan
                      </CardHeader>
                      <CardBody>
    
                      <Table hover bordered striped responsive size="sm">
                          <thead>
                          <tr>
                            <th>ID Nilai Kemampuan</th>
                            <th>Nama Karyawan</th>
                            <th>Kemampuan</th>                         
                            <th>Nilai Kemampuan</th>
                            <th className ="aksi">Aksi</th>
                          </tr>
                          </thead>
    
                          {nilaiKemampuan.map((nk) => ( 
    
                          <tbody key= {nk.idListKemampuan}>          
                            <tr>
                                <td>{nk.idListKemampuan}</td>                              
                                <td>{nk.karyawan.nama}</td>
                                <td>{nk.kemampuan.namaKemampuan}</td>
                                <td>{nk.nilaiKemampuan}</td>
                                 <td>
                                <Button type="submit" size="sm" color="warning" /* onClick={this.onEdit.bind(this, pen.idPendapatan)} */ className="mr-2"><i className="fa fa-pencil" name="edit"> Ubah</i></Button>                                    
                                <Button type="reset" size="sm" color="danger" onClick={this.onDelete.bind(this, nk.idListKemampuan)}><i className="fa fa-eraser"></i> Hapus</Button>
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

  export default NilaiKemampuan;