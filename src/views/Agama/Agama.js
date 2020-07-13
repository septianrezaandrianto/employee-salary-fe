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
	CardFooter,
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
				editAgama : {
					idAgama : '',
					namaAgama : ''
				},
				newAgamaModal : false,
				editAgamaModal : false,
				currentPage : 1,
				agamaPerPage : 5,		
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

		const agama = {
			namaAgama : this.state.nama
		}

		axios.post('http://localhost:8085/api/agama/add', agama)
		.then((res) =>  {
			console.log(res)
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

	currentPage = (e) => {
		this.setState({
			[e.target.name] : parseInt(e.target.value)
		});
	};

	firstPage = () => {
		if(this.state.currentPage > 1 ) {
			this.setState ({
				currentPage : 1
			});
		}
	};

	prevPage = () => {
		if(this.state.currentPage > 1 ) {
			this.setState ({
				currentPage : this.state.currentPage -1
			});
		}
	};

	nextPage = () => {
		if (this.state.currentPage < Math.ceil(this.state.agama.length / this.state.agamaPerPage)) {
			this.setState ({
				currentPage : this.state.currentPage + 1
			});
		}
	};

	lastPage = () => {
		if(this.state.currentPage < Math.ceil(this.state.agama.length / this.state.agamaPerPage)) {
			this.setState ({
				currentPage : Math.ceil(this.state.agama.length / this.state.agamaPerPage)
			});
		}
	};

	render() {
		const {agama, currentPage, agamaPerPage} = this.state;

		const lastIndex = currentPage * agamaPerPage;
		const firstIndex = lastIndex - agamaPerPage;
		const currentAgama = agama.slice(firstIndex, lastIndex);
		const totalPages = Math.ceil(agama.length/ agamaPerPage)
	
		return (
		<>
		<Row>

           <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-institution (alias)"></i>List Agama
	              </CardHeader>
	              <CardBody>

				{/* Modal (pop up) add Agama */}
				  <Button outline color="success" size="md" onClick={this.toggleNewAgamaModal} style={{"margin" : "10px 0px"}}><i className="fa fa-plus"></i> Tambah</Button>
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
	                    <th className="nomor">No</th>
	                    <th>Nama Agama</th>
	                    <th className="aksi">Aksi</th>
	                  </tr>
	                  </thead>

	                  <tbody> 

					{agama.length === 0 ? 
					<tr>
						<td colSpan = "12"><h4>Belum ada data</h4></td>
					</tr> :

					currentAgama.map((agama, index) => (
					  <tr key= {agama.idAgama}>
						<td>{index+1}</td>
						<td>{agama.namaAgama}</td>		       
						<td>
							<Button type="submit" size="sm" color="warning" onClick={this.onEdit.bind(this, agama.idAgama, agama.namaAgama)} className ="mr-2"><i className="fa fa-pencil" name="edit"></i></Button>
							<Button type="reset" size="sm" color="danger" onClick={this.onDelete.bind(this, agama.idAgama)}><i className="fa fa-trash"></i></Button>
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

export default Agama;