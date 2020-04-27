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
	Table
} from 'reactstrap';

  class LemburBonus extends Component {
      constructor () {
          super();
          this.state = {
              lemburBonus : []
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

      render() {
		  const {lemburBonus} = this.state;

          return (
    <>
		<Row>
           <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>List Lembur Bonus
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

	                  {lemburBonus.map((lb) => ( 

	                  <tbody key= {lb.idLemburBonus}>          
	                    <tr>
	                      <td>{lb.idLemburBonus}</td>
                            <td>{lb.idKaryawan}</td>
                            <td>{lb.tanggalLemburBonus}</td>
                            <td>{lb.lamaLembur}</td>
                            <td>{lb.variableBonus}</td>
		       			  <td>
		       			  	<Button type="submit" size="sm" color="warning" /* onClick={this.onEdit.bind(this, pen.idPendapatan)} */ className="mr-2"><i className="fa fa-pencil" name="edit"> Ubah</i></Button>
		       			  	
                			<Button type="reset" size="sm" color="danger" /* onClick={this.onDelete.bind(this, pen.idPendapatan)} */><i className="fa fa-eraser"></i> Hapus</Button>
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

export default LemburBonus;