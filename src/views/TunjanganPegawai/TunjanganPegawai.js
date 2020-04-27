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

  class TunjanganPegawai extends Component {
      constructor(props) {
          super(props);
          this.state = {
              tunjanganPegawai : [],
          }
      }    
 
    onDelete (id) {
      alert('Data berhasil dihapus')
        axios.delete('http://localhost:8085/api/tunjanganPegawai/delete/' + id)
        .then((res) => {
          console.log(res)
          this.getTunjanganPegawai();
        })
        .catch((error) => {
          console.log(error)
        })
      }

      getTunjanganPegawai () {
          axios.get('http://localhost:8085/api/tunjanganPegawai/all')
          .then(res => {
            this.setState({ tunjanganPegawai : res.data.Data})
            console.log(res.data.Data)
            })
            .catch((error) => {
              console.log(error.res)
            })
        }

        componentDidMount() {
            this.getTunjanganPegawai();
        }

      render() {
            const {tunjanganPegawai} =  this.state;
          return (
            <>
            <Row>
               <Col>
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i>List Tunjangan Pegawai
                      </CardHeader>
                      <CardBody>
    
                      <Table hover bordered striped responsive size="sm">
                          <thead>
                          <tr>
                            <th>ID Tunjangan Pegawai</th>
                            <th>Posisi</th>
                            <th>Tingkatan</th>
                            <th>Besaran Tunjangan</th>
                            <th className ="aksi">Aksi</th>
                          </tr>
                          </thead>
    
                          {tunjanganPegawai.map((tp) => ( 
    
                          <tbody key= {tp.idTunjanganPegawai}>          
                            <tr>
                                <td>{tp.idTunjanganPegawai}</td>
                                <td>{tp.posisi.idPosisi}</td>
                                <td>{tp.tingkatan.idTingkatan}</td>
                                <td>{tp.besaranTujnaganPegawai}</td>                     
                                <td>
                                <Button type="submit" size="sm" color="warning" /* onClick={this.onEdit.bind(this, pen.idPendapatan)} */ className="mr-2"><i className="fa fa-pencil" name="edit"> Ubah</i></Button>                           
                                <Button type="reset" size="sm" color="danger" onClick={this.onDelete.bind(this, tp.idTunjanganPegawai)}><i className="fa fa-eraser"></i> Hapus</Button>
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

export default TunjanganPegawai;