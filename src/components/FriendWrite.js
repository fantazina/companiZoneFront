import React, { useRef, useState } from 'react';
import axios from 'axios';
import camera from '../img/camera.jpg';

const FriendWrite = ({onPage, F_styles, userDTO, isLoggedIn}) => {
    const imgRef = useRef()  //초점 맞춰버려~
    const [writeDTO, setWriteDTO] = useState({
        id : JSON.parse(window.sessionStorage.getItem('userDTO')).id,
        sel : '',
        title : '',
        content : '',
        images : '',
        hit : 0,
        page: 3
    })
    
    const [imgList, setImgList] = useState([])

    const onInput = (e) => {
        const { name, value } = e.target

        setWriteDTO({
            ...writeDTO,
            [name] : value
        })
    }

    const onCamera = () => {
        imgRef.current.click()
    }

    const onImgInput = (e) => {
        const imgFiles = Array.from(e.target.files)
        const imgArray = imgFiles.map(item => URL.createObjectURL(item));
        setImgList(imgArray)
    }

    const onWriteSubmit = (e) => {
        e.preventDefault()

        var sw = 1

        if(!writeDTO.sel) {
            alert('선택해주세요.')

            sw = 0
        }
        else if(!writeDTO.title) {
            alert('제목을 입력하세요.')

            sw = 0
        }
        else if(!writeDTO.content) {
            alert('내용을 입력하세요.')

            sw = 0
        }

        if(sw === 1){ 
            /* 이미지가 있을 경우 이미지 업로드 후 글 업로드 */
            if(imgList.length > 0){
                const formData = new FormData();
                Promise.all(imgList.filter(imgs => !imgs.includes('bitcamp-edu-bucket-97')).map((item, index) => {
                    return fetch(item)
                    .then(response => response.blob())
                    .then(blob => {
                        const file = new File([blob], `image_${index}.png`, { type: 'image/png' });
                        formData.append(`files`, file);
                    });
                }))
                .then(() => {
                    axios.post(`https://port-0-companizoneback-ll53u2blrj4us1b.sel5.cloudtype.app/storage/upload`, formData)
                         .then(res => {
                                const wrDTO = {...writeDTO, images: res.data};
                                axios.post(`https://port-0-companizoneback-ll53u2blrj4us1b.sel5.cloudtype.app/write/write`, wrDTO)
                                     .then(() => {
                                     alert('글 작성이 완료되었습니다.')

                                     onPage(0)

                            }).catch(error => console.log(error))
                        }
                    )
                })
            }

            else{
                    axios.post(`https://port-0-companizoneback-ll53u2blrj4us1b.sel5.cloudtype.app/write/write`, writeDTO)
                         .then(() => {
                          alert('글 작성이 완료되었습니다.')
                          onPage(0)

                    }).catch(error => console.log(error))

                }
        }
    }

    return (
        <div className={ F_styles.write_main }>
            { writeDTO.select }
            <h2 style={{ marginLeft : '20px' }}>글쓰기</h2>
                <div className={ F_styles.content }>
                    <div className={ F_styles.row_box }>
                        <div className={ F_styles.title_sel }>
                            <div className={ F_styles.select_div }>
                                <select name='sel' onChange={ onInput }>
                                    <option value='' selected disabled>선택해주세요.</option>
                                    <option value='고양이'>고양이</option>
                                    <option value='강아지'>강아지</option>
                                    <option value='소/말/돼지'>소/말/돼지</option>
                                    <option value='소동물'>소동물</option>
                                    <option value='조류'>조류</option>
                                    <option value='조류'>조류</option>
                                    <option value='어류'>어류</option>
                                    <option value='파충류'>파충류</option>
                                    <option value='양서류'>양서류</option>
                                    <option value='곤충'>곤충</option>
                                    <option value='식물'>식물</option>
                                    <option value='돌'>돌</option>
                                </select>
                        
                                <div className={ F_styles.title_div }>
                                    <p>제목</p>
                                    <input className={ F_styles.inputbox } type='text' 
                                        value={ writeDTO.title } name='title' onChange={ onInput }/>
                                    <div className={ F_styles.button }>
                                        <button onClick={ onWriteSubmit }>등록</button>
                                        <button onClick={ () => onPage(0) }>뒤로</button>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>

                    <div className={ F_styles.img_div }>
                        <span>
                            {
                                // 선택한 이미지를 미리보기
                                imgList.map((item, index) => <img key={ index } 
                                                                    src={ item } 
                                                                    style={{ width: '100px', height: '100px' }} alt='사진' />)
                            }
                        </span>
                        
                        <img id='camera' src={ camera } alt='카메라' onClick={ onCamera } className={ F_styles.img_camera } />
                        <input type='file' name='img[]' multiple='multiple' ref={ imgRef } onChange={ onImgInput } style={{ visibility: 'hidden' }} />
                    </div>

                    <div className={ F_styles.text_img }>
                        <textarea className={ F_styles.textarea } name='content' value={ writeDTO.content } onChange={ onInput }></textarea>
    
                    </div>
            </div>
        </div>
    );
};

export default FriendWrite;