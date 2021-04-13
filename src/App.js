import {useState} from 'react' 
import './App.css';

import { AppBar, Toolbar, Typography, Grid, Button } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(theme => ({
  root: {
    backgroundColor: "rgb(177, 230, 248)",
    maxWidth: "600px",
    margin: "auto",
    height: "100vh",
  },
  paragraph: {
    padding: "20px 0"
  },
  input: {
    display: 'none',
  },
  browse: {
    margin: "0 10px"
  }
}))

function App() {
  const [data, setData] = useState()

  const classes = useStyle();
  const uploadHandler = async(e) => {
    e.preventDefault();

    const blob = new Blob([e.target.files[0]],{type: 'text'})
    
    blob.text().then((data) => { console.log(data)}).catch((err) => {console.log(err)})
  }

  return (

    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography>EKO BULGARIA EAD</Typography>
        </Toolbar>
      </AppBar>
      <Grid item alignItems="center" direction="column" className={classes.root}>
        <Grid item lg={12} className={classes.paragraph}>
          <Typography>Качване на файла за ДДС</Typography>
        </Grid>
        <Grid item lg={12}>
          <input
            accept="txt"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={uploadHandler}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span" className={classes.browse}>
              Browse
        </Button>
          </label>
          <Button
            variant="contained"
            color="default"
            startIcon={<CloudUploadIcon />}
          >
            Upload
          </Button>
        </Grid>

      </Grid>
    </div>

  );
}

export default App;
