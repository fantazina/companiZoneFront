import React, { useRef, useState } from 'react';
import Upstyles from '../css/UploadForm.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const UploadForm = () => {
    
    const imgRef = useRef()
    const [ userUploadDTO, setUserUploadDTO ] = useState({
        imageName : '',
        imageContent : '',
        imageFileName : '',
        imageOriginalName : '',
        
    });
    
    const { imageName, imageContent, imageFileName, imageOriginalName } = userUploadDTO
    
    const [imgList, setImgList] = useState([])
    const [files, setFiles] = useState('')

    const navigate = useNavigate()

    const [file, setFile] = useState('')

    const onInput = (e) => {
        const { name, value } = e.target

        setUserUploadDTO({
            ...userUploadDTO, //복사뜨고
            [name] : value  //수정띠
        })
    }
    
    const onCamera = () => {
        imgRef.current.click()
    }

    const onImgInput = (e) => {
        const imgFiles = Array.from(e.target.files)

        var imgArray = []

        imgFiles.map = (item => {
            const objectURL = URL.createObjectURL(item)
            imgArray.push(objectURL)
        })
        setImgList(imgArray)  //카메라 아이콘 누르면 이미지 미리보기 용도  //보는 용도
        setFiles(e.target.files)  //formData에 넣어서 스프링부트 서버로 보내겠다잉 //보이기 용도

        }

        const onUploadSubmit = (e) => {
            e.preventDefault()
    
            var formData = new FormData()
    
            formData.append('userUploadDTO', new Blob([JSON.stringify(userUploadDTO)], { type : 'application/json' })) //바이트 단위로 현재 값 분해  // ( 변수, 값 )
        
            Object.values(files).map((item, index) => {
                formData.append('img', item)
    
            })
    
            axios.post('/user/upload', formData, {
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            .then(alert('이미지 업로드 완료'))
            .catch(error => console.log(error))
    
            navigate('/user/uploadList')
        }

        const onReset = (e) => {
            e.preventDefault()
    
            setUserUploadDTO({
                imageName : '',
                imageContent : '',
                imageFileName : '',
                imageOriginalName : '',
                
            })
            setImgList([])
    
            imgRef.current.value = ''
    }
    
    return (
        <div className={ Upstyles.container }>
            <h2>글쓰기</h2>

            <div className={ Upstyles.content }>
                <div className={ Upstyles.row_box }>
                    <div className={ Upstyles.title_sel }>
                        <div className={ Upstyles.select_div }>
                            <select>
                                <option>어쩌구</option>
                                <option>저쩌구</option>
                                <option>고양이</option>
                                <option>강아지</option>
                                <option>트리케라톱스</option>
                                <option>스테고사우루스</option>
                                <option>브라키오사우루스</option>
                            </select>
                    
                            <div className={ Upstyles.title_div }>
                                <p>제목</p>
                                <input className={ Upstyles.inputbox } type='text' />
                                <div className={ Upstyles.button }><button>등록</button></div>
                            </div>
                        </div> 
                    </div>
                </div>
                <div className={ Upstyles.text_img }>
                    <textarea className={ Upstyles.textarea } ></textarea>
                    
                    <div className={ Upstyles.img_div }>
                        
                    </div>
                </div>
            </div>

        </div>
                
    );
};

export default UploadForm;