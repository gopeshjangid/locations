import React, { Component ,lazy ,Suspense} from 'react';
import Layout from  "./layout";
import TimezonePicker from 'react-bootstrap-timezone-picker';
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';
import {MDBBox ,MDBRow ,MDBCol,MDBInput,MDBBtn ,MDBAlert} from "mdbreact";

import { withRouter } from 'react-router-dom';
import  {save ,get ,update,getAllTime, getAll} from  "./database";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
let state = [{text : "UP" ,value : "1"},{text : "Punjab" ,value : "2"},{text : "MP" ,value : "3"},{text : "Delhi" ,value:"4"}]

class App extends Component{
    constructor(prop){
        super(prop);
        this.state = {
            form : {

            },
            status : "",
            msg : "",
            title : "Add Location",
            timings : []
        }
    }

     componentDidMount(){
         if(this.props.match.params.id){
            get(this.props.match.params.id ,this.getRow);
            
         }
         getAllTime(this.getTimings)
        
     }
     getTimings = (timings)=>{
       if(timings.length){
           let times = timings[0].timings;
           this.setState({timings : times});
       }
     }

     componentDidUpdate(prevProps){
         if(prevProps.match != this.props.match && this.props.match.params.id==undefined){
             console.log("here==========")
             this.setState({form  : {} ,title : "Add Location"},()=>{
                this.forceUpdate();
             });
             
         }
     }
    
     getRow=(data)=>{
         console.log("dattttttttttt=========" ,data)
         this.setState({form : {...data},title : "Edit Location"});

     }
    onChange = (e)=>{
        let val = e.target.value.replace(/\s/g, '');
       
        this.setState({form : {...this.state.form ,[e.target.name] : val}});
    }
    onCustomChange = (name,value)=>{
        this.setState({form : {...this.state.form ,[name] : value}});
    }
    onSave=(e)=>{
      e.preventDefault();
      if(this.state.form.id){
        update(this.state.form ,this.responseHandler);
      }else{
        save(this.state.form ,this.responseHandler);
      }
      

    }

    responseHandler = (isSaved)=>{
        if(isSaved){
            this.props.history.push("/");
        }else{
           this.setState({status : "danger" , msg : "Error in saving the data"});
        }
    }

    onCancel=(e)=>{
         e.preventDefault();
         this.props.history.push("/");
      }

      formValidate = ()=>{
          let form = {...this.state.form};
          let validated = true;
          if(form.name ==''){
              validated = false;
          }


      }


      getStateOptions = (val)=>{
          console.log("state" ,val)
        return state.map((row)=><option defaultValue={val==row.value? row.value : ""} value={row.value} >{row.text}</option>)
      }
      
      getTimingsOptions = (val)=>{

      return this.state.timings.map((row,key)=>{
          if(row.checked){
           return (<option defaultValue={val==key? key : ""} value={key} >{row.day+" "+row.from+" - "+row.to}</option>)
       } });
    }

  

