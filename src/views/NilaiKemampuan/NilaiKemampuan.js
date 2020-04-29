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


  class NilaiKemampuan extends Component {
      constructor() {
          super();
          this.state = {
              nilaiKemampuan : [],
              currentPage : 1,
              nilaiKemampuanPerPage : 5,
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

      currentPage = (e) => {
        this.setState ({
          [e.target.name] : parseInt(e.target.value)
        });
      };

      firstPage = () => {
        if(this.state.currentPage > 1) {
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
        if(this.state.currentPage < Math.ceil(this.state.nilaiKemampuan.length / this.state.nilaiKemampuanPerPage)) {
          this.setState ({
            currentPage : this.state.currentPage + 1
          });
        }
      };

      lastPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.nilaiKemampuan.length / this.state.nilaiKemampuanPerPage)) {
          this.setState ({
            currentPage : Math.ceil(this.state.nilaiKemampuan.length / this.state.nilaiKemampuanPerPage)
          });
        }
      };
      render() {
          const {nilaiKemampuan, currentPage, nilaiKemampuanPerPage} = this.state;

          const lastIndex = currentPage - nilaiKemampuanPerPage;
          const firstIndex = lastIndex - nilaiKemampuanPerPage;
          const currentNilaiKemampuan = nilaiKemampuan.slice(firstIndex, lastIndex);
          const totalPages = Math.ceil(nilaiKemampuan.length / nilaiKemampuanPerPage);
          return (
            <>
            <Row>
               <Col>
                <Card>
                  <CardHeader>
                    <i className="fa fa-pie-chart"></i>List Nilai Kemampuan
                      </CardHeader>
                      <CardBody>
    
                      <Table hover bordered striped responsive size="sm">
                          <thead>
                          <tr>
                            <th className="nomor">No</th>
                            <th>Nama Karyawan</th>
                            <th>Kemampuan</th>                         
                            <th>Nilai Kemampuan</th>
                            <th className ="aksi">Aksi</th>
                          </tr>
                          </thead>                    
                      
                          <tbody > 
                            {/* Validasi apabila data kosong */}
                          {nilaiKemampuan.length === 0 ?
                          <tr>
                            <td colSpan = "12"><h4>Belum ada data</h4></td>
                          </tr> :
                            currentNilaiKemampuan.map((nk, index) => (

                            <tr key= {nk.idListKemampuan}>
                                <td>{index +1}</td>                              
                                <td>{nk.karyawan.nama}</td>
                                <td>{nk.kemampuan.namaKemampuan}</td>
                                <td>{nk.nilaiKemampuan}</td>
                                 <td>
                                <Button type="submit" size="sm" color="warning" /* onClick={this.onEdit.bind(this, pen.idPendapatan)} */ className="mr-2"><i className="fa fa-pencil" name="edit"></i></Button>                                    
                                <Button type="reset" size="sm" color="danger" onClick={this.onDelete.bind(this, nk.idListKemampuan)}><i className="fa fa-trash"></i></Button>
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

  export default NilaiKemampuan;