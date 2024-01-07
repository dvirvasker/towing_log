import { Grid, Card, Typography, Button, Collapse } from "@mui/material";
import React, {useState} from "react";
const towinglogDashboard = () => {
    const [isFilterShown, setIsFilterShown] = useState(false);
    const [chosenPikod, setChosenPikod] = useState("");
    const [chosenOgda, setChosenOgda] = useState("");
    const [chosenHativa, setChosenHativa] = useState("");
    const [chosenGdod, setChosenGdod] = useState("");
    return <Grid container spacing={2}>
        <Grid item xs={12}>
             
            <Button variant="contained" onClick={() => {setIsFilterShown(true)}}>
                סינון
            </Button>
        </Grid>
        <Collapse in={isFilterShown}>
            <Grid item xs={12}>
                <Card>
                    <Grid container>
                        <Grid item>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Collapse>
    </Grid>
}

export default towinglogDashboard;