import React, { useState } from 'react';
import PresentList from './PresentList';
import PresentWrite from './PresentWrite';
import PresentUpdate from './PresentUpdate';
import P_styles from '../css/Present.module.css';
import PresentView from './PresentView';

const PresentMain = ({mainPage,mainOnPage}) => {
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
            { page === 0 && <PresentList P_styles={ P_styles } onPage={ onPage } onSeq={ onSeq } pg={ pg } onPg={ onPg } mainOnPage={mainOnPage} />}
            { page === 1 && <PresentView P_styles={ P_styles } onPage={ onPage } seq={ seq } mainPage={ mainPage } />}
            { page === 2 && <PresentWrite P_styles={ P_styles } onPage={ onPage } />}
            { page === 3 && <PresentUpdate P_styles={ P_styles } onPage={ onPage } seq={ seq } pg={ pg }  />}
        </div>
    );
};

export default PresentMain;