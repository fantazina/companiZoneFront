import React, { useState } from 'react';
import IntroductionList from './IntroductionList';
import IntroductionView from './IntroductionView';
import IntroductionWrite from './IntroductionWrite';
import IntroductionUpdate from './IntroductionUpdate';
import I_styles from '../css/Introduction.module.css';

const IntroductionMain = ({mainPage, mainOnPage }) => {
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
            { page === 0 && <IntroductionList I_styles={ I_styles } onPage={ onPage } onSeq={ onSeq } pg={ pg } onPg={ onPg } mainOnPage={mainOnPage} />}
            { page === 1 && <IntroductionView I_styles={ I_styles } seq={ seq } onPage={ onPage } mainPage={ mainPage } />}
            { page === 2 && <IntroductionWrite I_styles={ I_styles } onPage={ onPage } />}
            { page === 3 && <IntroductionUpdate I_styles={ I_styles } onPage={ onPage } seq={ seq }/>}
        </div>
    );
};

export default IntroductionMain;