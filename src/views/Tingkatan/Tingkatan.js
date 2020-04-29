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

class Tingkatan extends Component {
	constructor() {
		super();
			this.state = {
				tingkatan : [],
				editTingkatan : {
					idTingkatan : '',
					namaTingkatan : ''
				},
				newTingkatanModal : false,
				editTingkatanModal : false,
				currentPage : 1,
				tingkatanPerPage : 5
			}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.toggleNewTingkatanModal = this.toggleNewTingkatanModal.bind(this);
		this.toggleEditTingkatanModal = this.toggleEditTingkatanModal.bind(this);
	}

	onChange = (e) => {
		this.setState({
			[e.target.name] : e.target.value
		})
	}

	onSubmit = (e) => {
		e.preventDefault();
		const tingkatan = {
			namaTingkatan : this.state.nama
		}

		axios.post('http://localhost:8085/api/tingkatan/add', tingkatan)
		.then((res) =>{
			console.log(res.data)
			this.setState({newTingkatanModal : false})
			this.getTingkatan();
		})
		.catch((error) => {
			console.log(error)
		});
	}

	onDelete(id) {
	alert('Data berhasil dihapus')
		axios.delete('http://localhost:8085/api/tingkatan/delete/' + id)
		.then((res) => {
			console.log(res)
			this.getTingkatan();
		})
		.catch((error) => {
			console.log(error);
		});
	}

	updateTingkatan() {
		alert('Data berhasil diubah menjadi ' + this.state.editTingkatan.namaTingkatan)

		let{namaTingkatan} =  this.state.editTingkatan;

		axios.put('http://localhost:8085/api/tingkatan/update/' + this.state.editTingkatan.idTingkatan, {
			namaTingkatan
		}).then((res) => {
			console.log(res.data)
			this.getTingkatan();

			this.setState({
				editTingkatanModal : false,
				editTingkatan : {
					idTingkatan : '',
					namaTingkatan : ''
				}
			})
		})
		.catch((error) => {
			console.log(error);
		});
	}

	onEdit(idTingkatan, namaTingkatan) {
		console.log(namaTingkatan)

		this.setState({
			editTingkatan : {
				idTingkatan,
				namaTingkatan
			},
			editTingkatanModal : ! this.state.editTingkatanModal
		})
	}

	getTingkatan() {
		axios.get('http://localhost:8085/api/tingkatan/all')
		.then(res => {
			// console.log(data.Data)
			this.setState({tingkatan : res.data.Data})
		})
		.catch(console.log)
	}

	componentDidMount() {
		this.getTingkatan();
	}

	toggleNewTingkatanModal = () => {
		this.setState ({
			newTingkatanModal : ! this.state.newTingkatanModal
		})
	}

	toggleEditTingkatanModal = () => {
		this.setState ({
			editTingkatanModal : ! this.state.editTingkatanModal
		})
	}

	/* paginasi */
	currentPage=(e) => {
		this.setState ({
			[e.target.name] : parseInt(e.target.value)
		});
	};

