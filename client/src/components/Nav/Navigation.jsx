import { Container, Nav, Navbar} from 'react-bootstrap/';
import FULL_LOGO from '../../assets/logo-no-background_full.png';
import './Navigation.css';


const Navigation = () => {
  return (
    <Navbar bg='primary'>
      <Container>
        <Navbar.Brand href='https://fperalta.me' target='_blank'>
          <img src={FULL_LOGO} alt='logo' className='main-logo d-inline-block align-top' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;