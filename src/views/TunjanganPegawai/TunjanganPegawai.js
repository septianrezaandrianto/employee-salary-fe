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
  Table,
  CardFooter
} from 'reactstrap';

  class TunjanganPegawai extends Component {
      constructor(props) {
          super(props);
          this.state = {
              tunjanganPegawai : [],
              currentPage : 1,
              tunjanganPegawaiPerPage : 5
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

  /* Start Paginasi */
        currentPage = (e) => {
          this.setState ({
            [e.target.name] : parseInt (e.target.value)
          });
        };

        firstPage=()=> {
          if (this.state.currentPage > 1) {
            this.setState ({
              currentPage : 1 
            });
          }
        };

        prevPage=() => {
          if (this.state.currentPage > 1) {
            this.setState ({
              currentPage : this.state.currentPage -1
            });
          }
        };

        nextPage = () => {
          if (this.state.currentPage < Math.ceil(this.state.tunjanganPegawai.length / this.state.tunjanganPegawaiPerPage)) {
            this.setState ({
              currentPage : this.state.currentPage + 1
            });
          }
        };

        lastPage = () => {
          if (this.state.currentPage < Math.ceil(this.state.tunjanganPegawai.length / this.state.tunjanganPegawaiPerPage)) {
            this.setState ({
              currentPage : Math.ceil(this.state.tunjanganPegawai.length / this.state.tunjanganPegawaiPerPage)
            });
          }
        };
  /* End Paginasi */
       

      render() {
            const {tunjanganPegawai, currentPage, tunjanganPegawaiPerPage} =  this.state;

            const lastIndex = currentPage * tunjanganPegawaiPerPage;
            const firstIndex = lastIndex - tunjanganPegawaiPerPage;
            const currentTunjanganPegawai = tunjanganPegawai.slice(firstIndex, lastIndex);
            const totalPages = Math.ceil(tunjanganPegawai.length / tunjanganPegawaiPerPage);

          return (
            <>
            <Row>
               <Col>
                <Card>
                  <CardHeader>
                    <i className="fa fa-area-chart"></i>List Tunjangan Pegawai
                      </CardHeader>
                      <CardBody>
    
                      <Table hover bordered striped responsive size="sm">
                          <thead>
                          <tr>
                            <th className="nomor">No</th>
                            <th>Posisi</th>
                            <th>Tingkatan</th>
                            <th>Besaran Tunjangan</th>
                            <th className ="aksi">Aksi</th>
                          </tr>
                          </thead>
   
                          <tbody>  

                          {tunjanganPegawai.length === 0 ?
                          <tr>
                              <td colSpan = "12"><h4>Belum ada data</h4></td>
                          </tr> :
                          currentTunjanganPegawai.map((tp, index) => (         
                            <tr  key= {tp.idTunjanganPegawai}>
                                <td>{index +1}</td>
                                <td>{tp.posisi.namaPosisi}</td>
                                <td>{tp.tingkatan.namaTingkatan}</td>
                                <td>{tp.besaranTujnaganPegawai}</td>                     
                                <td>
                                <Button type="submit" size="sm" color="warning" /* onClick={this.onEdit.bind(this, pen.idPendapatan)} */ className="mr-2"><i className="fa fa-pencil" name="edit"></i></Button>                           
                                <Button type="reset" size="sm" color="danger" onClick={this.onDelete.bind(this, tp.idTunjanganPegawai)}><i className="fa fa-trash"></i></Button>
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

export default TunjanganPegawai;