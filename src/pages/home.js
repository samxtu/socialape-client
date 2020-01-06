import React , { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getScreams} from '../redux/actions/dataActions';


//Components
import Scream from '../components/Scream';
import Profile from '../components/Profile';

// mui stuff
import Typography  from '@material-ui/core/Typography';


class home extends Component {
    componentDidMount(){
        this.props.getScreams()
    }
    render (){
        const {data: {screams,loading}} = this.props;
        let recentScreamMarkUp = !loading?screams.map((scream)=><Scream key={scream.screamId} scream={scream}/>):(<Typography variant="h5">Loading...</Typography>)
        return (
            <Grid container spacing={2}>
                <Grid item sm={8} xs={12}>
                    {recentScreamMarkUp}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>
        )
    }
}

home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getScreams})(home);