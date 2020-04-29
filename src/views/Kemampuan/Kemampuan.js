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
              newKemampuanModal : false,
              editKemampuanModal : false,
              currentPage : 1,
              kemampuanPerPage: 5,
                
              addKemampuan : {
                namaKemampuan : '',
                  kategoriKemampuan : {
                    namaKategori : ''
                  }
                }
          }
          /* this.onChange = this.onChange.bind(this);
          this.onSubmit = this.onSubmit.bind(this); */
          this.toggleNewKemampuanModal = this.toggleNewKemampuanModal.bind(this);
       /*  this.toggleEditKemampuanModal = this.toggleEditKemampuanModal.bind(this); */
      }

     /*  onChange = (e) => {
        this.setState ({
          [e.target.name] : e.target.value
        })
      }

      onSubmit = (e) => {
        e.preventDefault();
        alert('Kemampuan berhasil ditambah')
        const kemampuan = {
          idKategori : this.state.namaKtg,  
          namaKemampuan : this.state.nama
        }

        axios.post('http://localhost:8085/api/kemampuan/add', kemampuan)
        .then ((res) => {
          console.log(res.data)
          this.setState ({ newKemampuanModal : false })
          this.getKemampuan();

        })
        .catch((error) => {
          console.log(error)
        });
      } */

      addNewKemampuan () {
        axios.post('http://localhost:8085/api/kemampuan/add', this.state.addKemampuan)
        .then((res) => {
          let {kemampuan} = this.state;

          kemampuan.push(res.data)
          this.setState ({newKemampuanModal : false,
            addKemampuan : {
              namaKemampuan : '',
                kategoriKemampuan : {
                  namaKategori : ''
                }
            }

          })
        })
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
        })
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
                      <Button color="danger" onClick={this.toggleNewKemampuanModal}>Tambah Kemampuan</Button>
                      <Modal isOpen={this.state.newKemampuanModal} toggle={this.toggleNewKemampuanModal}>
                        <ModalHeader toggle={this.toggleNewKemampuanModal} >Tambah Kemampuan</ModalHeader>
                        <ModalBody>

                        <Form method ="POST" onSubmit={this.onSubmit} action=""  className="form-horizontal">
                        <FormGroup row>
                        <Col md="12">                      
                          <Label for="namaKategori">Nama Kategori</Label>
                          <Input type="select" name="namaKtg" id="namaKtg" value={this.state.addKemampuan.kategoriKemampuan.namaKategori} onChange={(e) => {
                            let {addKemampuan} = this.state;

                            addKemampuan.kategoriKemampuan.namaKategori = e.target.value;

                            this.setState ({ addKemampuan })
                          }}> 
                          {kategoriKemampuan.map ((km) => (
                            <option key = {km.idKategori}>{km.namaKategori}</option>
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
                            <Input type="text" name="nama" placeholder="Masukan nama kemampuan" value={this.state.addKemampuan.namaKemampuan} onChange = {(e) => {
                              let {addKemampuan} = this.state;

                              addKemampuan.namaKemampuan = e.target.value;

                              this.setState({addKemampuan})
                            }} required />
                          </InputGroup>
                          </Col>
                        </FormGroup>
                      </Form>	

                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={this.addNewKemampuan.bind(this)}>Simpan</Button>{' '}
                          <Button color="secondary" onClick={this.toggleNewKemampuanModal}>Cancel</Button>
                        </ModalFooter>
                      </Modal>

                      <Table hover bordered striped responsive size="sm">
                          <thead>
                          <tr>
                            <th className="nomor">No</th>
                            <th>Nama Kategori</th>
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
                                 <td>{kem.kategoriKemampuan.namaKategori}</td>
                                 <td>{kem.namaKemampuan}</td>
                                 <td>
                                <Button type="submit" size="sm" color="warning" /* onClick={this.onEdit.bind(this, pen.idPendapatan)} */ className="mr-2"><i className="fa fa-pencil" name="edit"></i></Button>                                    
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
