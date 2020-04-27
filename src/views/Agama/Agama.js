import React, {Component} from 'react';
import './../../assets/style.css';
import {
	Pagination,
	PaginationItem,
	PaginationLink,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Button,
	Card,
	CardBody,
	CardHeader,
	Col,
	Row,
	Table
} from 'reactstrap';
import axios from 'axios';

class Agama extends Component {
	constructor() {
		super();
			this.state = {
				agama : [],
				addAgama : {
					namaAgama: ''
				},
				editAgama : {
					idAgama : '',
					namaAgama : ''
				},
				newAgamaModal : false,
				editAgamaModal : false		
			}
			
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.toggleNewAgamaModal = this.toggleNewAgamaModal.bind(this);
		this.toggleEditAgamaModal = this.toggleEditAgamaModal.bind(this);
	}

	onChange = (e) => {
		this.setState ({
			[e.target.name] : e.target.value
		})
	}

	onSubmit = (e) => {
		e.preventDefault();
		alert('Posisi berhasil ditambahkan');

		const {addAgama} = {
			namaAgama : this.state.name
		}

		axios.post('http://localhost:8085/api/agama/add', addAgama)
		.then((res) =>  {
			console.log(res.data)
			this.setState({newAgamaModal : false})
			this.getAgama();
		})
		.catch((error) => {
			console.log(error)
		});
	}

	updateAgama() {
		alert('data berhasil diubah menjadi ' + this.state.editAgama.namaAgama)
		let {namaAgama} = this.state.editAgama;

		axios.put('http://localhost:8085/api/agama/update/' + this.state.editAgama.idAgama, {
			namaAgama
		}).then((res) => {
			console.log(res.data)
			this.getAgama();

			this.setState ({
				editAgamaModal : false,
				editAgama : {
					idAgama : '',
					namaAgama : ''
				}
			})
		})
		.catch((error) => {
			console.log(error);
		});
	}

	onEdit(idAgama, namaAgama) {
		console.log(namaAgama)

		this.setState ({
			editAgamaModal : ! this.state.editAgamaModal,
			editAgama : {
				idAgama,
				namaAgama 
			}
		})
	}

	onDelete (id) {
	alert('Data berhasil dihapus')
		axios.delete('http://localhost:8085/api/agama/delete/' + id)
		.then((res) => {
			console.log(res)
			this.getAgama();
		})
		.catch((error) => {
			console.log(error);
		});
	}
	getAgama() {
		axios.get('http://localhost:8085/api/agama/all')
		.then(res => {
			this.setState({ agama : res.data.Data })
		})
		.catch(console.log)
	}

	componentDidMount() {
		this.getAgama();
	}

	toggleNewAgamaModal () {
		this.setState ({
			newAgamaModal : ! this.state.newAgamaModal
		})
	}

	toggleEditAgamaModal () {
		this.setState ({
			editAgamaModal : ! this.state.editAgamaModal
		})
	}

	render() {
			let agama = this.state.agama.map((agama) => {
				return (
					<tr key= {agama.idAgama}>
					<td>{agama.idAgama}</td>
					<td>{agama.namaAgama}</td>		       
					   <td>
						   <Button type="submit" size="sm" color="warning" onClick={this.onEdit.bind(this, agama.idAgama, agama.namaAgama)} className ="mr-2"><i className="fa fa-pencil" name="edit"> Ubah</i></Button>
					  <Button type="reset" size="sm" color="danger" onClick={this.onDelete.bind(this, agama.idAgama)}><i className="fa fa-eraser"></i> Hapus</Button>
					   </td>
				  </tr>
				)	
			})
		return (
		<>
		<Row>

           <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>List Agama
	              </CardHeader>
	              <CardBody>

				{/* Modal (pop up) add Agama */}
				  <Button color="danger" onClick={this.toggleNewAgamaModal}>Tambah Agama</Button>
					<Modal isOpen={this.state.newAgamaModal} toggle={this.toggleNewAgamaModal}>
						<ModalHeader toggle={this.toggleNewAgamaModal}>Tambah Agama</ModalHeader>
						<ModalBody>
						
						<Form method ="POST" onSubmit={this.onSubmit} action=""  className="form-horizontal">
						<FormGroup row>
							<Col md="12">
							<InputGroup>
								<InputGroupAddon addonType="prepend">
								<InputGroupText>
									<i className="fa fa-pencil-square-o"></i>
								</InputGroupText>
								</InputGroupAddon>
								<Input type="text" id="nama" name="nama" placeholder="Masukan nama agama" onChange = {this.onChange}/>
							</InputGroup>
							</Col>
						</FormGroup>
						</Form>	

						</ModalBody>
						<ModalFooter>
						<Button color="primary" onClick={this.onSubmit}>Simpan</Button>{' '}
						<Button color="secondary" onClick={this.toggleNewAgamaModal}>Cancel</Button>
						</ModalFooter>
					</Modal>

					{/* Modal (pop up) edit Agama */}
					<Modal isOpen={this.state.editAgamaModal} toggle={this.toggleEditAgamaModal}>
						<ModalHeader toggle={this.toggleEditAgamaModal}>Ubah Data Agama</ModalHeader>
						<ModalBody>
						
						<Form method =""  action=""  className="form-horizontal">
						<FormGroup row>
							<Col md="12">
							<InputGroup>
								<InputGroupAddon addonType="prepend">
								<InputGroupText>
									<i className="fa fa-pencil-square-o"></i>
								</InputGroupText>
								</InputGroupAddon>
								<Input type="text" id="nama" name="nama" placeholder="Masukan nama agama" value= {this.state.editAgama.namaAgama} onChange = {(e) => {
									let {editAgama} = this.state;

									editAgama.namaAgama = e.target.value;

									this.setState({editAgama});
								}}/>
							</InputGroup>
							</Col>
						</FormGroup>
						</Form>	

						</ModalBody>
						<ModalFooter>
						<Button color="primary" onClick={this.updateAgama.bind(this)}>Update</Button>{' '}
						<Button color="secondary" onClick={this.toggleEditAgamaModal}>Cancel</Button>
						</ModalFooter>
					</Modal>
	             

	                <Table hover bordered striped responsive size="sm">
	                  <thead>
	                  <tr>
	                    <th>Id Agama</th>
	                    <th>Nama Agama</th>
	                    <th className="aksi">Aksi</th>
	                  </tr>
	                  </thead>

	                  <tbody>          					
							{agama}
	                  </tbody>
	                  
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

export default Agama;