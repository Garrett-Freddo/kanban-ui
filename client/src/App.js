import logo from './logo.svg';
import Users from "./Users";
import CustomerForm from "./CustomerForm";
import { makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { colors } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CustomerForm />
      </header>
    </div>
  );
}

export default App;
