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
	CardFooter,
	Col,
	Row,
	Table
} from 'reactstrap';

  class LemburBonus extends Component {
      constructor () {
          super();
          this.state = {
			  lemburBonus : [],
			  currentPage : 1,
			  lemburBonusPerPage:5,
          }
	  }
	  
	  getLemburBonus() {
		  axios.get('http://localhost:8085/api/lemburbonus/all')
		  .then(res => {
			  this.setState ({ lemburBonus : res.data.Data})
		  })
		  .catch(console.log)
	  }

	  componentDidMount () {
		this.getLemburBonus();
	  }

	  currentPage =(e) => {
		  this.setState ({
			  [e.target.name] : parseInt(e.target.value)
		  });
	  };

	  firstPage =() => {
		if(this.state.currentPage >1) {
			this.setState ({
				currentPage : 1
			});
		}  
	  };

	  prevPage =() => {
		  if (this.state.currentPage > 1) {
			  this.setState ({
				  currentPage : this.state.currentPage - 1
			  });
		  }
	  };

	  nextPage = () => {
		  if (this.state.currentPage < Math.ceil(this.state.lemburBonus.length / this.state.lemburBonusPerPage)) {
			  this.setState ({
				  currentPage : this.state.currentPage + 1
			  });
		  }
	  };

	  lastPage = () => {
		  if (this.state.currentPage < Math.ceil(this.state.lemburBonus.length / this.state.lemburBonusPerPage)) {
			  this.setState ({
				  currentPage : Math.ceil(this.state.lemburBonus.length / this.state.lemburBonusPerPage)
			  });
		  }
	  };
	  
      render() {
		  const {lemburBonus, currentPage, lemburBonusPerPage} = this.state;

		  const lastIndex = currentPage * lemburBonusPerPage;
		  const firstIndex = lastIndex - lemburBonusPerPage;
		  const currentLemburBonus = lemburBonus.slice(firstIndex, lastIndex);
		  const totalPages = Math.ceil(lemburBonus.length / lemburBonusPerPage);
          return (
    <>
		<Row>
           <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-google-wallet"></i>List Lembur Bonus
	              </CardHeader>
	              <CardBody>

                  <Table hover bordered striped responsive size="sm">
	                  <thead>
	                  <tr>
	                    <th>ID Lembur Bonus</th>
                        <th>ID Karyawan</th>
                        <th>Tgl. Lembur Bonus</th>
                        <th>Lama Lembur</th>
                        <th>Variable Bonus</th>
	                    <th className ="aksi">Aksi</th>
	                  </tr>
	                  </thead>

	                  <tbody> 

					{lemburBonus.length === 0 ?
					<tr>
						<td colSpan = "12"><h4>Belum ada data</h4></td>
					</tr> :
					currentLemburBonus.map((lb) => (         
	                    <tr key= {lb.idLemburBonus}>
	                      <td>{lb.idLemburBonus}</td>
                            <td>{lb.idKaryawan}</td>
                            <td>{lb.tanggalLemburBonus}</td>
                            <td>{lb.lamaLembur}</td>
                            <td>{lb.variableBonus}</td>
		       			  <td>
		       			  	<Button type="submit" size="sm" color="warning" /* onClick={this.onEdit.bind(this, pen.idPendapatan)} */ className="mr-2"><i className="fa fa-pencil" name="edit"></i></Button>
		       			  	
                			<Button type="reset" size="sm" color="danger" /* onClick={this.onDelete.bind(this, pen.idPendapatan)} */><i className="fa fa-trash"></i></Button>
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

export default LemburBonus;