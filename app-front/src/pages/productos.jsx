import React from "react";
import {NavbarComponent} from "../components/user/Nav/NavbarComponent";
import { Container } from "react-bootstrap";

export const Productos = () =>{
    return(
        <>
        <header>
            <NavbarComponent />
        </header>
        <Container style={{height: '100vh', backgroundColor:'blue',}}>
            <div style={{display:'flex', gap:'50px'}}>
            <p>Lista de productos</p><p>Lista de productos</p><p>Lista de productos</p><p>Lista de productos</p><p>Lista de productos</p>
            </div>
            
        </Container>
       
        </>
        
    )
}
