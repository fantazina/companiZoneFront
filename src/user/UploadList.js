import React from 'react';
import liststyles from '../css/UploadList.module.css';
import { Link } from 'react-router-dom';

const UploadList = () => {
    return (
        <div className={ liststyles.upload_main }>
            <h3>게시판 글 리스트</h3>
                <table className={ liststyles.table } border='1'>
                    <thead>
                        <tr>
                            <th>글번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일자</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                        
                    <tbody className={ liststyles.body }>
                       
                    </tbody>
                    <tfoot></tfoot >
                    <tbody>

                    </tbody>
                </table>

        </div>
    );
};

export default UploadList;