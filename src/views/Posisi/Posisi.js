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

	componentDidMount() {
		this.getPosisi();
	}

	render() {
			const {posisi} = this.state;			
		return (
			
		<>
		<Row>
           <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>List Posisi
	              </CardHeader>
	              <CardBody>
	             
				 {/* Modal (pop up) untuk add posisi */}
				  <Button onClick={this.toggleNewPosisiModal} type="reset" size="sm" color="danger">Tambah Posisi</Button>
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
	                    <th>ID Posisi</th>
	                    <th>Nama Posisi</th>
	                    <th className ="aksi">Aksi</th>
	                  </tr>
	                  </thead>

	                  {posisi.map((pos) => ( 

	                  <tbody key= {pos.idPosisi}>          
	                    <tr>
	                      <td>{pos.idPosisi}</td>
	                      <td>{pos.namaPosisi}</td>		       
		       			  <td>
		       			  	<Button type="submit" size="sm" color="warning" onClick={this.onEdit.bind(this, pos.idPosisi, pos.namaPosisi)} className="mr-2"><i className="fa fa-pencil" name="edit"> Ubah</i></Button>
		       			  	
                			<Button type="reset" size="sm" color="danger" onClick={this.onDelete.bind(this, pos.idPosisi)}><i className="fa fa-eraser"></i> Hapus</Button>
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

export default Posisi;