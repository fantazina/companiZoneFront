import React, { useState } from 'react';
import QuestionList from './QuestionList';
import QuestionWrite from './QuestionWrite';
import QuestionUpdate from './QuestionUpdate';
import Q_styles from '../css/Question.module.css';
import QuestionView from './QuestionView';

const QuestionMain = ({mainPage, mainOnPage}) => {
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
            { page === 0 && <QuestionList Q_styles={ Q_styles } onPage={ onPage } onSeq={ onSeq } pg={ pg } mainOnPage={mainOnPage}/>}
            { page === 1 && <QuestionView Q_styles={ Q_styles } onPage={ onPage } seq={ seq } mainPage={ mainPage } />}
            { page === 2 && <QuestionWrite Q_styles={ Q_styles } onPage={ onPage } />}
            { page === 3 && <QuestionUpdate Q_styles={ Q_styles } onPage={ onPage } seq={ seq } pg={ pg } />}
        </div>
    );
};

export default QuestionMain;