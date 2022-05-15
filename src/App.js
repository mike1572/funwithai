import React, {Fragment, useState, useEffect} from 'react';
import './App.css';
import api from './api';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';

function App() {

  let [loading, setLoading] = useState(false)
  let [info, setInfo] = useState('');
  let [data, setData] = useState([]);

  useEffect(()=> {
    let cookie = localStorage.getItem('AI_Data_Fun');
    if (cookie !== null){
      let storedResponses = JSON.parse(localStorage.getItem("AI_Data_Fun"));
      setData(storedResponses)
    }
  }, [])  

  let handleClick = (event) => {
    setData(data.filter((element, index) => index !== event.currentTarget.value))
    localStorage.setItem('AI_Data_Fun', JSON.stringify(data.filter((element, index) => index !== event.currentTarget.value)));
  }

  let handleChange = (event) => {
    if (event.target.name === 'info'){
      setInfo(event.target.value)         
    }
  }

  let handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const input = {
      prompt: info,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };
      
    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${api}`,
      },
      body: JSON.stringify(input),
    })
    .then(response => response.json())
    .then(json => {
      setLoading(false)
      setData([{prompt: info, response: json.choices[0].text}, ...data])
      localStorage.setItem('AI_Data_Fun', JSON.stringify([{prompt: info, response: json.choices[0].text}, ...data]))
    })
    setInfo('')
  }


  return (
    <Fragment>
      <Box className="response">
        <Typography sx={{textAlign: 'left', fontWeight: 600, fontSize: 25}}>Fun with AI</Typography>
        <Typography sx={{textAlign: 'left', fontWeight: 500, fontSize: 15, mt: 2}}>Enter prompt</Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
              multiline
              rows={5}
              fullWidth
              id="info"
              name="info"
              value={info} 
              onChange={handleChange}
          />
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Button type="submit" variant="contained" sx={{mt: 1}}>
            {loading ? (
                <CircularProgress size='1.5rem'  sx={{color: 'white'}}/>
            ): (
             'Submit'
            )}
            </Button>
            
          </Box>
        </form>
        <Typography sx={{textAlign: 'left', fontWeight: 600, fontSize: 18}}>Responses</Typography>        


        {data.length === 0 ? (
          <Box style={{backgroundColor: '#ccffff', borderRadius: 5, padding: 7, marginTop: 10}}>
            <Typography sx={{fontWeight: 500, fontSize: 15, m: 1}}>No responses yet</Typography>
          </Box>
        ): (
          <Fragment>
            {data.map((element, i) => (
              <Box key={i} style={{backgroundColor: '#ccffff', borderRadius: 5, padding: 7, marginTop: 10}}> 

              <IconButton aria-label="close" size="small" sx={{ml: '92%'}} value={i} onClick={handleClick} >
                <CloseIcon/>
              </IconButton>
              <Grid container sx={{mx: 1}}>
                <Grid item xs={12}>
                  <Grid container sx={{p: 1}}>
                    <Grid item xs={4}>
                    <Typography sx={{fontWeight: 600, fontSize: 15}}>Prompt:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                    <Typography>{element['prompt']}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{mt: 1, p: 1}}>
                  <Grid container>
                    <Grid item xs={4}>
                    <Typography sx={{fontWeight: 600, fontSize: 15}}>Response:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                    <Typography>{element['response']}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            ))}
          </Fragment>
        )}        
      



      </Box>

    </Fragment>
  );
}

export default App;
