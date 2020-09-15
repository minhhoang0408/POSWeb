import React from 'react';
import {Route, Redirect} from 'react-router-dom';


export const ProtectedRoute = ({component: Component, ...rest}) => {
  
  let login = false;
  var user=JSON.parse(sessionStorage.getItem("user"));
  if(user!==null) login = true;
  return (
    <Route 
      {...rest}
      render={props => {
        if(login){
          return <Component {...props}/>
        } else {
          return <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location
              }
            }}         
          
          />
        }
      }}
    />
  )
}