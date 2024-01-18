import React, { useState } from 'react';
import EventList from './EventList';
import EventWrite from './EventWrite';
import EventUpdate from './EventUpdate';
import E_styles from '../css/Event.module.css';
import EventView from './EventView';

const EventMain = ({mainPage,mainOnPage}) => {
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
            { page === 0 && <EventList E_styles={ E_styles } onPage={ onPage } onSeq={ onSeq } pg={ pg } mainOnPage={mainOnPage} /> }
            { page === 1 && <EventView E_styles={ E_styles } onPage={ onPage } seq={ seq } mainPage={mainPage} /> }
            { page === 2 && <EventWrite E_styles={ E_styles } onPage={ onPage } /> }
            { page === 3 && <EventUpdate E_styles={ E_styles } onPage={ onPage } seq={ seq } pg={ pg } /> }
        </div>
    );
};

export default EventMain;