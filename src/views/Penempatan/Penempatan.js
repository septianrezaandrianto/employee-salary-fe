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

class Penempatan extends Component {
	constructor() {
		super();
			this.state = {
				penempatan : [],
				editPenempatan : {
					idPenempatan : '',
					kotaPenempatan : '',
					umkPenempatan : ''
				},

				newPenempatanModal : false,
				editPenempatanModal : false
			}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.toggleNewPenempatan = this.toggleNewPenempatan.bind(this);
		this.toggleEditPenempatan = this.toggleEditPenempatan.bind(this);
	}


	onChange = (e) => {
		this.setState({
			[e.target.name] :e.target.value
		})
	}

	onSubmit = (e) => {
		e.preventDefault();
		alert('Penempatan Berhasil ditambah')
		const data = {
			kotaPenempatan : this.state.kota,
			umkPenempatan : this.state.umk
		}

		fetch('http://localhost:8085/api/penempatan/add', {
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json'
			},
			body : JSON.stringify(data)
		})
		.then(res =>res.json()).then((data) => {
			console.log(data);
			this.setState({newPenempatanModal : false})
			this.getPenempatan();
		})
	}

	
	updatePenempatan() {
		alert('Data berhasil diubah')
		let {kotaPenempatan, umkPenempatan} = this.state.editPenempatan;
		
		axios.put('http://localhost:8085/api/penempatan/update/' + this.state.editPenempatan.idPenempatan, {
			kotaPenempatan, umkPenempatan
		}).then((res) => {
			console.log(res.data)
			this.getPenempatan();

			this.setState({
				editPenempatanModal : false,
				editPenempatan : {
					idPenempatan : '',
					kotaPenempatan : '',
					umkPenempatan : ''
				}
			})
		})
		.catch((error) => {
			console.log(error);
		});
	}

	onEdit (idPenempatan, kotaPenempatan, umkPenempatan) {
		console.log(kotaPenempatan);
		
		this.setState({
			editPenempatan : {
				idPenempatan,
				kotaPenempatan,
				umkPenempatan
			},
			editPenempatanModal : ! this.state.editPenempatanModal
		})
	}

	onDelete(id) {
		alert('Data berhasil dihapus')
		axios.delete('http://localhost:8085/api/penempatan/delete/' + id)
		.then((res) => {
			console.log(res)
			this.getPenempatan();
		})
		.catch((error) => {
			console.log(error);
		})
	}
	getPenempatan() {
		fetch('http://localhost:8085/api/penempatan/all', {
			method : 'GET'
		})
		.then(res => res.json()).then((data) => {
		//	console.log(data.Data)
			this.setState({penempatan : data.Data})
		})
		.catch(console.log)
	}

	componentDidMount() {
		this.getPenempatan();
	}

	toggleNewPenempatan = () => {
		this.setState({ 
			newPenempatanModal : ! this.state.newPenempatanModal,
		})
	}

	toggleEditPenempatan = () => {
		this.setState ({
			editPenempatanModal : ! this.state.editPenempatanModal,
		})
	}

	render() {
		const {penempatan}=this.state;
		return (
		<>

		<Row>

           <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>List Penempatan
	              </CardHeader>
	              <CardBody>

		  		{/* Modal (pop up)  untuk add penempatan*/}
				  <Button color="danger" type="reset" size="sm"  onClick={this.toggleNewPenempatan}>Tambah Penempatan</Button>
					<Modal isOpen={this.state.newPenempatanModal} toggle={this.toggleNewPenempatan}>
						<ModalHeader toggle={this.toggleNewPenempatan}>Modal title</ModalHeader>
						<ModalBody>
						
						<Form method ="POST" onSubmit={this.onSubmit} action=""  className="form-horizontal">
							<FormGroup row>
								<Col md="12">
								<InputGroup>
									<InputGroupAddon addonType="prepend">
									<InputGroupText>
										<i className="fa fa-map-marker"></i>
									</InputGroupText>
									</InputGroupAddon>
									<Input type="text" name="kota" placeholder="Masukan kota penempatan" onChange = {this.onChange}/>
								</InputGroup>
								</Col>
							</FormGroup>
							
							<FormGroup row>
								<Col md="12">
								<InputGroup>
									<InputGroupAddon addonType="prepend">
									<InputGroupText>
										<i className="fa fa-money"></i>
									</InputGroupText>
									</InputGroupAddon>
									<Input type="text" name="umk" placeholder="Masukan UMK penempatan" onChange = {this.onChange}/>
									<InputGroupAddon addonType="append">               
									</InputGroupAddon>
								</InputGroup>
								</Col>
							</FormGroup>
							</Form>

						</ModalBody>
						<ModalFooter>
						<Button color="primary" onClick={this.onSubmit}>Simpan</Button>{' '}
						<Button color="secondary" onClick={this.toggleNewPenempatan}>Cancel</Button>
						</ModalFooter>
					</Modal>

					{/* Modal (pop up)  untuk edit penempatan*/}
					<Modal isOpen={this.state.editPenempatanModal} toggle={this.toggleEditPenempatan}>
						<ModalHeader toggle={this.toggleEditPenempatan}>Ubah Data Penempatan</ModalHeader>
						<ModalBody>
						
						<Form method ="" action=""  className="form-horizontal">
							<FormGroup row>
								<Col md="12">
								<InputGroup>
									<InputGroupAddon addonType="prepend">
									<InputGroupText>
										<i className="fa fa-map-marker"></i>
									</InputGroupText>
									</InputGroupAddon>
									<Input type="text"
									id="kota" name="kota" placeholder="Masukan kota penempatan"
									value= {this.state.editPenempatan.kotaPenempatan} onChange = {(e) => {
										let {editPenempatan} = this.state
										editPenempatan.kotaPenempatan = e.target.value;
										this.setState({editPenempatan})
									}}/>
								</InputGroup>
								</Col>
							</FormGroup>
							
							<FormGroup row>
								<Col md="12">
								<InputGroup>
									<InputGroupAddon addonType="prepend">
									<InputGroupText>
										<i className="fa fa-money"></i>
									</InputGroupText>
									</InputGroupAddon>
									<Input type="text" 
									id="umk" name="umk" placeholder="Masukan UMK penempatan"  value={this.state.editPenempatan.umkPenempatan} onChange = {(e) => {
										let {editPenempatan} = this.state
										editPenempatan.umkPenempatan = e.target.value;
										this.setState({editPenempatan})
									}}/>
									<InputGroupAddon addonType="append">               
									</InputGroupAddon>
								</InputGroup>
								</Col>
							</FormGroup>
							</Form>

						</ModalBody>
						<ModalFooter>
						<Button color="primary" onClick={this.updatePenempatan.bind(this)}>Update</Button>{' '}
						<Button color="secondary" onClick={this.toggleEditPenempatan}>Cancel</Button>
						</ModalFooter>
					</Modal>
	              
	                <Table hover bordered striped responsive size="sm">
	                  <thead>
	                  <tr>
	                    <th>ID Penempatan</th>
	                    <th>Kota Penempatan</th>
	                    <th>UMK Penempatan</th>
	                    <th className ="aksi">Aksi</th>
	                  </tr>
	                  </thead>

	                  {penempatan.map((pen) => ( 

	                  <tbody key= {pen.idPenempatan}>          
	                    <tr>
						
	                      <td>{pen.idPenempatan}</td>
	                      <td>{pen.kotaPenempatan}</td>
		       			  <td>Rp. {pen.umkPenempatan}</td>				
		       			  <td>
		       			  	<Button type="submit" size="sm" color="warning" onClick={this.onEdit.bind(this, pen.idPenempatan, pen.kotaPenempatan, pen.umkPenempatan)} className="mr-2"><i className="fa fa-pencil" name="edit"> Ubah</i></Button>
                			<Button type="reset" size="sm" color="danger" onClick={this.onDelete.bind(this, pen.idPenempatan)}><i className="fa fa-eraser"></i> Hapus</Button>
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

export default Penempatan;