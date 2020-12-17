import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function LikeList(list = []) {

    const [checked, setChecked] = useState([]);
    const [switchChecked, setSwitchChecked] = React.useState(false);
    const listItems = list
    const handleToggle = (value, list) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked.filter(x => list.includes(x))]

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };


    const toggleChecked = () => {
        setSwitchChecked((prev) => !prev);
    };

    function displayList(items) {
        return (<List>
            {items.map((value) => {
                const labelId = `checkbox-list-label-${value}`;
                return (
                    <ListItem key={value} role={undefined} dense button onClick={handleToggle(value, listItems.list)}>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={`${value}`} />
                        <ListItemSecondaryAction>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
        )
    }

    return (
        <div>
            <br></br>
            <Box component="div" display="inline" p={1} m={1} bgcolor="background.paper" color="#005CB9" face="courier" fontSize={25}>
                Total Tweets {listItems.list.length}
            </Box>
            <Box component="div" display="inline" p={1} m={1} bgcolor="background.paper" color="#B9005C" face="courier" fontSize={25}>
                Liked Tweets {checked.filter(x => listItems.list.includes(x)).length}
            </Box>
            <FormControlLabel
                control={<Switch checked={switchChecked} onChange={toggleChecked} />}
                label={switchChecked ? "Liked Tweets" : "All Tweets"}
            />
            {switchChecked ? displayList(checked.filter(x => listItems.list.includes(x))) : displayList(listItems.list)}

        </div>
    );
}
