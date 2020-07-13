import React, {Component} from 'react';
import './../../assets/style.css';
import axios from 'axios';
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Label,
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

  class Kemampuan extends Component {
      constructor() {
          super();
          this.state = {
              kemampuan : [],
              kategoriKemampuan : [],
              editKemampuan : {
                idKemampuan : '',
                namaKemampuan :'',
                kategoriKemampuan : {
                    idKategori : '',
                }
              },
              newKemampuanModal : false,
              editKemampuanModal : false,
              currentPage : 1,
              kemampuanPerPage: 5,
          }
          this.onChange = this.onChange.bind(this);
          /* this.onSubmit = this.onSubmit.bind(this); */
          this.toggleNewKemampuanModal = this.toggleNewKemampuanModal.bind(this);
          this.toggleEditKemampuanModal = this.toggleEditKemampuanModal.bind(this);
      }

      onChange = (e) => {
        this.setState ({
          [e.target.name] : e.target.value
        })
      }

       onSubmit = (e) => {
        e.preventDefault();
        alert('Kemampuan berhasil ditambah')
        const kmp = {  
          namaKemampuan : this.state.nama,
          kategoriKemampuan : {           
            idKategori : this.state.namaKtg
          } 
        }

        axios.post('http://localhost:8085/api/kemampuan/add', kmp)
        .then ((res) => {
          console.log(res.data)
          this.setState ({newKemampuanModal : false })
          this.getKemampuan();

        })
        .catch((error) => {
          console.log(error)
        });
      }

      onEdit (idKemampuan, namaKemampuan, idKategori) {
        console.log(namaKemampuan)

        this.setState ({
          editKemampuan : {
            idKemampuan,
            namaKemampuan,
            kategoriKemampuan : {
              idKategori
            }          
          },
          editKemampuanModal : ! this.state.editKemampuanModal
        });
      }

      updateKemampuan () {
        alert('Data berhasil diubah')
        let {namaKemampuan, idKategori} = this.state.editKemampuan;

        axios.put('http://localhost:8085/api/kemampuan/update/' +  this.state.editKemampuan.idKemampuan, {
          namaKemampuan, kategoriKemampuan : {
            idKategori
          }
        })
        .then((res) => {
          console.log(res.data)
          this.getKemampuan();

          this.setState ({
            editKemampuanModal : false,
            editKemampuan : {
              idKemampuan : '',
              namaKemampuan : '',
              kategoriKemampuan : {
                idKategori : ''
              }
            }
          })
        })
        .catch((error) => {
          console.log(error)
        });
      }

      onDelete (id) {
      alert('Data berhasil dihapus')
        axios.delete('http://localhost:8085/api/kemampuan/delete/' + id)
        .then((res) => {
          console.log(res)
          this.getKemampuan();
        })
        .catch((error) => {
          console.log(error)
        });
      }

      getKategoriKemampuan() {
        axios.get('http://localhost:8085/api/kategori-kemampuan/all')
        .then(res => {
          this.setState({ kategoriKemampuan : res.data.Data})
        })
        .catch((error) => {
          console.log(error)
        });
      }

      getKemampuan () {        
          axios.get('http://localhost:8085/api/kemampuan/all')
          .then(res => {
              this.setState({ kemampuan : res.data.Data})
          })
          .catch((error) => {
            console.log(error)
          });
      }

      componentDidMount() {
        this.getKemampuan();
        this.getKategoriKemampuan(); 
      }

      toggleNewKemampuanModal = () => {
        this.setState ({
          newKemampuanModal : ! this.state.newKemampuanModal
        });
      }

      toggleEditKemampuanModal = () => {
        this.setState({
          editKemampuanModal : ! this.state.editKemampuanModal
        });
      }

      currentPage = (e) => {
        this.setState ({
          [e.target.name] : parseInt(e.target.value)
        });
      };

      firstPage = () => {
        if (this.state.currentPage > 1) {
          this.setState ({
            currentPage : 1
          });
        }
      };

      prevPage = () => {
        if(this.state.currentPage > 1) {
          this.setState ({
            currentPage : this.state.currentPage - 1
          });
        }
      };

      nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.kemampuan.length / this.state.kemampuanPerPage)) {
          this.setState ({
            currentPage : this.state.currentPage + 1
          });
        }
      };

      lastPage= () => {
        if (this.state.currentPage < Math.ceil(this.state.kemampuan.length / this.state.kemampuanPerPage)) {
          this.setState ({
            currentPage : Math.ceil(this.state.kemampuan.length / this.state.kemampuanPerPage)
          });
        }
      };
      render() {            
            const {kemampuan, kategoriKemampuan, currentPage, kemampuanPerPage} =  this.state;
           
            const lastIndex = currentPage * kemampuanPerPage;
            const firstIndex = lastIndex - kemampuanPerPage;
            const currentKemampuan = kemampuan.slice(firstIndex, lastIndex);
            const totalPages = Math.ceil(kemampuan.length / kemampuanPerPage);
        return(
            <>
            <Row>
               <Col>
                <Card>
                  <CardHeader>
                    <i className="fa fa-sitemap"></i>List Kemampuan
                      </CardHeader>
                      <CardBody>

                        
                       {/* Modal (pop up) untuk add kemampuan */}
                      <Button outline color="success" size="md" onClick={this.toggleNewKemampuanModal} style={{"margin" : "10px 0px"}}><i className="fa fa-plus"></i> Tambah</Button>
                      <Modal isOpen={this.state.newKemampuanModal} toggle={this.toggleNewKemampuanModal}>
                        <ModalHeader toggle={this.toggleNewKemampuanModal} >Tambah Kemampuan</ModalHeader>
                        <ModalBody>

                        <Form method ="POST" onSubmit={this.onSubmit} action=""  className="form-horizontal">
                        <FormGroup row>
                        <Col md="12">                      
                          <Label for="namaKategori">ID Kategori</Label>
                          <Input type="select" name="namaKtg" id="namaKtg" onChange={this.onChange}> 
                          {kategoriKemampuan.map ((km) => (
                            <option key = {km.idKategori}>{km.idKategori}</option>
                            ))}
                           
                          </Input>
                        </Col>
                        </FormGroup>
                       
                        <FormGroup row>
                          <Col md="12">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa fa-pencil-square"></i>
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" name="nama" placeholder="Masukan nama kemampuan"  onChange = {this.onChange} required />
                          </InputGroup>
                          </Col>
                        </FormGroup>
                      </Form>	

                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={this.onSubmit}>Simpan</Button>{' '}
                          <Button color="secondary" onClick={this.toggleNewKemampuanModal}>Cancel</Button>
                        </ModalFooter>
                      </Modal>


                      {/* Modal (pup up) untuk edit */}
                      <Modal isOpen={this.state.editKemampuanModal} toggle={this.toggleEditKemampuanModal}>
                        <ModalHeader toggle={this.toggleEditKemampuanModal} >Ubah Data Kemampuan</ModalHeader>
                        <ModalBody>

                        <Form method ="" onSubmit={this.onSubmit} action=""  className="form-horizontal">
                        <FormGroup row>
                        <Col md="12">                      
                          <Label for="namaKategori">ID Kategori</Label>
                          <Input type="select" name="namaKtg" id="namaKtg" onChange={this.onChange}> 
                          {kategoriKemampuan.map ((km) => (
                            <option key = {km.idKategori}>{km.idKategori}</option>
                            ))}
                           
                          </Input>
                        </Col>
                        </FormGroup>
                       
                        <FormGroup row>
                          <Col md="12">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa fa-pencil-square"></i>
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" name="nama" placeholder="Masukan nama kemampuan" value={this.state.editKemampuan.namaKemampuan} onChange = {(e)=> {
                              let {editKemampuan} = this.state
                              editKemampuan.namaKemampuan = e.target.value;

                              this.setState ({editKemampuan})
                            }} />
                          </InputGroup>
                          </Col>
                        </FormGroup>
                      </Form>	

                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={this.updateKemampuan.bind(this)}>Update</Button>{' '}
                          <Button color="secondary" onClick={this.toggleEditKemampuanModal}>Cancel</Button>
                        </ModalFooter>
                      </Modal>

                      <Table hover bordered striped responsive size="sm">
                          <thead>
                          <tr>
                            <th className="nomor">No</th>
                            <th>ID Kategori</th>
                            <th>Nama Kemampuan</th>
                            <th className ="aksi">Aksi</th>
                          </tr>
                          </thead>
                           
                          <tbody> 
                          {kemampuan.length === 0 ?
                          <tr>
                              <td colSpan = "12"><h4>Belum ada data</h4></td>
                          </tr> :
                          currentKemampuan.map((kem, index) => (         
                            <tr key= {kem.idKemampuan}>
                                 <td>{index +1}</td>
                                 <td>{kem.kategoriKemampuan.idKategori}</td>
                                 <td>{kem.namaKemampuan}</td>
                                 <td>
                                <Button type="submit" size="sm" color="warning" onClick={this.onEdit.bind(this, kem.idKemampuan, kem.namaKemampuan, kem.kategoriKemampuan.idKategori)} className="mr-2"><i className="fa fa-pencil" name="edit"></i></Button>                                    
                                <Button type="reset" size="sm" color="danger" onClick={this.onDelete.bind(this, kem.idKemampuan)}><i className="fa fa-trash"></i></Button>
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

export default Kemampuan;
