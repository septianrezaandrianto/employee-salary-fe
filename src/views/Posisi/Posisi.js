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
	Table,
	CardFooter
} from 'reactstrap';
import axios from 'axios';

class Posisi extends Component {
	constructor() {
		super();
			this.state = {
				posisi : [],
				editPosisi : {
					idPosisi : '',
					namaPosisi : ''
				},
				newPosisiModal : false,
				editPosisiModal : false,
				currentPage : 1,
				posisiPerPage : 5,
				

			}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.toggleNewPosisiModal = this.toggleNewPosisiModal.bind(this);
		this.toggleEditPosisiModal = this.toggleEditPosisiModal.bind(this);
	}

	onChange = (e) => {
		this.setState({
			[e.target.name] : e.target.value
		})
	}

	onSubmit = (e) => {
		e.preventDefault();
		alert('Posisi berhasil ditambahkan ' + this.state.nama);
		const posisi = {
			namaPosisi : this.state.nama
		}

		axios.post('http://localhost:8085/api/Posisi/add' , posisi)
		.then((res) =>  {
			console.log(res.data)
			this.setState({newPosisiModal : false})
			this.getPosisi();
		})
		.catch((error) => {
			console.log(error)
		});
	}

	onDelete(id) {
	alert('Data berhasil dihapus')
		axios.delete('http://localhost:8085/api/Posisi/delete/' + id)
		.then((res) => {
			console.log(res)
			this.getPosisi();
		})
		.catch((error) => {
			console.log(error);
		});
	}

	getPosisi() {
		axios.get('http://localhost:8085/api/Posisi/all')
		.then(res => {
			this.setState({ posisi : res.data.Data })
		})
		.catch(console.log)
	}

	updatePosisi () {
		alert('Data berhasil diubah menjadi ' + this.state.editPosisi.namaPosisi)
		let {namaPosisi} = this.state.editPosisi;
		
		axios.put('http://localhost:8085/api/Posisi/update/' + this.state.editPosisi.idPosisi, {
			namaPosisi
		}).then((res) => {
			console.log(res.data)
			this.getPosisi();

			this.setState({
				editPosisiModal : false,
				editPosisi: {
					idPosisi : '',
					namaPosisi : '',
				}
			})		
		})
		.catch((error) => {
			console.log(error);
		});
	}
	
	onEdit(idPosisi , namaPosisi) {
		console.log(namaPosisi)

		this.setState({
			editPosisi : {
				idPosisi, 
				namaPosisi
			}, 
			editPosisiModal : ! this.state.editPosisiModal
		})
		
	}

	toggleNewPosisiModal = () => {
		this.setState({
			newPosisiModal : ! this.state.newPosisiModal
		})	
	}

	
	toggleEditPosisiModal = () => {
		this.setState ({
			editPosisiModal : ! this.state.editPosisiModal
		})
	}

	/*paginasi */
	changePage =(e) => {
		this.setState ({
			[e.target.name] : parseInt (e.target.value)
		})
	}

	firstPage= () => {
		if (this.state.currentPage > 1) {
			this.setState ({
				currentPage : 1
			});
		}
	};

	prevPage=() => {
		if (this.state.currentPage > 1) {
			this.setState ({
				currentPage : this.state.currentPage - 1
			});
		}
	};

	nextPage = () => {
		if (this.state.currentPage < Math.ceil(this.state.posisi.length / this.state.posisiPerPage)) {
			this.setState ({
				currentPage : this.state.currentPage + 1
			});
		}
	};

	lastPage = () => {
		if (this.state.currentPage < Math.ceil(this.state.posisi.length / this.state.posisiPerPage)) {
			this.setState ({
				currentPage : Math.ceil(this.state.posisi.length / this.state.posisiPerPage)
			});
		}
	};


	componentDidMount() {
		this.getPosisi();
	}

