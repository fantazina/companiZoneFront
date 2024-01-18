import React, { useState } from 'react';
import DailyList from './DailyList';
import DailyView from './DailyView';
import DailyUpdate from './DailyUpdate';
import DailyWrite from './DailyWrite';
import D_styles from '../css/Daily.module.css';
import { Router } from 'react-router-dom';

const DailyMain = ({mainPage,mainOnPage}) => {
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
        setPg(num)
    }

    return (
        <div>
            { page === 0 && <DailyList D_styles={ D_styles } onPage={ onPage } onSeq={ onSeq } pg={ pg } onPg={ onPg } mainOnPage={mainOnPage}/> }
            { page === 1 && <DailyView D_styles={ D_styles } onPage={ onPage } seq={ seq } mainPage={ mainPage }/> }
            { page === 2 && <DailyWrite D_styles={ D_styles } onPage={ onPage } /> }
            { page === 3 && <DailyUpdate D_styles={ D_styles } onPage={ onPage } seq={ seq }/> }
        </div>
    );
};

export default DailyMain;