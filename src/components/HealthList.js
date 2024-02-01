import axios from 'axios';
import React, { useEffect, useState } from 'react';

const HealthList = ({ onPage, onSeq, H_styles, pg, onPg, mainOnPage }) => {

    const userDTO = JSON.parse(window.sessionStorage.getItem('userDTO'))

    const[list, setList] = useState([])

    const[keyword, setKeyword] = useState('')
    const[pageList,setPageList] = useState([])
    
    useEffect(() => {
         axios.get(`https://port-0-companizoneback-ll53u2blrj4us1b.sel5.cloudtype.app/write/getList/2`, { params: { keyword: keyword , pg : pg } })
        .then(res => console.log(res.data))

        axios.get(`https://port-0-companizoneback-ll53u2blrj4us1b.sel5.cloudtype.app/write/getTotal/2`)
        .then(res => {
            let pl = []
            for(let i = 0; i < res.data / 10; i++) {
                pl.push(i)
            }
            setPageList(pl)
        })
    },[keyword, pg])
    
    const getToday = (logTime) => {
        const date = new Date(logTime)
        const day = date.getDate();
        const month = date.getMonth()+1;
        const hour = date.getHours();
        const minutes = date.getMinutes();

        return `${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')} 
        ${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
    
    const onView = (seq) => {
        if(userDTO) {
            onSeq(seq)
            onPage(1)  
        }else {
            mainOnPage(2)
        }
    }

    useEffect(() => {
        axios.get(`https://port-0-companizoneback-ll53u2blrj4us1b.sel5.cloudtype.app/write/getList/2`, { params: { keyword: keyword, pg : pg } })
             .then(res => setList(res.data))
    }, [keyword, pg])

    return (
        <div>
            <div className={ H_styles.upload_main }>
                <h2 style={{ display : 'inline-block' }}>건강 관리 게시판</h2>
                    <div className={ H_styles.search }>
                        <input placeholder='검색어를 입력해주세요.' type='text' value={ keyword } name='keyword' onChange={ e => setKeyword(e.target.value) } />                
                            { userDTO && 
                                <button onClick={ () => onPage(2) } >글쓰기</button>
                            }
                    </div>

                    <div style={{clear:'both'}}/>

                    <div className={H_styles.healthList}>
                        <div className={ H_styles.list_ }>
                            <span className={ H_styles.seq }>글번호</span>
                            <span className={ H_styles.title }>제목</span>
                            <span className={ H_styles.id }>작성자</span>
                            <span className={ H_styles.logTime }>작성일자</span>
                            <span className={ H_styles.hit }>조회수</span>
                        </div>
                    
                        <div>
                            {
                                list.map((item, index) => 
                                    <div onClick={ () => onView(item.writeSeq) } className={ H_styles.list }>
                                        <span className={ H_styles.seq }>{item.writeSeq}</span>
                                        <span className={ H_styles.title }>[{item.sel}]{item.title}</span>
                                        <span className={ H_styles.id }>{item.id}</span>
                                        <span className={ H_styles.logTime }>{getToday(item.logTime)}</span>
                                        <span className={ H_styles.hit }>{item.hit}</span>
                                    </div>)
                            }
                        </div>
                    </div>

                    <div>
                        <div className={ H_styles.page_num }>{pg > 4  && <span onClick={() => onPg(0 > pg - 10 ? 0 : pg - 10)}>이전</span>}
                            { pageList.filter(fil => pg > 4 ? ( pageList.length - 1 < pg + 5 ? fil >  pageList.length - 11 : (fil > pg -5 && fil < pg + 5) ) : fil < 10 )
                                .map(item => <span className={ H_styles.page_box } style={{ backgroundColor: item === pg ? 'cadetblue' : 'white', color : item === pg ? 'white' : 'black'}} 
                                onClick={() => pg !== item && onPg(item)}>{item+1}</span>)}
                            { pageList.length - 1 > pg + 4 && <span onClick={() => onPg(pageList.length - 1 < pg + 10 ? pageList.length - 1 : pg + 10)}>다음</span>}
                        </div>
                    </div>
            </div>
        </div>
    );
};


export default HealthList;