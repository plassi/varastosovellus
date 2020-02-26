import React, { Component } from 'react';
import {
    Button,
    Input
} from 'reactstrap';
import "./componentStyles.css"

class Search extends Component {

    render() {
        return (
            <div>
                <Input className="etsia  mr-3" style={{ marginBottom: '1rem' }} type="text" name='etsi' placeholder="Hae esine" aria-label="Search" />
                <Button color='dark'
                    style={{ marginBottom: '1rem' }} className="btn-etsi" type="submit" >Hae</Button>
            </div>
        );
    }
}

export default Search;