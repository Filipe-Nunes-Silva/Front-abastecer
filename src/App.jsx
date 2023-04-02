import './App.css';
import { Container } from "@mui/system";
import RouterHandle from './router/Routes';
import NavBar from './components/NavBar/NavBar';

function App() {

  return (
    <Container>
      <NavBar />
      <RouterHandle />
    </Container>
  );
};

export default App;
