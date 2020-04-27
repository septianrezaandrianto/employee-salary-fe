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
				editTingkatanModal : false
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

	render() {
		const {tingkatan} = this.state;
	return (

		<>
		<Row>

           <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>List Tingkatan
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
	                    <th>ID Tingkatan</th>
	                    <th>Nama Tingkatan</th>
	                    <th className="aksi">Aksi</th>
	                  </tr>
	                  </thead>

	                  {tingkatan.map((ting) => ( 

	                  <tbody key= {ting.idTingkatan}>          
	                    <tr>
	                      <td>{ting.idTingkatan}</td>
	                      <td>{ting.namaTingkatan}</td>		       
		       			  <td>
		       			  	<Button type="submit" size="sm" color="warning" onClick={this.onEdit.bind(this, ting.idTingkatan, ting.namaTingkatan)} className="mr-2"><i className="fa fa-pencil" name="edit"> Ubah</i></Button>

                			<Button type="reset" size="sm" color="danger" onClick={this.onDelete.bind(this, ting.idTingkatan)}><i className="fa fa-eraser"></i> Hapus</Button>
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

export default Tingkatan;