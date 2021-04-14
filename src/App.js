import { useState } from 'react'
import iconv from 'iconv-lite';

import { Typography, Grid, Button } from '@material-ui/core'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
  root: {
    height: "100vh",
  },
  input: {
    display: 'none',
  },
  browse: {
    marginRight: "10px"
  },
  innerItem: {
    padding: "30px",
    border: "2px solid green",
    borderRadius: "8px",
  }

})

function App() {
  const [data, setData] = useState([]);
  const [enableButton, setEnableButton] = useState(false);

  const classes = useStyle();


  const uploadHandler = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileData = e.target.result;
      fileData.split("\r\n").forEach((line) => {
        const newLine = line + "  ";
        setData(prevState => [...prevState, newLine]);
      })

      setEnableButton(true);
    }

    reader.readAsText(file, "cp1251");
  }

  const downloadHandler = () => {
    const element = document.createElement('a');
    const encodedData = iconv.encode(data.join("\r\n"), "win1251");

    const url = window.URL.createObjectURL(new Blob([encodedData]));
    element.href = url;
    element.setAttribute('download', "PRODAGBI.TXT");

    element.click();
    setEnableButton(false);
  }

  return (
    <Grid container className={classes.root} justify="center" alignItems="center" direction="column">
      <div className={classes.innerItem}>
        <Grid item className={classes.paragraph} style={{ textAlign: "center", marginBottom: "10px" }}>
          <Typography>Качване на файла за ДДС</Typography>
        </Grid>
        <Grid item style={{ textAlign: "center" }}>
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
            startIcon={<CloudDownloadIcon />}
            onClick={downloadHandler}
            disabled={!enableButton}
          >
            Download
          </Button>
        </Grid>
      </div>
    </Grid>
  );
}

export default App;
