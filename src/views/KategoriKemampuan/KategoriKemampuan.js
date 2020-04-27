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

  class KategoriKemampuan extends Component {
      constructor() {
          super();
            this.state = {
                kategoriKemampuan : [],
                editKategoriKemampuan : {
                    idKategori : '',
                    namaKategori : ''
                },
                newKategoriKemampuanModal : false,
                editKategoriKemampuanModal : false
            }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.toggleNewKategoriKemampuanModal = this.toggleNewKategoriKemampuanModal.bind(this);
        this.toggleEditKategoriKemampuanModal = this.toggleEditKategoriKemampuanModal.bind(this);
      }

      onChange = (e) => {
          this.setState({
              [e.target.name] : e.target.value
          })
      }

    onSubmit = (e) => {
        e.preventDefault();
        alert('Data berhasil ditambahkan')
        const data = {
            namaKategori : this.state.nama
        }

        fetch('http://localhost:8085/api/kategori-kemampuan/add', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        })
        .then(res =>res.json()).then((data) => {
            console.log(data);    
            this.setState({ newKategoriKemampuanModal : false });
            this.getKategoriKemampuan();
        })
    }

    onDelete (id) {
    alert('Data berhasil dihapus')
        axios.delete('http://localhost:8085/api/kategori-kemampuan/delete/' + id)
        .then((res) => {
            console.log(res)
            this.getKategoriKemampuan();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    updateKategoriKemampuan() {
    alert('Data berhasil diubah menjadi ' + this.state.editKategoriKemampuan.namaKategori)
    let {namaKategori} = this.state.editKategoriKemampuan;

    axios.put('http://localhost:8085/api/kategori-kemampuan/update/' + this.state.editKategoriKemampuan.idKategori, {
        namaKategori
    }).then((res) => {
        console.log(res.data)
        this.getKategoriKemampuan();

        this.setState ({
            editKategoriKemampuanModal : false,
            editKategoriKemampuan : {
                idKategori : '',
                namaKategori : '',
            }
        })
    })
    .catch((error) => {
        console.log(error);
    });
    }

    onEdit (idKategori, namaKategori) {
        this.setState ({
            editKategoriKemampuan : {
                idKategori,
                namaKategori
            },
            editKategoriKemampuanModal : ! this.state.editKategoriKemampuanModal
        })
    }

      getKategoriKemampuan () {
          fetch('http://localhost:8085/api/kategori-kemampuan/all', {
          method : 'GET'
        })
        .then(res =>res.json()).then((data) => {
            console.log(data.Data)
            this.setState({kategoriKemampuan :data.Data})
        })
        .catch(console.log)
      }

      componentDidMount() {
          this.getKategoriKemampuan();
      }

      toggleNewKategoriKemampuanModal() {
          this.setState ({
              newKategoriKemampuanModal : ! this.state.newKategoriKemampuanModal
          })
      }

      toggleEditKategoriKemampuanModal() {
          this.setState ({
              editKategoriKemampuanModal : ! this.state.editKategoriKemampuanModal
          })
      }

      render() {
          const {kategoriKemampuan} = this.state;
          return(
              <>
        <Row>
              
            <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>List Kategori Kemampuan
	              </CardHeader>
	              <CardBody>
	              
                {/* Modal {Pop up} add kategoti kemampuan */}
                    <Button color="danger" onClick={this.toggleNewKategoriKemampuanModal}>Tambah Kategori Kemampuan</Button>
                    <Modal isOpen={this.state.newKategoriKemampuanModal} toggle={this.toggleNewKategoriKemampuanModal}>
                        <ModalHeader toggle={this.toggleNewKategoriKemampuanModal}>Tambah Kategori Kemampuan</ModalHeader>
                        <ModalBody>

                        <Form method ="POST" onSubmit={this.onSubmit} action=""  className="form-horizontal">
                        <FormGroup row>
                            <Col md="12">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-paint-brush"></i>
                                </InputGroupText>
                                </InputGroupAddon>
                                <Input type="text" name="nama" placeholder="Masukan nama kategori kemampuan" onChange = {this.onChange}/>
                            </InputGroup>
                            </Col>
                        </FormGroup>
                        </Form>

                        </ModalBody>
                        <ModalFooter>
                        <Button color="primary" onClick={this.onSubmit}>Simpan</Button>{' '}
                        <Button color="secondary" onClick={this.toggleNewKategoriKemampuanModal}>Batal</Button>
                        </ModalFooter>
                    </Modal>

                    {/* Modal {Pop up} Edit kategoti kemampuan */}
                    <Modal isOpen={this.state.editKategoriKemampuanModal} toggle={this.toggleEditKategoriKemampuanModal}>
                        <ModalHeader toggle={this.toggleEditKategoriKemampuanModal}>Ubah Kategori Kemampuan</ModalHeader>
                        <ModalBody>

                        <Form method ="" onSubmit={this.onSubmit} action=""  className="form-horizontal">
                        <FormGroup row>
                            <Col md="12">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-paint-brush"></i>
                                </InputGroupText>
                                </InputGroupAddon>
                                <Input type="text" id="nama" name="nama" placeholder="Masukan nama kategori kemampuan" value= {this.state.editKategoriKemampuan.namaKategori} onChange = {(e) => {
                                    let {editKategoriKemampuan} = this.state
                                    editKategoriKemampuan.namaKategori = e.target.value;
                                    this.setState({editKategoriKemampuan})
                                }}/>
                            </InputGroup>
                            </Col>
                        </FormGroup>
                        </Form>

                        </ModalBody>
                        <ModalFooter>
                        <Button color="primary" onClick={this.updateKategoriKemampuan.bind(this)}>Update</Button>{' '}
                        <Button color="secondary" onClick={this.toggleEditKategoriKemampuanModal}>Batal</Button>
                        </ModalFooter>
                    </Modal>

	                <Table hover bordered striped responsive size="sm">
	                  <thead>
	                  <tr>
	                    <th>ID Kategori</th>
	                    <th>Nama Kategori</th>
	                    <th className ="aksi">Aksi</th>
	                  </tr>
	                  </thead>

	                  {kategoriKemampuan.map((km) => ( 

	                  <tbody key= {km.idKategori}>          
	                    <tr>
	                      <td>{km.idKategori}</td>
	                      <td>{km.namaKategori}</td>
		       			  <td>
		       			  	<Button type="submit" size="sm" color="warning" onClick={this.onEdit.bind(this, km.idKategori, km.namaKategori)} className="mr-2"><i className="fa fa-pencil" name="edit"> Ubah</i></Button>
                			<Button type="reset" size="sm" color="danger" onClick ={this.onDelete.bind(this, km.idKategori)}><i className="fa fa-eraser"></i> Hapus</Button>
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

  export default KategoriKemampuan;