	firstPage =() => {
		if (this.state.currentPage > 1) {
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
		if (this.state.currentPage < Math.ceil(this.state.tingkatan.length / this.state.tingkatanPerPage)) {
			this.setState ({
				currentPage : this.state.currentPage + 1
			});
		}
	};

	lastPage =() => {
		if (this.state.currentPage < Math.ceil(this.state.tingkatan.length / this.state.tingkatanPerPage)) {
			this.setState ({
				currentPage : Math.ceil(this.state.tingkatan.length / this.state.tingkatanPerPage)
			});
		}
	};

	render() {
		const {tingkatan, currentPage, tingkatanPerPage} = this.state;

		const lastIndex = currentPage * tingkatanPerPage;
		const firstIndex = lastIndex - tingkatanPerPage;
		const currentTingkatan = tingkatan.slice(firstIndex, lastIndex);
		const totalPages = Math.ceil(tingkatan.length/tingkatanPerPage);

	return (

		<>
		<Row>

           <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-arrows-v"></i>List Tingkatan
	              </CardHeader>
	              <CardBody>
	             
		  		{/* Modal (Pop up) menambahkan tingkatan */}
				  <Button color="danger" onClick={this.toggleNewTingkatanModal} type="reset">Tambah Tingkatan</Button>
					<Modal isOpen={this.state.newTingkatanModal} toggle={this.toggleNewTingkatanModal}>
						<ModalHeader toggle={this.toggleNewTingkatanModal}>Tambah Tingkatan</ModalHeader>
						<ModalBody>

						 <Form method ="POST" onSubmit={this.onSubmit} action=""  className="form-horizontal">
							<FormGroup row>
								<Col md="12">
								<InputGroup>
									<InputGroupAddon addonType="prepend">
									<InputGroupText>
										<i className="fa fa-level-up"></i>
									</InputGroupText>
									</InputGroupAddon>
									<Input type="text" name="nama" placeholder="Masukan nama tingkatan" onChange = {this.onChange}/>
								</InputGroup>
								</Col>
							</FormGroup>
							</Form>

						</ModalBody>
						<ModalFooter>
						<Button color="primary" onClick={this.onSubmit}>Simpan</Button>{' '}
						<Button color="secondary" onClick={this.toggleNewTingkatanModal}>Cancel</Button>
						</ModalFooter>
					</Modal>

					{/* Modal (Pop up) edit tingkatan */}
					<Modal isOpen={this.state.editTingkatanModal} toggle={this.toggleEditTingkatanModal}>
						<ModalHeader toggle={this.toggleEditTingkatanModal}>Tambah Tingkatan</ModalHeader>
						<ModalBody>

						 <Form method ="POST" onSubmit={this.onSubmit} action=""  className="form-horizontal">
							<FormGroup row>
								<Col md="12">
								<InputGroup>
									<InputGroupAddon addonType="prepend">
									<InputGroupText>
										<i className="fa fa-level-up"></i>
									</InputGroupText>
									</InputGroupAddon>
									<Input type="text" name="nama" placeholder="Masukan nama tingkatan" value = {this.state.editTingkatan.namaTingkatan} onChange = {(e) => {
										let {editTingkatan} = this.state
										editTingkatan.namaTingkatan = e.target.value;
										this.setState({editTingkatan})
									}}/>
								</InputGroup>
								</Col>
							</FormGroup>
							</Form>

						</ModalBody>
						<ModalFooter>
						<Button color="primary" onClick={this.updateTingkatan.bind(this)}>Update</Button>{' '}
						<Button color="secondary" onClick={this.toggleEditTingkatanModal}>Cancel</Button>
						</ModalFooter>
					</Modal>

	                <Table hover bordered striped responsive size="sm">
	                  <thead>
	                  <tr>
	                    <th className="nomor">No</th>
	                    <th>Nama Tingkatan</th>
	                    <th className="aksi">Aksi</th>
	                  </tr>
	                  </thead>

	                  <tbody>  

					{tingkatan.length === 0 ? 
					<tr>
						<td colSpan = "12"><h4>Belum ada data</h4></td>
					</tr> :
					currentTingkatan.map((ting, index) => (         
	                    <tr key= {ting.idTingkatan}>
	                      <td>{index +1}</td>
	                      <td>{ting.namaTingkatan}</td>		       
		       			  <td>
		       			  	<Button type="submit" size="sm" color="warning" onClick={this.onEdit.bind(this, ting.idTingkatan, ting.namaTingkatan)} className="mr-2"><i className="fa fa-pencil" name="edit"></i></Button>

                			<Button type="reset" size="sm" color="danger" onClick={this.onDelete.bind(this, ting.idTingkatan)}><i className="fa fa-trash"></i></Button>
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

export default Tingkatan;