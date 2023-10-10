import React, { useEffect, useState } from "react";
import Navb from "../../Components/navbar";
import { SignoutNav } from "../../UserView/singoutnav";
import { useLocation } from "react-router-dom";
import { addCategory, addGroup, addPlace, isAuthenticated } from "../../auth/authIndex";
import { Button, Form } from "react-bootstrap";
import "./css/addplaces.css";
import FooterC from "../../Components/footer";

export function AddPlace() {
  const [places, setplaces] = useState({master_id:isAuthenticated().user.id,place_name:""});
  const [groups, setgroups] = useState({master_id:isAuthenticated().user.id,cust_grp:""});
  const [cat, setcat] = useState({master_id:isAuthenticated().user.id,cat_name:""});
  const [validated, setValidated] = useState(false);
  useEffect(() => {
    setValidated(false);
  });
  const handleChange = (name)=>(event) => {
    if( name === "place_name"){
      setplaces({...places,loading:false,[name]: event.target.value})
    }
    else if(name === "cust_grp"){
      setgroups({...groups,[name]: event.target.value,loading:false})
    }
    else if(name === "cat_name"){
      setcat({...cat,[name]: event.target.value,loading:false})
    }
  };
  return (
    <>
      <div className="name__top" style={{ background: "#313493" }}>
        Welcome to Head Office {isAuthenticated().user.first_name}
      </div>
      <Navb component={<SignoutNav />} state={"headOffice"} />
      <div className="DashContainer">
        <div className="DashboardBar">
          <h3>Place Master</h3>
        </div>
      </div>

    <Form
              noValidate
              validated={validated}
              onSubmit={(event) => {
                places.loading = true;
                const form = event.currentTarget;
                if (form.checkValidity() === false) {
                  event.preventDefault(); // refresh problem is here
                  event.stopPropagation();
                } else {
                  event.preventDefault();
                  setValidated(true);
                  console.log(places);
                  addPlace(places).then((data) => {
                    if (data) {
                      console.log(data);
                      setplaces({
                        ...places,
                        didNavigate: true,
                        loading: false,
                      });
                    } else {
                      console.log(data);
                      setplaces({ ...places, loading: false });
                    }
                  })
                  .catch((ee) => {
                    console.log(ee);
                  });
                  //Function here to add
                }
              }}
            >      <div class="parentplace">

              <div class="divp1">

              <Form.Group>
                <Form.Label>Add Places (Customers):</Form.Label>
                <Form.Control
                  onChange={handleChange("place_name")} // add change condition and function call to check for uniqueness from backend.
                  size="sm"
                  type="input"
                  className="form-control"
                  placeholder="Places"
                  required
                /></Form.Group> </div>
 <div class="divp2"><Button type="submit" style={{fontSize: "14px"}}> Save </Button>
 </div>
 </div>
 </Form>
 <Form
              noValidate
              validated={validated}
              onSubmit={(event) => {
                groups.loading = true;
                const form = event.currentTarget;
                if (form.checkValidity() === false) {
                  event.preventDefault(); // refresh problem is here
                  event.stopPropagation();
                } else {
                  event.preventDefault();
                  setValidated(true);
                  console.log(places);
                  addGroup(groups).then((data) => {
                    if (data) {
                      console.log(data);
                      setgroups({
                        ...groups,
                        didNavigate: true,
                        loading: false,
                      });
                    } else {
                      console.log(data);
                      setgroups({ ...groups, loading: false });
                    }
                  })
                  .catch((ee) => {
                    console.log(ee);
                  });
                  //Function here to add
                }
              }}
            >
             <div class="parentplace">
            <div class="divp1">
              <Form.Group>
                <Form.Label>Add Group (Customers):</Form.Label>
                <Form.Control
                  onChange={handleChange("cust_grp")} // add change condition and function call to check for uniqueness from backend.
                  size="sm"
                  type="input"
                  className="form-control"
                  placeholder="Group"
                  required
                /></Form.Group></div>
<div class="divp2"><Button type="submit" style={{fontSize: "14px"}}> Save </Button> </div>
</div>
</Form>

<Form
              noValidate
              validated={validated}
              onSubmit={(event) => {
                cat.loading = true;
                const form = event.currentTarget;
                if (form.checkValidity() === false) {
                  event.preventDefault(); // refresh problem is here
                  event.stopPropagation();
                } else {
                  event.preventDefault();
                  setValidated(true);
                  console.log(places);
                  addCategory(cat).then((data) => {
                    if (data) {
                      console.log(data);
                      setcat({
                        ...cat,
                        didNavigate: true,
                        loading: false,
                      });
                    } else {
                      console.log(data);
                      setcat({ ...cat, loading: false });
                    }
                  })
                  .catch((ee) => {
                    console.log(ee);
                  });
                  //Function here to add
                }
              }}
            >
<div class="parentplace">
            <div class="divp1">
              <Form.Group>
                <Form.Label>Add Category (Items):</Form.Label>
                <Form.Control
                  onChange={handleChange("cat_name")} // add change condition and function call to check for uniqueness from backend.
                  size="sm"
                  type="input"
                  className="form-control"
                  placeholder="Category"
                  required
                /></Form.Group></div>
<div class="divp2"><Button type="submit" style={{fontSize: "14px"}}> Save </Button> </div> 
</div> 
</Form> 

{JSON.stringify(places)}
{JSON.stringify(groups)}
{JSON.stringify(cat)}
<FooterC/>
    </>
  );
}
