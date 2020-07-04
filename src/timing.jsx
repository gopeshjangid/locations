import React, { Component ,lazy ,Suspense} from 'react';
import Layout from  "./layout";
import {MDBBox ,MDBRow ,MDBCol,MDBInput,MDBDataTableV5, MDBBtn, MDBAlert  } from "mdbreact";
import {withRouter } from 'react-router-dom';
import  {saveTime,getAllTime} from  "./database";

class Timing extends Component{
    constructor(prop){
        super(prop);
        this.state = {
            title : "Timing",
            timing : [],
            error : "",
            msg : "",
            loader : false,
            days : [
                { checked : false ,day : "Sun" , from : "10:30" ,to : "06:30",fm : {from :'AM' ,to :'PM'} },
                { checked : false ,day : "Mon" , from : "10:30" ,to : "06:30" ,fm : {from :'AM' ,to :'PM'} },
                { checked : false ,day : "Tue" , from : "10:30" ,to : "06:30" ,fm : {from :'AM' ,to :'PM'} },
                { checked : false ,day : "Wed" , from : "10:30" ,to : "06:30" ,fm : {from :'AM' ,to :'PM'} },
                { checked : false ,day : "Thu" , from : "10:30" ,to : "06:30" ,fm : {from :'AM' ,to :'PM'} },
                { checked : false ,day : "Fri" , from : "10:30" ,to : "06:30" ,fm : {from :'AM' ,to :'PM'} },
                { checked : false ,day : "Sat" , from : "10:30" ,to : "06:30" ,fm : {from :'AM' ,to :'PM'} }
            ],
           id : '' 
           
        }
    }

    componentDidMount(){
       getAllTime(this.getRecordList);
    }
  
    setDayRow = (time ,flag,index)=>{
        let day = [...this.state.days];
         day[index][flag] = time.time;
         day[index].fm[flag] = time.ampm;
        this.setState({days : day});
    }
   
     formatAMPM = (e,flag,index,type)=> {
         let time = type ? e : e.target.value;
         time = time.split(":")[1]=='' ? time+':00' : time;
        let d  = new Date();
        let full_date = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
        let date = new Date(full_date+" "+time);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        hours = hours<10 ? '0'+hours : hours;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime ={time : hours + ':' + minutes ,ampm : ampm};
        console.log("time--------" ,strTime)
         this.setDayRow(strTime,flag,index);

      }

    getClassName = (fm,type)=>{
        return fm==type ? 'formate-active' : 'formate-inactive';
      
    }
    getRecordList = (days)=>{
        console.log("timesss" ,days)
        let id = days.length && days[0].id ?  days.id : 0;
        let state = this.state.days;
        if(days.length){
            state.days = days[0].timings;
            state.id  = id;
            this.setState({...state});
        }
        
    }

    onChange = (index)=>{
        console.log("index" ,index)
        let state = [...this.state.days];
         state[index].checked = !state[index].checked;
         console.log(state[index])
        this.setState({days : state});
    }

    applyToAll = (index)=>{
        let state = [...this.state.days];
        let from = state[index].from;
        
        let to = state[index].to;
        
        for(let i=0;i<state.length;i++){
            let checked = state[i].checked;
            if(checked){
                console.log("checked")
                this.formatAMPM(from ,"from" ,i ,'type');
               this.formatAMPM(to ,"to" ,i ,'type');

            } 
            
        }

    }
    onSave=(e)=>{
        e.preventDefault();
          saveTime({timings : this.state.days ,id : this.state.id} ,this.responseHandler);
  
      }
    onCancel=(e)=>{
        e.preventDefault();
        this.props.history.push("/");
     }
     responseHandler = (isSaved)=>{
         console.log("isaved" ,isSaved)
        if(isSaved){
            this.props.history.push("/");
        }else{
           this.setState({status : "danger" , msg : "Error in saving the data"});
        }
    }

   render(){
      
      return(
          <Layout title={this.state.title}>
            <MDBBox className="add-box">
            {this.state.error && <MDBAlert color={this.state.error}  >{this.state.msg}</MDBAlert>}
            <form>
            <p className="h5 text-left mb-4 title"><strong>Facility Times</strong></p>
               
                <MDBRow >
                    <MDBCol md="1" size="1">
                         <p className="h5 text-left mb-4 title"><strong></strong></p>
                    </MDBCol>
                    <MDBCol md="4" size="4">
                         <p className="h5 text-left mb-4 title"><strong>From</strong></p>
                    </MDBCol>
                    <MDBCol md="3" size="3">
                         <p className="h5 text-left mb-4 title"><strong>To</strong></p>
                    </MDBCol>
                    <MDBCol md="3" size="3">
                         <p className="h5 text-left mb-4 title"><strong></strong></p>
                    </MDBCol>
                </MDBRow>
            {
             this.state.days.map((day,index)=><React.Fragment key={index}>
                  <MDBRow >
                    <MDBCol md="1" size="1">
                            <div className="custom-control custom-checkbox">
                               <input type="checkbox" onChange={()=>this.onChange(index)} className="custom-control-input" id={"defaultChecked"+index} checked={day.checked}/>
                              <label className="custom-control-label" htmlFor={"defaultChecked"+index}>{day.day}</label>
                            </div>
                    </MDBCol>
                    <MDBCol md="4" size="4">
                        <div className='time-box'>
                         <input type="time" value="10:30" value={day.from} onChange={(e)=>this.formatAMPM(e,'from' ,index)} />
                         <div className='time-formate'>
                            <div className={this.getClassName(day.fm.from ,'AM')+' AM'}>AM</div>
                           <div className={this.getClassName(day.fm.from ,'PM')+' PM'}>PM</div>
                         </div>
                         
                         </div>
                           
                    </MDBCol>
                    <MDBCol md="4" size="4">
                       <div className='time-box'>
                       <input type="time" value="06:30" value={day.to} onChange={(e)=>this.formatAMPM(e,'to' ,index)} />
                         <div className='time-formate'>
                         <div className={this.getClassName(day.fm.to ,'AM')+' AM'}>AM</div>
                           <div className={this.getClassName(day.fm.to ,'PM')+' PM'}>PM</div>
                         </div>
                         
                         </div>
                    </MDBCol>
                    <MDBCol md="3" size="3">
                         <MDBBtn outline color="info" size="sm" onClick={()=>this.applyToAll(index)}  >Apply to all checked</MDBBtn>
                    </MDBCol>
                </MDBRow>

             </React.Fragment>
             )

        }  
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
export default withRouter(Timing);