import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './ShoppingPage.css';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import { withStyles } from "@material-ui/core/styles";
import ShoppingCard from "./ShoppingCard";
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    card: {
        maxWidth: 150,
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
    },
    media: {
        paddingTop: "56.25%",
        height: '120px'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

}));



export default function ShoppingPage() {
    const classes = useStyles();

    const [properties, setproperties] = useState([]);
    const [caterories, setcaterories] = useState([]);
    const [value, setValue] = useState(0);
    const [targetGroupSelected, settargetGroupSelected] = useState('');
    const [data, setdata] = useState([]);
    const [resolution, setresolution] = useState([]);
    const [resolutionSelected, setresolutionSelected] = useState('500x1000 px')

    const [checked, setChecked] = React.useState(true);

    const handleChange1 = (event) => {
        setChecked(event.target.checked);
    };


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChange3 = (event) => {
        setresolutionSelected(event.target.value);
    };

    const handleTargetGroupChange = (event) => {

        settargetGroupSelected(event.target.value);
        let selectedProperties = data && data.targetGroup.filter((element) => { return element.name == event.target.value });
        setproperties(selectedProperties && selectedProperties[0].properties);

    }


    useEffect(() => {
        axios.get('http://65.2.63.155:3000/outputspec/test/form')
            .then((response) => {
                setdata(response.data);
                setSelectedCaterory(response.data.categories);
                setproperties(response.data.targetGroup && response.data.targetGroup[0].properties)
                setresolution(response.data.resolution && response.data.resolution)
                settargetGroupSelected(response.data.targetGroup && response.data.targetGroup[0].name)
                // setcaterories(response.data.categories)
            })
    }, [])

    const setSelectedCaterory = (data) => {
        data && data.map((value) => {
            if (value.name == "Upperwear") {
                value['selected'] = true
            } else {
                value['selected'] = false
            }

        })
        setcaterories(data)
    }



    const categoryClicked = (id) => {
        let copyCat = [...caterories]
        copyCat.forEach((data) => {
            if (data._id == id) {
                data['selected'] = !data['selected']
            }
        });
        setcaterories(copyCat)

    }


    const RadioButtons = () => {
        // settargetGroupSelected(data && data.targetGroup && data.targetGroup[0].name)
        return data && data.targetGroup && data.targetGroup.map((value) => {
            return <FormControlLabel value={value.name} control={<Radio />} label={value.name} />
        })
    }
    const Categories = () => {
        return caterories && caterories.map((value) => {
            if (value.selected) {
                return <span className="selectedCategory" key={value._id} onClick={() => { categoryClicked(value._id) }}><RemoveIcon /><span style={{ paddingLeft: '5px' }}>{value.name}</span></span>
            } else {
                return <span className="category" key={value._id} onClick={() => { categoryClicked(value._id) }}><AddIcon /><span style={{ paddingLeft: '5px' }}>{value.name}</span></span>

            }
        })
    }

    const findSelectedCat = (value) => {
        const filterData = caterories && caterories.filter((cat) => {
            return (cat.name == value.category) && cat.selected
        })
        if (filterData.length > 0) {
            return true
        } else {
            return false
        }

    }

    const anglesRequiredTabs = () => {
        let filterAglesBasedOnCat = properties && properties.angle && properties.angle.filter((value) => {
            return findSelectedCat(value)
        })
        return filterAglesBasedOnCat && filterAglesBasedOnCat.map((value) => {
            return <Tab label={value.category} key={value._id} />
        })

    }

    const croppingTabs = () => {
        let filterAglesBasedOnCat = properties && properties.cropping && properties.cropping.filter((value) => {
            return findSelectedCat(value)
        })

        return filterAglesBasedOnCat && filterAglesBasedOnCat.map((value) => {
            return <Tab label={value.category} key={value._id} />
        })

    }

    const AngleItem = () => {

        let filterAglesBasedOnCat = properties && properties.angle && properties.angle.filter((value) => {
            return findSelectedCat(value)
        })
        // console.log(filterAglesBasedOnCat)

        return filterAglesBasedOnCat && filterAglesBasedOnCat.map((item) => {

            return item.values && item.values.map((shoppingItem) => {

                return <ShoppingCard key={shoppingItem._id} shoppingItem={shoppingItem} />
            })
        })
    }

    const options = () =>{
        return resolution && resolution.map((item)=>{
            console.log('option',item)
            return <MenuItem value={item.value}>{item.value}</MenuItem>
        })
        
    }


    const croppingItem = () => {

        let filterAglesBasedOnCat = properties && properties.cropping && properties.cropping.filter((value) => {
            return findSelectedCat(value)
        })

        return filterAglesBasedOnCat && filterAglesBasedOnCat.map((item) => {
            return item.values && item.values.map((shoppingItem) => {
                return <ShoppingCard key={shoppingItem._id} shoppingItem={shoppingItem} />
            })
        })
    }



    return (
        <div className={classes.root} style={{ padding: '20px 0px 50px 57px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <RadioGroup row aria-label="gender" onChange={handleTargetGroupChange} defaultValue="male" value={targetGroupSelected} name="row-radio-buttons-group">
                            {RadioButtons()}
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <h4>Categories </h4>
                </Grid>
                <Grid item xs={12}>
                    {Categories()}
                </Grid>

                <Grid item xs={12} >
                    <h3>Angles Required</h3>
                </Grid>
                <Grid item xs={12} >
                    <div >
                        <Tabs
                            value={value}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleChange}
                            aria-label="Agles required"
                        >
                            {anglesRequiredTabs()}
                        </Tabs>
                    </div>


                </Grid>


                <Grid item xs={12} style={{ display: 'flex', overflowX: 'auto', width: '70vw' }}>
                    {AngleItem()}
                </Grid>
                <Grid item xs={12} >
                    {/* <h3>Cropping & Alignment </h3> */}
                </Grid>

                <Grid item xs={12} >
                    <h3>Cropping & Alignment </h3>
                </Grid>
                <Grid item xs={12} >
                    <div >
                        <Tabs
                            value={value}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleChange}
                            aria-label="Agles required"
                        >
                            {croppingTabs()}
                        </Tabs>
                    </div>
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', overflowX: 'auto', width: '70vw' }}>
                    {croppingItem()}
                </Grid>

                <Grid item xs={12} >

                </Grid>

                <Grid item xs={12} >
                    <h3>Alignment </h3>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={handleChange1}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Top"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                defaultChecked={true}
                                onChange={handleChange1}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Centre"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={handleChange1}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Bottom"
                    />

                </Grid>
                <Grid item xs={12}>
                    <h3>Output Resolution</h3>
                </Grid>
                <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Presets</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={"500x1000 px"}
                            value={resolutionSelected}
                            onChange={handleChange3}
                        >
                            {options()}
                            
                        </Select>
                    </FormControl>
                </Grid>



            </Grid>
        </div>
    );
}
