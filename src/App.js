import './App.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup' ;
function App() {
  const stepOneValidationSchema = Yup.object({
    firstname : Yup.string().required().label("First Name") ,
    lastname: Yup.string().required().label("Last Name") ,
    email : Yup.string().required().email().label("Email") ,
    mobile: Yup.number().required().label ("Mobile no")
  })
  const midStepValidationSchema = Yup.object({
    address: Yup.string().required().label ("Address"),
    state: Yup.string().required().label("State") ,
    pincode: Yup.number().required().label("PinCode") , 
    city : Yup.string().required().label("City") , 
  })
  const stepTwoValidationSchema = Yup.object({
    account : Yup.number().required().label("account"), 
    ifsc: Yup.string().required().label("IFSC Code") , 
    bank:Yup.string().required().label("Bank Name") , 
  })

  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobile: '',
    address : '',
    pincode: '',
    city: '',
    state: '',
    account: '' ,
    bank: '' , 
    ifsc: '' ,
  });

  const [showTable , setShowTable] = useState(false) ;

  const [currentStep, setCurrentStep] = useState(0);
  const makeRequest = (formdata)=>{
    console.log("Form Submitted" , formdata) ;
  }

  const [arr , setArr] = useState([]) ;

  const handleNextStep = (newData , final = false)=>{
    setData(prev => ({...prev , ...newData}))
    if (final) {
    makeRequest(newData);
    setArr(prev=> [...prev, newData]);
    setShowTable(true) ;
      return ;
    }
    setCurrentStep(prev =>prev+1) ;
    
  }
  
  const handlePrevStep = (newData)=>{
    setData(prev => ({...prev , ...newData}))
    setCurrentStep(prev =>prev-1) ;
  }

  const handleBack = ()=>{
    setData({
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
      address : '',
      pincode: '',
      city: '',
      state: '',
      account: '' ,
      bank: '' , 
      ifsc: '' ,
    });
    setShowTable(false) ;
    setCurrentStep(0) ;
  }

  const StepOne = (props) => {
    const handleSubmit = (values)=>{
      // this automatic caputuring of form data in vales is done by formik 
        props.next(values) ; // calls handleNextStep with values as newData

    }
    return (
      <div className='card'>
<h1>Personal Details</h1>
      
      <Formik
        validationSchema={stepOneValidationSchema}
        initialValues={props.data}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            {/* <p>First Name</p> */}
            <label htmlFor="firstname">First Name</label>
            <Field type="text" name="firstname" />
            <div className='ermsg'><ErrorMessage name="firstname" /> </div>

            <label htmlFor="lastname">Last Name</label>
            <Field type="text" name="lastname" />
            <div className='ermsg'><ErrorMessage name="lastname" /></div>

            <label htmlFor="email">Email</label>
            <Field type="text" name="email" />
            <div className='ermsg'><ErrorMessage name="email" /></div>

            <label htmlFor="mobile">Mobile</label>
            <Field type="number" name="mobile" />
            <div className='ermsg'><ErrorMessage  name="mobile" /> </div>

            <div className='button-group'> 
            <button type="submit">Next</button>
            </div>
            
          </Form>
        )}
      </Formik>
      </div>
    );
  };

  // Mid Form

  const MidStep =(props)=>{
    const handleSubmit = (values)=>{
      // this automatic caputuring of form data in vales is done by formik 
        props.next(values) ; // calls handleNextStep with values as newData

    }
    return (
      <div className='card'>
<h1>Address</h1>
      
      <Formik
        validationSchema={midStepValidationSchema}
        initialValues={props.data}
        onSubmit={handleSubmit}
      >
        {(values) => (
          <Form>
           <label htmlFor="address">Address</label>
            <Field type="text" name="address" />
            <div className='ermsg'><ErrorMessage name="address" /></div>

            <label htmlFor="city">City</label>
            <Field type="text" name="city" />
            <div className='ermsg'><ErrorMessage name="city" /></div>

            <label htmlFor="state">State</label>
            <Field type="text" name="state" />
            <div className='ermsg'> <ErrorMessage name="state" /> </div>

            <label htmlFor="pincode">Pincode</label>
            <Field type="text" name="pincode" />
            <div className='ermsg'><ErrorMessage name="pincode" /></div>
            
            <div className='button-group'> 
            <button type="button" onClick={()=>{props.prev(values)}}>Back</button>
            <button type="submit">Next</button>
            </div>
            
          </Form>
        )}
      </Formik>
      </div>
    );

  }
  const StepTwo = (props) => {
    const handleSubmit = (values)=>{
      props.next(values, true ) ;
      
    }
    return (
      <div className='card'> <h1>Payment Details</h1>
      <Formik 
        validationSchema={stepTwoValidationSchema}
        initialValues={data}
        onSubmit={handleSubmit}
      >
        {/* destructed formProps.values as {values} */}
        {({values}) => (
          <Form>
              <label htmlFor="account">Bank Account Number</label>
            <Field type="text" name="account" />
            <div className='ermsg'><ErrorMessage name="account" /> </div>

            <label htmlFor="ifsc">IFSC Code</label>
            <Field type="text" name="ifsc" />
            <div className='ermsg'><ErrorMessage name="ifsc" /></div>

            <label htmlFor="bank">Bank Name</label>
            <Field type="text" name="bank" />
            <div className='ermsg'><ErrorMessage name="bank" /></div>

            <div className='button-group'> 
            <button type="button" onClick={()=>{props.prev(values)}}  >Back</button>
            <button type="submit">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
      </div>
    );
  };

  const Table = (props) => {
    const arr = props.arr;
    
    return (
      
       <div className="table-container">
        <h1>Results</h1>
         <table className="styled-table">
         <thead>
             <tr>
               <th>FirstName</th>
               <th>LastName</th>
               <th>Email</th>
               <th>State</th>
               <th>Pincode</th>
               <th>Account Number</th>
               <th>IFSC Code</th>
             </tr>
           </thead>
           <tbody>
             {arr.map((row) => (
              <tr key={row.id}>
                <td>{row.firstname}</td>
                <td>{row.lastname}</td>
                <td>{row.email}</td>
                <td>{row.state}</td>
                <td>{row.pincode}</td>
                <td>{row.account}</td>
                <td>{row.ifsc}</td>
              </tr>
            ))}
          </tbody>
        </table>

      <div className='button-group'> 
            <button type="button" onClick={()=>{props.back()}}  >Fill New Form</button>
            </div>
    
        
      </div>
      
    );
  };


  const steps = [ <StepOne next ={handleNextStep} data ={data}/>, 
                <MidStep next ={handleNextStep} prev ={handlePrevStep} data ={data} /> ,
                <StepTwo next ={handleNextStep} prev ={handlePrevStep} data ={data}/>];
  
  // console.log (data) ;
  return(
  
    
      <div className='App'>
{!showTable && steps[currentStep]}
{showTable && <Table back ={handleBack} arr ={arr}/>}

      </div>
  )
}

export default App;