	render() {
			const {posisi, currentPage, posisiPerPage} = this.state;
			const lastIndex = currentPage * posisiPerPage;
			const firstIndex = lastIndex - posisiPerPage;
			const currentPosisi = posisi.slice(firstIndex, lastIndex);
			const totalPages = Math.ceil(posisi.length / posisiPerPage);

		return (
			
		<>
		<Row>
           <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-vcard-o (alias)"></i>List Posisi
	              </CardHeader>
	              <CardBody>
	             
				 {/* Modal (pop up) untuk add posisi */}
				  <Button onClick={this.toggleNewPosisiModal} type="reset" size="md" outline color="success" style={{"margin" : "10px 0px"}}><i className="fa fa-plus"></i> Tambah</Button>
					<Modal isOpen={this.state.newPosisiModal} toggle={this.toggleNewPosisiModal}>
						<ModalHeader toggle={this.toggleNewPosisiModal}>Tambah Posisi</ModalHeader>
						<ModalBody>
						
							<Form method ="POST" onSubmit={this.onSubmit} action=""  className="form-horizontal">
								<FormGroup row>
									<Col md="12">
									<InputGroup>
										<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="fa fa-vcard-o"></i>
										</InputGroupText>
										</InputGroupAddon>
										<Input type="text" name="nama" placeholder="Masukan nama posisi" onChange = {this.onChange} required />
									</InputGroup>
									</Col>
								</FormGroup>
							</Form>	

						</ModalBody>
						<ModalFooter>
						<Button color="primary" onClick={this.onSubmit}>Simpan</Button>{' '}
						<Button color="secondary" onClick={this.toggleNewPosisiModal}>Cancel</Button>
						</ModalFooter>
					</Modal>

					{/* Modal (pup up) untuk edit */}
					<Modal isOpen={this.state.editPosisiModal} toggle={this.toggleEditPosisiModal}>
						<ModalHeader toggle={this.toggleEditPosisiModal}>Ubah Data Posisi</ModalHeader>
						<ModalBody>
						
							<Form method =""  action=""  className="form-horizontal">
								<FormGroup row>
									<Col md="12">
									<InputGroup>
										<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="fa fa-vcard-o"></i>
										</InputGroupText>
										</InputGroupAddon>
										<Input type="text" id="nama" name="nama" placeholder="Masukan nama posisi" required value={this.state.editPosisi.namaPosisi} onChange={(e) => {
											let {editPosisi} = this.state
											editPosisi.namaPosisi = e.target.value;
											this.setState({editPosisi})
										}}/>
									</InputGroup>
									</Col>
								</FormGroup>
							</Form>	

						</ModalBody>
						<ModalFooter>
						<Button color="primary" onClick={this.updatePosisi.bind(this)}>Update</Button>{' '}
						<Button color="secondary" onClick={this.toggleEditPosisiModal}>Cancel</Button>
						</ModalFooter>
					</Modal>

	                <Table hover bordered striped responsive size="sm">
	                  <thead>
	                  <tr>
	                    <th className="nomor">No</th>
	                    <th>Nama Posisi</th>
	                    <th className ="aksi">Aksi</th>
	                  </tr>
	                  </thead>

	                  

	                  <tbody>  

						{posisi.length === 0 ?
						<tr>
							<td colSpan = "12"><h4>Belum ada data</h4></td>
						</tr>:
						
						currentPosisi.map((pos, index) => (         
	                    <tr key= {pos.idPosisi}>
	                      <td>{index +1}</td>
	                      <td>{pos.namaPosisi}</td>		       
		       			  <td>
		       			  	<Button type="submit" size="sm" color="warning" onClick={this.onEdit.bind(this, pos.idPosisi, pos.namaPosisi)} className="mr-2"><i className="fa fa-pencil" name="edit"></i></Button>
		       			  	
                			<Button type="reset" size="sm" color="danger" onClick={this.onDelete.bind(this, pos.idPosisi)}><i className="fa fa-trash"></i></Button>
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

export default Posisi;