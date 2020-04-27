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
	Table
} from 'reactstrap';
  
class Karyawan extends Component {
	state = {
		employees : []		
	}

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

	render () {
			const {employees}=this.state;
		return (

		<>
		<Row>
			<Col>
				<Card>
				<CardHeader>
					<i className="fa fa-align-justify"></i>List Karyawan
					</CardHeader>
					<CardBody>
					<Button type="reset" size="sm" color="danger"><i className="fa fa-plus"></i> Tambah</Button>
						<Table hover bordered striped responsive size="sm">
						<thead>
						<tr>
							<th>ID Karyawan</th>
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

						{employees.map((emp) => (

						<tbody key= {emp.idKaryawan}>          
							<tr>
							<td>{emp.idKaryawan}</td>
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
								<Button type="submit" size="sm" color="warning" onClick={this.onSubmit}><i className="fa fa-pencil" name="edit"> Ubah</i></Button>
								<Button type="reset" size="sm" color="danger" onClick={this.onDelete.bind(this, emp.idKaryawan)}><i className="fa fa-eraser"></i> Hapus</Button>
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
			);
		}
	}
export default Karyawan;