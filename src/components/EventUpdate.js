import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import camera from '../img/camera.jpg';

const EventUpdate = ({E_styles, onPage, seq}) => {

    const imgRef = useRef() //초점 맞추기

    const[writeDTO, setWriteDTO] = useState()

    const[imgList, setImgList] = useState([])

    useEffect(() => {
        axios.get(`https://port-0-companizoneback-ll53u2blrj4us1b.sel5.cloudtype.app/write/getUp/${seq}`)
             .then(res => {
                setWriteDTO({...res.data, images: ''})
                setImgList(res.data.images !== '' ? res.data.images.split(',') : [])

            })
    }, [seq])

    const onInput = (e) => {
        const {name, value} = e.target

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

    const onUpdateSubmit = (e) => {
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
                if(imgList.join(',').includes('bitcamp-edu-bucket-97')) { 
                    const wrDTO = {...writeDTO, images: imgList.join(',')}; //join(',') ,넣어주기
                    axios.put(`https://port-0-companizoneback-ll53u2blrj4us1b.sel5.cloudtype.app/write/update`, wrDTO)
                    .then(() => {
                        alert('글 수정이 완료되었습니다.')
                        onPage(0)

                    }).catch(error => console.log(error))
                } 
                else {
                const formData = new FormData();

                Promise.all(imgList.map((item, index) => {
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
                                axios.put(`https://port-0-companizoneback-ll53u2blrj4us1b.sel5.cloudtype.app/write/update`, wrDTO)
                                    .then(() => {
                                    alert('글 수정이 완료되었습니다.')
                                    onPage(0)

                            }).catch(error => console.log(error))
                        }
                    )
                })
            }}
            else{
                    axios.put(`https://port-0-companizoneback-ll53u2blrj4us1b.sel5.cloudtype.app/write/update`, writeDTO)
                         .then(() => {
                         alert('글 수정이 완료되었습니다.')
                         onPage(0)

                    }).catch(error => console.log(error))
            }
        }
    }

    return (
        <div>
            {writeDTO && <div>
            <h2 style={{ marginLeft : '20px' }}>글수정</h2>
                <div className={ E_styles.content }>
                    <div className={ E_styles.row_box }>
                        <div className={ E_styles.title_sel }>
                            <div className={ E_styles.select_div }>
                                <select name='sel' value={writeDTO.sel} onChange={ onInput }>
                                    <option value={writeDTO.sel} selected disabled>{writeDTO.sel}</option>
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
                        
                                <div className={ E_styles.title_div }>
                                    <p>제목</p>
                                    <input className={ E_styles.inputbox } type='text' 
                                        value={writeDTO.title} name='title' onChange={ onInput }/>
                                    <div className={ E_styles.button }>
                                        <button onClick={ onUpdateSubmit }>등록</button>
                                        <button onClick={ () => onPage(1) }>뒤로</button>
                                    </div>
                                </div>
                            </div>
                        </div>  
                        
                        <div className={ E_styles.img_div }>
                            <span>
                                {
                                    // 선택한 이미지를 미리보기
                                    imgList.map((item, index) => <img key={ index } 
                                                                        src={ item } 
                                                                        style={{ width: '100px', height: '100px' }} alt='사진' />)
                                }
                            </span>

                            <img id='camera' src={ camera } alt='카메라' onClick={ onCamera } style={{ float : 'right', width: 100, height:100, borderRadius:20 }} />
                            <input type='file' name='img[]' multiple='multiple' ref={ imgRef } onChange={ onImgInput } style={{ visibility: 'hidden' }} />
                        
                        </div>
                    </div>

                    <div className={ E_styles.text_img }>
                        <textarea className={ E_styles.textarea } name='content' value={ writeDTO.content } onChange={ onInput }></textarea>
                    </div>
            </div>
            </div>}
        </div>
    );
};

export default EventUpdate;