// import logo from './logo.svg';
// import './App.css';
import React, {useEffect, useState} from "react";
import {Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography} from "@mui/material";

import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/500.css';
import '@fontsource/open-sans/700.css';

const api_base = "http://domande-fisio.ddns.net:8000";

function Display() {
    const [selection, setSelection] = useState("");
    const [selectedTopic, setSelectedTopic] = useState(""); // same as above but updated on hadleSearch
    const [topics, setTopics] = useState([]);
    const [question, setQuestion] = useState("");

    const handleSearch = () => {

        let query_path = selection === "" ? "/question" : "/question/" + selection;
        fetch(api_base + query_path, {crossDomain: true,}).then(res => res.json()).then(
            (data) => {
                if(selection !== data["message"]) {
                    setQuestion(data["message"])
                    setSelectedTopic(data["topic"]);
                }

            }).catch(console.log)
    }
    // useEffect(()=>{
    //     handleSearch();
    // }, [selection])


    return (<Container maxWidth="md">
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%'
                }}
            >
                <Typography variant="h3">
                    FISIO-DOMA
                </Typography>

                <Box sx={{
                    marginTop: 8,
                    width: '100%'
                }}>
                    <Grid container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          spacing={2}>

                        {/*<Grid item xs={6} md={8}>*/}
                        <Grid item>
                            <Button variant="contained" color="success" onClick={handleSearch}>generate</Button>
                        </Grid>
                        {/*<Grid item xs={6} md={4}>*/}
                        <Grid item>
                            <BasicSelect selection={selection} setSelection={setSelection} topics={topics}
                                         setTopics={setTopics}/>
                        </Grid>
                    </Grid>

                    <Box sx={{mt: 5, width: '100%', display: 'flex',
                            alignItems: 'center', justifyContent: 'center'}} >
                        <Typography sx={{ color: 'text.secondary', m:2}} variant="h5">
                            {selectedTopic === "" ? "" : selectedTopic+": "}
                        </Typography>
                        <Typography  sx={{ fontWeight: 'bold',  m:2}} variant="h5">
                            {question}
                        </Typography>
                    </Box>

                </Box>

            </Box>
        </Container>
    );

}

function BasicSelect({selection, setSelection, topics, setTopics}) {


    const handleChange = (event) => {
        setSelection(event.target.value);
    };

    useEffect(() => {
        fetch(api_base + "/topics", {crossDomain: true,}).then(res => res.json()).then(
            (data) => {
                setTopics(data["message"]);
            }).catch(console.log)
    },[])

    return (
        <div>
            <FormControl sx={{m: 1, minWidth: 130}}>
                <InputLabel id="demo-simple-select-label">Topic</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selection}
                    label="Selection"
                    autoWidth
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {topics.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                </Select>
            </FormControl>
        </div>
    );
}


function App() {
    return (
        <Display/>
    );
}

export default App;
