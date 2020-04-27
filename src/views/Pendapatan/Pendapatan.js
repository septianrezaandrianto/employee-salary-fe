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

  class Pendapatan extends Component {
      constructor() {
          super();
          this.state ={
              pendapatan : []
          }
      }

      getPendapatan () {
          axios.get('http://localhost:8085/api/pendapatan/reno/all')
          .then(res => {
              this.setState ({pendapatan : res.data.Data})
          })
          .catch(console.log)
      }

      componentDidMount () {
          this.getPendapatan();
      }
      render() {
          const {pendapatan} = this.state;
          return (

    <>
		<Row>
           <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>List Pendapatan
	              </CardHeader>
	              <CardBody>

                  <Table hover bordered striped responsive size="sm">
	                  <thead>
	                  <tr>
	                      <th>ID Pendapatan</th>
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

	                  {pendapatan.map((pen) => ( 

	                  <tbody key= {pen.idPendapatan}>          
	                    <tr>
	                      <td>{pen.idPendapatan}</td>
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
		       			  	<Button type="submit" size="sm" color="warning" /* onClick={this.onEdit.bind(this, pen.idPendapatan)} */ className="mr-2"><i className="fa fa-pencil" name="edit"> Ubah</i></Button>
		       			  	
                			<Button type="reset" size="sm" color="danger" /* onClick={this.onDelete.bind(this, pen.idPendapatan)} */><i className="fa fa-eraser"></i> Hapus</Button>
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

  export default Pendapatan;