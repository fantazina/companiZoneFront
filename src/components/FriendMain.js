import React, { useState } from 'react';
import FriendList from './FriendList';
import FriendWrite from './FriendWrite';
import FriendUpdate from './FriendUpdate';
import F_styles from '../css/Friend.module.css';
import FriendView from './FriendView';

const FriendMain = ({mainPage, mainOnPage}) => {
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
            { page === 0 && <FriendList F_styles={ F_styles } onPage={ onPage } onSeq={ onSeq } pg={ pg } onPg={ onPg } mainOnPage={mainOnPage} />}
            { page === 1 && <FriendView F_styles={ F_styles } onPage={ onPage } seq={ seq } mainPage={ mainPage }/>}
            { page === 2 && <FriendWrite F_styles={ F_styles } onPage={ onPage } />}
            { page === 3 && <FriendUpdate F_styles={ F_styles } onPage={ onPage } seq={ seq } pg={ pg } />}
        </div>
    );
};

export default FriendMain;