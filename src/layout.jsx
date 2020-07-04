import React, { Component } from 'react';
import {MDBContainer ,MDBRow,MDBCol ,MDBBtn ,MDBIcon} from "mdbreact";
import { withRouter } from 'react-router-dom';
class Layout extends Component{
    constructor(prop){
        super(prop);
        this.state = {
            style : {
                padding :"20px",
                backgroundColor : "#eaeeef",
                minHeight : "600px",
            }
        }
    }

    btnHandler = (e)=>{
        e.preventDefault();
        console.log(this.props)
          this.props.history.push("/addLocation");
    }
    timeHandler = (e)=>{
        e.preventDefault();
        console.log(this.props)
          this.props.history.push("/timing");
    }

   render(){
      
      return(
          <MDBContainer  style={this.state.style}>
              <MDBRow><MDBCol size="6"><h4>{this.props.title}</h4></MDBCol >
              <MDBCol size="3" className="text-right add-location">
                  <MDBBtn onClick={this.timeHandler} rounded  color="mdb-color">Timing</MDBBtn></MDBCol>
              <MDBCol size="3" className="text-right add-location">
                  <MDBBtn onClick={this.btnHandler} rounded  color="mdb-color">+ &nbsp;Add Location</MDBBtn></MDBCol></MDBRow>
              {this.props.children}
          </MDBContainer>
        );
   }
}
export default withRouter(Layout);