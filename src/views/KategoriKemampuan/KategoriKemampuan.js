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
                editKategoriKemampuanModal : false,
                currentPage : 1,
                kategoriKemampuanPerPage : 5,
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

      currentPage = (e) => {
          this.setState ({
              [e.target.name] : parseInt(e.target.value)
          });
      };

      firstIndex = () => {
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
          if (this.state.currentPage < Math.ceil(this.state.kategoriKemampuan.length / this.state.kategoriKemampuanPerPage)) {
              this.setState ({
                  currentPage : this.state.currentPage + 1
              });
          }
      };

      lastPage = () => {
          if (this.state.currentPage < Math.ceil(this.state.kategoriKemampuan.length / this.state.kategoriKemampuanPerPage)) {
              this.setState ({
                  currentPage : Math.ceil(this.state.kategoriKemampuan.length / this.state.kategoriKemampuanPerPage)
              });
          }
      };

      render() {
          const {kategoriKemampuan, currentPage, kategoriKemampuanPerPage} = this.state;
          
          const lastIndex = currentPage * kategoriKemampuanPerPage;
          const firstIndex = lastIndex - kategoriKemampuanPerPage;
          const currentKategoriKemampuan = kategoriKemampuan.slice(firstIndex, lastIndex);
          const totalPages = Math.ceil(kategoriKemampuan.length / kategoriKemampuanPerPage);
          return(
              <>
        <Row>
              
            <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-thumb-tack"></i>List Kategori Kemampuan
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
	                    <th className="nomor">No</th>
	                    <th>Nama Kategori</th>
	                    <th className ="aksi">Aksi</th>
	                  </tr>
	                  </thead>

	                   

	                  <tbody>  
                           {/* Validasi apabila data kosong */}
                        {kategoriKemampuan === 0 ?
                        <tr>
                           <td colSpan = "12"><h4>Belum ada data</h4></td>
                        </tr> :
                        currentKategoriKemampuan.map((km, index) => (        
	                    <tr key= {km.idKategori}>
	                      <td>{index +1}</td>
	                      <td>{km.namaKategori}</td>
		       			  <td>
		       			  	<Button type="submit" size="sm" color="warning" onClick={this.onEdit.bind(this, km.idKategori, km.namaKategori)} className="mr-2"><i className="fa fa-pencil" name="edit"></i></Button>
                			<Button type="reset" size="sm" color="danger" onClick ={this.onDelete.bind(this, km.idKategori)}><i className="fa fa-trash"></i></Button>
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
          )
      }
  }

  export default KategoriKemampuan;