   render(){
      
      return(
          <Layout title={"Locations"}>
            <MDBBox className="add-box">
            <form>
                <MDBRow >
                    <MDBCol md="12" size="12">
                     
                         <p className="h5 text-left mb-4 title"><strong>{this.state.title}</strong></p>
                            {this.state.error && <MDBAlert color={this.state.error}  >{this.state.msg}</MDBAlert>}
                        <div className="grey-text">
                        <MDBInput validate={true} required={true} labelClass="input-label" value={this.state.form.name || ""} label="Location Name" onChange={this.onChange} name="name" group type="text" validate error="wrong"
                            success="right" />
                        </div>
                    </MDBCol>
                    
                </MDBRow>
                <MDBRow>
                    <MDBCol md="6" size="6">
                     
                        <div className="grey-text">
                        <MDBInput label="Address line 1" value={this.state.form.address1 || ""} onChange={this.onChange} name="address1" group type="text" validate error="wrong"
                            success="right" />
                        </div>
                   
                    </MDBCol>
                    <MDBCol md="6" size="6">
                     
                        <div className="grey-text">
                        <MDBInput label="Suite No." value={this.state.form.suiteno || ""} name="suiteno" onChange={this.onChange}  group type="text" validate error="wrong"
                            success="right" />
                        </div>
                   
                    </MDBCol>
                    
                </MDBRow>
                <MDBRow>
                    <MDBCol md="6" size="6">
                     
                        <div className="grey-text">
                        <MDBInput label="Address line 2" value={this.state.form.address2 || ""} name="address2" onChange={this.onChange}  group type="text" validate error="wrong"
                            success="right" />
                        </div>
                   
                    </MDBCol>
                    <MDBCol md="3" size="3">
                     
                        <div className="grey-text">
                        <MDBInput label="City" name="city" value={this.state.form.city || ""} group type="text" onChange={this.onChange} validate error="wrong"
                            success="right" />
                        </div>
                   
                    </MDBCol>
                    <MDBCol md="3" size="3">
                     
                     <div className="grey-text">
                         <label className="input-label">&nbsp;</label>
                       <select className="browser-default custom-select" value={this.state.form.state || ""} name="state" onChange={this.onChange}  >
                          <option>Select State</option>
                          {this.getStateOptions(this.state.state)}
                        </select>
                      
                     </div>
                
                 </MDBCol>
                    
                </MDBRow>
                <MDBRow>
                    <MDBCol md="3" size="3">
                     
                        <div className="grey-text">
                        <MDBInput label="Zip Code" maxLength="10" name="zip" value={this.state.form.zip || ""} onChange={this.onChange} group type="text" validate error="wrong"
                            success="right" />
                        </div>
                   
                    </MDBCol>
                    <MDBCol md="4" size="4">
                        
                        <div className="grey-text">
                        <label className="timezone-label">&nbsp;</label>
                            <PhoneInput
                            placeholder = "Phone Number"
                            country={'us'}
                            inputStyle={{width : "190px"}}
                            value={this.state.form.phone}
                            disableDropdown={true}
                            onChange={(val)=>this.onCustomChange("phone" ,val)}
                            />   
                        
                        </div>
                   
                    </MDBCol>
                    <MDBCol md="5" size="5">
                     
                        <div className="grey-text">
                        <label className="timezone-label">&nbsp;</label>   
                        <TimezonePicker
                            absolute      = {true}
                            placeholder="Timezone"
                            defaultValue  = "Timezone"
                            name="timezone"
                            className="timezone"
                            value={this.state.form.timezone || ""}
                            placeholder   = "Select timezone..."
                            onChange  = {(val)=>this.onCustomChange("timezone" ,val)}
                        />
                        
                        </div>
                   
                    </MDBCol>
                    
                </MDBRow>
                <MDBRow>
                    <MDBCol md="6" size="6">
                     
                        <div className="grey-text">
                        <label className="input-label">&nbsp;</label>
                        <select className="browser-default custom-select" value={this.state.form.facilitytimes || ""} name="facilitytimes" onChange={this.onChange}  >
                          <option>Select Facility times</option>
                          {this.getTimingsOptions(this.state.timings)}
                        </select>
                        </div>
                   
                    </MDBCol>
                    <MDBCol md="6" size="6">
                     
                        <div className="grey-text">
                        <MDBInput label="Appointment Pool" name="appointmentpool" value={this.state.form.appointmentpool || ""} onChange={this.onChange} group type="text" validate error="wrong"
                            success="right" />
                        </div>
                   
                    </MDBCol>
                    
                </MDBRow>
               
               
                <MDBRow>
                    <MDBCol md="12" size="12">
                     
                        <div className="text-right">
                        <MDBBtn color="danger" onClick={this.onCancel}>Cancel</MDBBtn>
                          <MDBBtn color="mdb-color" onClick={this.onSave}>Save</MDBBtn>
                        </div>
                   
                    </MDBCol>
                    
                </MDBRow>
                </form>
            </MDBBox>
          </Layout>
         );
   }
}
export default withRouter(App);