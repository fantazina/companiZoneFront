import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

const HealthView = ({onPage, H_styles ,seq, mainPage}) => {
      
    const[writeDTO, setWriteDTO] = useState()
    const[imgList, setImgList] = useState([])
    const[modal, setModal] = useState(false) /* 모달 off */
    const[modalImg, setModalImg] = useState('')
    const[commentDTO, setCommentDTO ] = useState({
        id : JSON.parse(window.sessionStorage.getItem('userDTO')).id,
        content : '',
        writeSeq : seq
    })
    const[commentList, setCommentList] = useState([])
    const[commentTotal, setCommentTotal] = useState(0)
    const[commentCount, setCommentCount] = useState(0)
    const[loading,setLoading] = useState(false)


     //////////////스크롤 매커니즘////////////////
     const handleScroll = useCallback(() => {

        const mpScroll= mainPage.scrollTop + mainPage.clientHeight;
    
        console.log(mpScroll)

        const mpHeight = mainPage.scrollHeight;

        console.log(mpHeight)

        if (mpScroll + 1 >= mpHeight) {
            if( !loading && commentList.length > 0 ) {
                console.log('불러오겠다!')
                //로딩이 트루인 시점
                setLoading(true)
                axios.get(`http://localhost:8080/comment/getList/${seq}`,{ params: { 
                    commentCount : commentCount + 10 > commentTotal ? commentTotal : commentCount + 10 } })
                .then(res => {
                    setCommentList(res.data)
                //////////////////////////////////
                    setLoading(false)
                })
                setCommentCount(commentCount + 10)
            } else {
                console.log('로딩중')
            }
        }
      },[mainPage, loading, commentCount, commentList, commentTotal, seq])
    ////////////////////////////////////////////

    const onChangePage = (pg) => {
        onPage(pg)
    }

    const onModal = (item) => {
        setModal(true)
        setModalImg(item)
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/write/getView/${seq}`)
             .then(res => { 
                 setWriteDTO(res.data)
                 setImgList(res.data.images.split(','))
                
            })


        axios.get(`http://localhost:8080/comment/getTotal/${seq}`)
            .then(res => {
                setCommentTotal(res.data)
                setCommentCount(res.data < 10 ? res.data : 10 )
                //total가져오는 axios를 먼저 사용해야 commentCount를 알수있으니까!
                if(res.data > 0) {
                    axios.get(`http://localhost:8080/comment/getList/${seq}`,{ params: { commentCount : res.data < 10 ? res.data : 10 } })
                        .then(res => setCommentList(res.data))
                }
        })
    }, [seq])

    useEffect(() => {
        ////////스크롤 매커니즘///////////////
            mainPage.addEventListener('scroll', handleScroll);

            return () => {
                mainPage.removeEventListener('scroll', handleScroll);
            };
        ///////////////////////////////////
    },[mainPage, loading, commentCount, commentList, commentTotal,seq,handleScroll)

    const getToday = (logTime) => {
        const date = new Date(logTime)
        const day = date.getDate();
        const month = date.getMonth()+1;
        const hour = date.getHours();
        const minutes = date.getMinutes();

        return `${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')} 
        ${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
    
    const onDeleteSubmit = ()=> {
        axios.delete(`http://localhost:8080/write/delete/${seq}`)
             .then(res => {
             alert('글이 삭제되었습니다.')
             onPage(0)
             })   

            .catch((error) => {
            alert('삭제 실패');
            // 실패 시 처리
            });
    }

    const onInput = (e) => {
        const{name, value} = e.target

        setCommentDTO({
            ...commentDTO,
            [name] : value 
        })

    }
    const onCommentSubmit = () => {
        axios.post(`http://localhost:8080/comment/write`, commentDTO)
             .then(res => {
                setCommentDTO({
                    ...commentDTO,
                    content : ''
                })
                setCommentList([
                    res.data,       
                    ...commentList
                ]);
                axios.get(`http://localhost:8080/comment/getTotal/${seq}`)
                .then(res => setCommentTotal(res.data))
        })
    }

    const onCommentDelete = (commentSeq) => {
        axios.delete(`http://localhost:8080/comment/delete/${commentSeq}`)
             .then((res) => {
                axios.get(`http://localhost:8080/comment/getTotal/${seq}`)
                .then(res => setCommentTotal(res.data))

                setCommentList(commentList.filter(item => item.commentSeq !== commentSeq))
        })
    }

    return (
        <div>
            <div className={ H_styles.view_container }>
                { writeDTO && 
                    <div className={ H_styles.view_main }>
                        <div className={ H_styles.top_div }>
                            <div className={ H_styles.back }>
                                <button onClick={ () => onChangePage(0) }>뒤로</button>
                            </div>

                            <h2 className={ H_styles.view_title }>[{ writeDTO.sel }]{ writeDTO.title }</h2> 
                                { writeDTO && window.sessionStorage.getItem('userDTO') && JSON.parse(window.sessionStorage.getItem('userDTO')).id === writeDTO.id && (
                                    <div className={ H_styles.up_button }>
                                        <button onClick={ () => onPage(3) }>수정</button>
                                        <button onClick={ onDeleteSubmit }>삭제</button>
                                    </div>
                                )}
                            <div className={ H_styles.id_list }>{ writeDTO.id } | { getToday(writeDTO.logTime) } | { writeDTO.hit }</div>
                        </div>

                        <div className={ H_styles.view_content }>
                            <div className={ H_styles.view_text }>{ writeDTO.content }</div>
                        </div>

                        <div className={ H_styles.view_img}>
                            {
                                imgList.map((item, index) => 
                                    <img key={index} style={{ objectFit : 'cover', width : '350px', display: 'inline-block' }} 
                                        src={item} onClick={ () => onModal(item) } alt='사진'/>)
                            }
                        </div>
                        
                        <div>
                            <div className={ H_styles.comment_text }>
                                <input type='text' name='content' value={ commentDTO.content } onChange={ onInput } />
                                <button onClick={ () => onCommentSubmit() }>등록</button>
                            </div>
                        </div>

                        <h3 className={ H_styles.comment }>댓글 { commentTotal }개</h3>
                            {
                                commentList.map((item, index) => 
                                    <div className={ H_styles.commentList }>
                                        <p>{ item.id }
                                            { commentDTO && window.sessionStorage.getItem('userDTO') 
                                                         && JSON.parse(window.sessionStorage.getItem('userDTO')).id === item.id && (                
                                                <div>
                                                    <button className={ H_styles.commentDel } onClick={ () => onCommentDelete(item.commentSeq) }>삭제</button>
                                                </div>
                                            )}
                                        </p>
                                        <p>{ item.content }</p>
                                        <p>{ getToday(item.logTime) }</p>
                                    </div> 
                            )}
                                                 
                        { loading && <h2 style={{textAlign:'center'}}>로딩중</h2>}
                        <br/>
                    
                </div>}
            </div>

            { modal && <div>
                <div className={ H_styles.bgImg } onClick={ () => setModal(false)}/>
                <img className={ H_styles.onImg } src={ modalImg } alt='사진'/>
            </div>
            }

         
        </div>
    );
};


export default HealthView;