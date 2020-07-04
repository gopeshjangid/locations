import React, { Component ,lazy ,Suspense} from 'react';
import Layout from  "./layout";
import {MDBBox ,MDBRow ,MDBCol,MDBIcon,MDBDataTableV5, MDBBtn, MDBAlert  } from "mdbreact";
import {withRouter } from 'react-router-dom';
import  {getAll ,del ,update} from  "./database";
class App extends Component{
    constructor(prop){
        super(prop);
        this.state = {
            title : "Locations",
            rows : [],
            columns :[
                 {
                    label: 'Location Name',
                    field: 'name',
                    width: 60,
                    sort : "asc"
                  },
                  {
                    label: 'Address',
                    field: 'address1',
                    width: 100,
                    sort : "asc"
                  },
                  {
                    label: 'Phone No.',
                    field: 'phone',
                    width: 80,
                    sort : "asc"
                  },
                  {
                    label: 'Action',
                    field : "action",
                    width: 80,
                  },
            ],
            loader : true,
            msg : "",
            status : "",
            index : null
        }
    }

    componentDidMount(){
       getAll(this.getAllRows);
    }

    editClick = (row)=>{
         this.props.history.push("/addLocation/"+row);
    }

    deleteClick = (id ,index)=>{
        del(id,this.deleteHandler);
        this.setState({index :index});
   }

   deleteHandler = (isDeleted)=>{
    if(isDeleted){
        this.props.history.push("/");
        console.log("deleted==========")
         let state = [...this.state.rows];
         state.splice(this.state.index,1);
         this.setState({msg : "location is deleted successfully." ,status : "success" ,rows : state ,index : null})
    }
   }

    getAllRows = (rows)=>{
        for(let i =0;i<rows.length;i++){
            let id = rows[i].id;
            rows[i].action  =<React.Fragment><MDBBtn rounded outline color="info" size="sm" onClick={()=>this.editClick(id)}><MDBIcon icon="edit" /></MDBBtn>
              <MDBBtn rounded outline color="info" onClick={()=>this.deleteClick(id ,i)} size="sm"><MDBIcon icon="trash" /></MDBBtn></React.Fragment>;
        }
        this.setState({rows  : rows ,loader : false});
    }

    getEmptyPage = ()=>{
        return (<React.Fragment><MDBRow center>
            <MDBCol size="12"><div className="circle"><MDBIcon icon="map-marker-alt" size="3x" /></div></MDBCol> </MDBRow>
            <MDBRow><MDBCol><h3><strong>Kindly Add Your Location First</strong></h3></MDBCol></MDBRow>
         <MDBRow><MDBCol>There is no location right now</MDBCol></MDBRow>
         </React.Fragment>);
    }
    getRecordList = ()=>{
        return (<div><MDBDataTableV5 
         className="data-rows" bordered={true} searching={false} striped={true} bordered
         responsive={true}
         scrollX={false}
          entries={5} className=""  
          data={{columns : this.state.columns ,rows : this.state.rows}}/>
         </div>);
    }

   render(){
      
      return(
          <Layout title={this.state.title}>
            <MDBBox className="main">
                {!this.state.loader && this.state.msg ? <MDBAlert color={this.state.status}   >{this.state.msg}</MDBAlert> : ''}
                {this.state.loader && <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                 </div> }
                {this.state.rows.length>0 ? this.getRecordList() : !this.state.loader && this.getEmptyPage()}
            </MDBBox>
          </Layout>
         );
   }
}
export default withRouter(App);