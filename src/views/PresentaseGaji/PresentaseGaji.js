import React, {Component} from 'react';
import './../../assets/style.css';
import axios from 'axios';
import {
	Pagination,
	PaginationItem,
	PaginationLink,
/* 	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText, */
	Button,
	Card,
	CardBody,
	CardHeader,
	Col,
	Row,
	Table,
  CardFooter
} from 'reactstrap';

  class PresentaseGaji extends Component {
    constructor() {
        super();
        this.state = {
            presentaseGaji : [],
            currentPage :1,
            presentasiGajiPerPage : 5,
        }
    }

     /* Start paginasi */
    changePage = (e) => {
      this.setState ({
        [e.target.name] :parseInt(e.target.value)
      });
    };

    firstPage =() => {
      if(this.state.currentPage > 1) {
        this.setState ({
          currentPage : 1
        });
      }
    };

    prevPage = () => {
      if (this.state.currentPage > 1) {
        this.setState ({
          currentPage : this.state.currentPage -1
        });
      }
    };

    nextPage = () => {
      if (this.state.currentPage < Math.ceil(this.state.presentaseGaji.length / this.state.presentasiGajiPerPage)) {
        this.setState ({
          currentPage : this.state.currentPage  + 1
        });
      }
    };

    lastPage =() => {
      if (this.state.currentPage < Math.ceil(this.state.presentaseGaji.length / this.state.presentasiGajiPerPage)) {
        this.setState ({
          currentPage : Math.ceil(this.state.presentaseGaji.length / this.state.presentasiGajiPerPage)
        });
      }
    }
    /* end paginasi */

    onDelete(id) {
    alert('Data berhasil didelete')
    axios.delete('http://localhost:8085/api/presentasegaji/delete/' + id)
      .then((res) => {
        console.log(res)
        this.getPresentaseGaji();
      })
      .catch((error) => {
        console.log(error)
      })
    }

    getPresentaseGaji() {

      axios.get('http://localhost:8085/api/presentasegaji/all')
        .then (res =>{
            this.setState ({ presentaseGaji : res.data.Data})
            console.log(res.data.Data)
        })
        .catch((error) => {
            console.log(error.res);
        });
    }

    componentDidMount () {
        this.getPresentaseGaji();
    }

    render () {
        const {presentaseGaji , currentPage, presentasiGajiPerPage} = this.state;

        const lastIndex = currentPage * presentasiGajiPerPage;
        const firstIndex = lastIndex - presentasiGajiPerPage;
        const currentPresentasiGaji = presentaseGaji.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(presentaseGaji.length / presentasiGajiPerPage);

        return (

            <>
            <Row>
               <Col>
                <Card>
                  <CardHeader>
                    <i className="fa fa-money"></i>List Presentase Gaji
                      </CardHeader>
                      <CardBody>
    
                      <Table hover bordered striped responsive size="sm">
                          <thead>
                          <tr>
                            <th>ID Presentase Gaji</th>
                            <th>Posisi</th>
                            <th>Tingkatan</th>
                            <th>Besaran Gaji</th>
                            <th>Masa Kerja</th>
                            <th className ="aksi">Aksi</th>
                          </tr>
                          </thead>                          
    
                          <tbody>  
                            {presentaseGaji.length === 0 ?
                            <tr>
                              <td colSpan="12">data masih kosong</td>
                            </tr> : 

                            currentPresentasiGaji.map((pg) => (        
                            <tr key= {pg.idPresentaseGaji}>
                                <td>{pg.idPresentaseGaji}</td>
                                <td>{pg.posisiDto.namaPosisi}</td>
                                <td>{pg.idTingkatan}</td>
                                <td>{pg.besaranGaji}</td>
                                <td>{pg.masaKerja}</td>                     
                                <td>
                                <Button type="submit" size="sm" color="warning" /* onClick={this.onEdit.bind(this, pen.idPendapatan)} */ className="mr-2"><i className="fa fa-pencil" name="edit"></i></Button>
                                    
                                <Button type="reset" size="sm" color="danger" onClick={this.onDelete.bind(this, pg.idPresentaseGaji)}><i className="fa fa-trash"></i></Button>
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

export default PresentaseGaji;