import React, { Component } from 'react';
import './../../assets/style.css';
import axios from 'axios';
import {
	Card,
	CardBody,
	CardHeader,
	Row,
} from 'reactstrap';
import { Pie, Line } from 'react-chartjs-2';



class Dashboard extends Component {
  constructor(props) {
    super(props);


    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      employees : {},
      pendapatan : {}
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
    axios.get('http://localhost:8085/api/karyawan/all')
    .then(res => {
      console.log(res);

      const pieChart = res.data.Data;
      let name=[];
      let masakerja=[];
      pieChart.forEach(record => {
        name.push(record.nama);
      // console.log(name)
        masakerja.push(record.masaKerja);
        //console.log(masakerja)
      });
      this.setState ({
        employees : {
          labels : name, 
          datasets : [
            {
              label : 'Data Keryawan',
              data : masakerja,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#66E900',
                '#E94300',
                '#0ED3AC',
                '#025141',
                '#3B120A',
                '#2F1D19',
                '#0F1DCA',
                '#FD22DC',
                '#0DA9CB',
                '#2ACB0D',
                '#A9EE0A',
                '#FB2605',
                '#602BAD',
                '#BC07A6',
                '#C7043F',
                '#B57488',
                '#3C6861',
                '#E477E2',
                '#616D8C',
                '#532E36',
                '#6C0BAC',
              ],
              hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#66E900',
                '#E94300',
                '#0ED3AC',
                '#025141',
                '#3B120A',
                '#2F1D19',
                '#0F1DCA',
                '#FD22DC',
                '#0DA9CB',
                '#2ACB0D',
                '#A9EE0A',
                '#FB2605',
                '#602BAD',
                '#BC07A6',
                '#C7043F',
                '#B57488',
                '#3C6861',
                '#E477E2',
                '#616D8C',
                '#532E36',
                '#6C0BAC',
              ],
            }
          ]
        }
      })
    })
  }

  getPendapatan() {
    axios.get('http://localhost:8085/api/pendapatan/all')
    .then(res => {
      console.log(res);
      const line = res.data.Data;
      let name = [];
      let thp = [];
      line.forEach (record => {
        name.push(record.karyawanDto.nama);
        thp.push(record.takeHomePay);
      });

      this.setState({
        pendapatan : {
          labels : name,
          datasets : [
            {
              label : 'Data Pendapatan Karyawan',
              data : thp,
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
            }
          ]
        }
      })
    })
  }

  componentDidMount() {
    this.getEmployee();
    this.getPendapatan();
  }

render () {

  return (

    <>
      <Row>
        
        <Card style={{"height" :"80%", "width" : "80%" , "margin" : "0px 120px"}}>
            <CardHeader className="bg-dark" style={{"textAlign" : "center"}}>
              <h4 style={{"fontFamily" : "Lucida Console"}}>DATA MASA KERJA KARYAWAN (DALAM TAHUN)</h4>
            </CardHeader>
            <CardBody>
              <div>
                <Pie data={this.state.employees}/>
              </div>
            </CardBody>
          </Card>

          <Card style={{"height" :"80%", "width" : "80%" , "margin" : "20px 120px"}} >
            <CardHeader className="bg-dark" style={{"textAlign" : "center"}}>
              <h3 style={{"fontFamily" : "Lucida Console"}}>DATA PENDAPATAN KARYAWAN</h3>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Line data={this.state.pendapatan}/>
              </div>
            </CardBody>
          </Card>        
      </Row>
    </>
   
    );
  }

}

export default Dashboard;
