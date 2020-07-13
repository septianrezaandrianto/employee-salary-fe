import React, {Component} from 'react';
import './../../assets/style.css';
import {
	Card,
	CardBody,
	CardHeader,
	Col,
	Row,
	Table
} from 'reactstrap';

class Dispatch extends Component {
    constructor() {
        super();
        this.state = {
            dispatch : [],
        }
    }

    getDispatch() {
        fetch('http://localhost:9012/api/dispatch/all', {
          method: 'GET'  
        })
        .then(res => res.json()).then((data) =>{
            console.log(data.Data)
            this.setState ({ dispatch : data.Data})
        })
        .catch(console.log)
    }

    componentDidMount () {
        this.getDispatch();
    }
    
    render () {
        const {dispatch} = this.state;
        return (
            <>
		<Row>
			<Col>
				<Card>
				<CardHeader>
					<i className="fa fa-users"></i>List Dispatch
					</CardHeader>
					<CardBody>
						<Table hover bordered striped responsive size="sm">
						<thead>
						<tr>
							<th className="nomor">No</th>
							<th>Job Name</th>
							<th>Date (Dispatch Date+Time)</th>
							<th>Code</th>	                    
							<th>Customer</th>	                   
							<th>PIC</th>	                    
							<th>Phone Number</th>
							<th>Address</th>
							<th>Order Description</th>
						</tr>
						</thead>
					
						<tbody >   

						{dispatch.map((dis, index) => (

							<tr key= {dis.orderId}>
							<td>{index+1}</td>
							<td>{dis.ticketId.ticketTitle}</td>
							<td>{dis.dispatchDate}{''}{dis.dispatchTime}</td>
							<td>{dis.ticketId.ticketCode}</td>
							<td>{dis.ticketId.branchId.companyId.companyName}</td>
							<td>{dis.ticketId.picId.picName}</td>
							<td>{dis.ticketId.picId.picPhone}</td>
							<td>{dis.ticketId.branchId.branchAddress}</td>
							<td>{dis.dispatchDesc}</td>
							</tr>
						))}
						</tbody>						
						</Table>

					</CardBody>					
					</Card>
				</Col>
				</Row>
			</>
        )
    }
}

export default Dispatch;