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

  class Pendapatan extends Component {
      constructor() {
          super();
          this.state ={
              pendapatan : [],
              currentPage :1,
              pendapatanPerPage : 5,
          }
      }

      getPendapatan () {
          axios.get('http://localhost:8085/api/pendapatan/all')
          .then(res => {
              this.setState ({pendapatan : res.data.Data})
          })
          .catch(console.log)
      }

      componentDidMount () {
          this.getPendapatan();
      }

      currentPage = (e) => {
        this.setState ({
          [e.target.name] : parseInt(e.target.value)
        });
      };

      firstPage= () => {
        if (this.state.currentPage > 1) {
          this.setState ({
            currentPage : 1
          });
        }
      };

      prevPage= () => {
        if (this.state.currentPage > 1) {
          this.setState ({
            currentPage : this.state.currentPage - 1
          });
        }
      };

      nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.pendapatan.length / this.state.pendapatanPerPage)) {
          this.setState ({
            currentPage : this.state.currentPage + 1
          });
        }
      };

      lastPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.pendapatan.length / this.state.pendapatanPerPage)) {
          this.setState ({
            currentPage : Math.ceil(this.state.pendapatan.length / this.state.pendapatanPerPage)
          });
        }
      };
      
      getNumber=()=> {
        for (let i = 1; i <= this.state.pendapatan.length ; i++) {
        }
      }
      render() {
          const {pendapatan, currentPage, pendapatanPerPage} = this.state;
        
          const lastIndex = currentPage * pendapatanPerPage;
          const firstPage = lastIndex - pendapatanPerPage;
          const currentPendapatan = pendapatan.slice(firstPage, lastIndex);
          const totalPages = Math.ceil(pendapatan.length / pendapatanPerPage);
          return (

    <>
		<Row>
           <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-cc-visa"></i>List Pendapatan
	              </CardHeader>
	              <CardBody>

                  <Table hover bordered striped responsive size="sm">
	                  <thead>
	                  <tr>
	                      <th className="nomor">No</th>
                        <th>Nama</th>
                        <th>Tanggal Gaji</th>
                        <th>Tunj. Keluarga</th>
                        <th>Tunj. Transport</th>
                        <th>Tunj. Pegawai</th>
                        <th>Gaji Kotor</th>
                        <th>PPH / Bulan</th>
                        <th>BPJS</th>
                        <th>Gaji Bersih</th>
                        <th>Lama Lembur</th>
                        <th>Uang Lembur</th>
                        <th>Variable Bonus</th>
                        <th>Uang Bonus</th>
                        <th>Take Home Pay</th>
	                    <th className ="aksi">Aksi</th>
	                  </tr>
	                  </thead>

	                  {currentPendapatan.map((pen, index) => ( 

	                  <tbody key= {pen.idPendapatan}>          
	                    <tr>
                            <td>{index +1}</td>
                            <td>{pen.karyawanDto.nama}</td>
                            <td>{pen.tanggalGaji}</td>
                            <td>Rp. {pen.gajiPokok}</td>
                            <td>Rp. {pen.tunjanganKeluarga}</td>
                            <td>Rp. {pen.tunjanganPegawai}</td>
                            <td>Rp. {pen.tunjanganTransport}</td>
                            <td>Rp. {pen.gajiKotor}</td>
                            <td>Rp. {pen.pphPerbulan}</td>
                            <td>Rp. {pen.bpjs}</td>
                            <td>Rp. {pen.gajiBersih}</td>
                            <td>{pen.lamaLembur}</td>
                            <td>{pen.variableBonus}</td>
                            <td>Rp. {pen.uangBonus}</td>
                            <td>Rp. {pen.takeHomePay}</td>
		       			  <td>
		       			  	<Button type="submit" size="sm" color="warning" /* onClick={this.onEdit.bind(this, pen.idPendapatan)} */ className="mr-2"><i className="fa fa-pencil" name="edit"></i></Button>
		       			  	
                			<Button type="reset" size="sm" color="danger" /* onClick={this.onDelete.bind(this, pen.idPendapatan)} */><i className="fa fa-trash"></i></Button>
		       			  </td>
	                    </tr>

	                  </tbody>
	                   ))}
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

  export default Pendapatan;