import { CircularProgress } from '@mui/material';

import '../styles/LoadingSpinner.css';

const LoadingSpinner = () => {

    return (
        <div className='loading-spinner'>
            <CircularProgress color="inherit" size={'4rem'} />
        </div>
    );
};

export default LoadingSpinner;
