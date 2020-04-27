import React, { Component } from 'react';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
} from 'reactstrap';

class Dashboard extends Component {
  constructor(props) {
    super(props);


    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      employees : []
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

getEmployee() {
  fetch('http://localhost:8085/api/karyawan/all', {
    method:'GET'
  }).then(res => res.json()).then((data) =>{
    //console.log(data.Data)
    this.setState({employees: data.Data})
})
  .catch(console.log)
}

componentDidMount() {
  this.getEmployee();
}
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>


  render() {
const {employees}=this.state;
    return (

    <>
      <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>Tabel Karyawan
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>ID Karyawan</th>
                    <th>Nama Karyawan</th>
                    <th>No KTP</th>
                    <th>Tanggal Lahir</th>
                    <th>Jenis Kelamin</th>
                    <th>Posisi</th>
                    <th>Tingkatan</th>
                    <th>Penempatan</th>
                    <th>UMK Penempatan</th>
                  </tr>
                  </thead>

                  {employees.map((emp) => (

                  <tbody key= {emp.idKaryawan}>          
                    <tr>
                      <td>{emp.idKaryawan}</td>
                      <td>{emp.nama}</td>
                      <td>{emp.noKtp}</td>
                      <td>{emp.tanggalLahir}</td>
                      <td>
                        <Badge color="success">{emp.jenisKelamin}</Badge>
                      </td>
                      <td>{emp.posisi.namaPosisi}</td>
                      <td>{emp.tingkatan.namaTingkatan}</td>
                      <td>{emp.penempatan.kotaPenempatan}</td>
                      <td>Rp. {emp.penempatan.umkPenempatan}</td>
                    </tr>

                  </tbody>
                   ))}
                </Table>
              
              </CardBody>
            </Card>
          </Col>
        </Row>
</>
    );
  }

}

export default Dashboard;
