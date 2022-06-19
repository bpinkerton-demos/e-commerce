import {useSession} from "next-auth/react";
import {Container, Dropdown, Image, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {BoxArrowInRight, Cart, Person} from "react-bootstrap-icons";




export default function AppNavbar(){
    const {data: session} = useSession()
    return (
        <Navbar fixed={"top"} bg={"dark"} variant={"dark"} expand={"sm"}>
            <Container fluid>
                <Navbar.Brand href={"/"}>E-Commerce</Navbar.Brand>
                <Navbar.Toggle className={"float-right"}/>
                <Navbar.Collapse id={"responsive-navbar-nav"}>
                    <Nav className={"ms-auto"}>
                        {session && (<AuthNav user={session.user as AuthUser}/>)}
                        {!session && (<NoAuthNav/>)}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

function NoAuthNav(){
    return (
        <Nav.Link className={"float-right"} href={`/api/auth/signin`}>Login <Person size={20}/></Nav.Link>
    )
}


type AuthUser = {
    email: string,
    image: string,
    name: string
}

interface AuthNavProps{
    user: AuthUser
}


function AuthNav({user}: AuthNavProps){

    return (
        <>

            <UserCart />
            <NavDropdown id={"user-dropdown"} menuVariant={"dark"} title={
                <Image src={user.image} alt={"image of logged in user"} roundedCircle={true} height={40}/>
            }  flip >
                <Dropdown.ItemText >{user.name}</Dropdown.ItemText>
                <Dropdown.ItemText >{user.email}</Dropdown.ItemText>
                <Dropdown.Item className={"float-right"} href={`/api/auth/signout`}>Logout <BoxArrowInRight size={20}/></Dropdown.Item>
            </NavDropdown>
        </>
    )
}

function UserCart(){
    return (
        <>
            <NavDropdown className={"cart-dropdown"} menuVariant={"dark"} title={
                <Nav.Link><Cart size={20}></Cart></Nav.Link>
            }>
                <Dropdown.Item>Checkout</Dropdown.Item>
            </NavDropdown>
        </>

    )
}