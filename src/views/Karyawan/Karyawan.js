import React, {Component} from 'react';
import './../../assets/style.css';
import axios from 'axios';
import {
	Pagination,
	PaginationItem,
	PaginationLink,
	Badge,
/* 	Label,
	Modal,
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
  
class Karyawan extends Component {
	constructor() {
		super();
		this.state = {
			employees : [],
			currentPage : 1,
			employeesPerPage : 5,
			no : 1			
		}
	}
	
	/* Paginasi */
	currentPage = (e) => {
		this.setState ({
			[e.target.name] : parseInt(e.target.value)
		});
	};

	firstPage = () => {
		if (this.state.currentPage > 1 ) {
			this.setState ({
				currentPage : 1
			});
		}
	};

	prevPage = () => {
		if (this.state.currentPage > 1) {
			this.setState ({
				currentPage :  this.state.currentPage - 1
			});
		}
	};

	nextPage = () => {
		if (this.state.currentPage < Math.ceil(this.state.employees.length / this.state.employeesPerPage)) {
			this.setState ({
				currentPage : this.state.currentPage + 1
			});
		}
	};

	lastPage = () => {
		if (this.state.currentPage < Math.ceil(this.state.employees.length / this.state.employeesPerPage)) {
			this.setState ({
				currentPage : Math.ceil(this.state.employees.length / this.state.employeesPerPage)
			});
		}
	};

	onDelete (id) {
	alert('Data berhasil didelete')
		axios.delete('http://localhost:8085/api/karyawan/delete/' +id)
		.then((res) => {
			console.log(res)
			this.getEmployee();
		})
		.catch((error) => {
			console.log(error)
		});
	}

	getEmployee() {
		fetch('http://localhost:8085/api/karyawan/all', {
			method:'GET'
		}).then(res => res.json()).then((data) =>{
			console.log(data.Data)
			this.setState({employees: data.Data})
		})
		.catch(console.log)
	}

	componentDidMount() {
	this.getEmployee();
	}

	/* getNumber() {
		let text= "";
		let number;
		for (number = 1 ; number <= this.state.employees.length ; number ++) {
			text += number;	
		}
		return text;
	} */

	render () {
			const {employees, currentPage, employeesPerPage}=this.state;			
			const lastIndex = currentPage * employeesPerPage;
			const firstIndex = lastIndex - employeesPerPage;
			const currentEmployees = employees.slice(firstIndex, lastIndex);
			const totalPages = Math.ceil(employees.length / employeesPerPage);
		return (

		<>
		<Row>
			<Col>
				<Card>
				<CardHeader>
					<i className="fa fa-users"></i>List Karyawan
					</CardHeader>
					<CardBody>
					<Button type="reset" size="md" outline color="success" style={{"margin" : "10px 0px"}}><i className="fa fa-plus"></i> Tambah</Button>
						<Table hover bordered striped responsive size="sm">
						<thead>
						<tr>
							<th className="nomor">No.</th>
							<th>No. KTP</th>
							<th>Nama Karyawan</th>	                    
							<th>Posisi</th>
							<th>Tingkatan</th>	                   
							<th>Agama</th>	                    
							<th>Alamat</th>
							<th>Tanggal Lahir</th>
							<th>Kontrak Awal</th>
							<th>Kontrak Akhir</th>
							<th>Masa Kerja</th>
							<th>Kota Penempatan</th>
							<th>UMK Penempatan</th>
							<th>Status Pernikahan</th>
							<th>Jenis Kelamin</th>
							<th>Jumlah anak</th>
							<th className ="aksi">Aksi</th>
						</tr>
						</thead>
					
						<tbody >   

						{employees.length === 0 ?

						<tr>
							<td colSpan = "12"><h4>Belum ada data</h4></td>
						</tr> :

						currentEmployees.map((emp, index) => (

							<tr key= {emp.idKaryawan}>
							<td>{index+1}</td>
							<td>{emp.noKtp}</td>
							<td>{emp.nama}</td>						  
							<td>{emp.posisi.namaPosisi}</td>
							<td>{emp.tingkatan.namaTingkatan}</td>   
							<td>{emp.agama.namaAgama}</td>					  	  
							<td>{emp.alamat}</td>
							<td>{emp.tanggalLahir}</td>
							<td>{emp.kontrakAwal}</td>
							<td>{emp.kontrakAkhir}</td>	
							<td>{emp.masaKerja}</td>
							<td>{emp.penempatan.kotaPenempatan}</td>
							<td>Rp. {emp.penempatan.umkPenempatan}</td>
							<td>{emp.statusPernikahan}</td>						  
							<td>
								<Badge color="success">{emp.jenisKelamin}</Badge>
							</td>
							<td>{emp.jumlahAnak}</td>
							<td>
								<Button type="submit" size="sm" color="warning" onClick={this.onSubmit}><i className="fa fa-pencil" name="edit"></i></Button>
								<Button type="reset" size="sm" color="danger" onClick={this.onDelete.bind(this, emp.idKaryawan)}><i className="fa fa-trash"></i></Button>
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
			);
		}
	}
export default Karyawan;