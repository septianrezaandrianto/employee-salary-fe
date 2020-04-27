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
      render() {            
            const {kemampuan} =  this.state;
            const {kategoriKemampuan} = this.state;
        return(
            <>
            <Row>
               <Col>
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i>List Kemampuan
                      </CardHeader>
                      <CardBody>

                        
                       {/* Modal (pop up) untuk add kemampuan */}
                      <Button color="danger" onClick={this.toggleNewKemampuanModal}>Tambah Kemampuan</Button>
                      <Modal isOpen={this.state.newKemampuanModal} toggle={this.toggleNewKemampuanModal}>
                        <ModalHeader toggle={this.toggleNewKemampuanModal}>Tambah Kemampuan</ModalHeader>
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
                            <th>ID Kemampuan</th>
                            <th>Nama Kategori</th>
                            <th>Nama Kemampuan</th>
                            <th className ="aksi">Aksi</th>
                          </tr>
                          </thead>
    
                          {kemampuan.map((kem) => ( 
                            
                          <tbody key= {kem.idKemampuan}>          
                            <tr>
                                 <td>{kem.idKemampuan}</td>
                                 <td>{kem.kategoriKemampuan.namaKategori}</td>
                                 <td>{kem.namaKemampuan}</td>
                                 <td>
                                <Button type="submit" size="sm" color="warning" /* onClick={this.onEdit.bind(this, pen.idPendapatan)} */ className="mr-2"><i className="fa fa-pencil" name="edit"> Ubah</i></Button>                                    
                                <Button type="reset" size="sm" color="danger" onClick={this.onDelete.bind(this, kem.idKemampuan)}><i className="fa fa-eraser"></i> Hapus</Button>
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

export default Kemampuan;
