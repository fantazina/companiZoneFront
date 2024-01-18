import React, { useState } from 'react';
import HealthList from './HealthList';
import HealthWrite from './HealthWrite';
import HealthUpdate from './HealthUpdate';
import H_styles from '../css/Health.module.css';
import HealthView from './HealthView';

const HealthMain = ({ mainPage, mainOnPage }) => {
    const [page, setPage] = useState(0)
    const [seq, setSeq] = useState(-1)
    const [pg, setPg] = useState(0)

    const onPage = (num) => {
        setPage(num)
    }

    const onSeq = (num) => {
        setSeq(num)
    }

    const onPg = (num) => {
        setPage(num)
    }

    return (
        <div>
            { page === 0 && <HealthList H_styles={ H_styles } onPage={ onPage } onSeq={ onSeq } pg={ pg } mainOnPage={ mainOnPage } />}
            { page === 1 && <HealthView H_styles={ H_styles } onPage={ onPage } seq={ seq } mainPage={ mainPage }  />}
            { page === 2 && <HealthWrite H_styles={ H_styles } onPage={ onPage } />}
            { page === 3 && <HealthUpdate H_styles={ H_styles } onPage={ onPage } seq={ seq } pg={ pg } />}
        </div>
    );
};

export default HealthMain;