import React, {useEffect, useState} from "react";
import {useParams,Link,useNavigate} from "react-router-dom";
import { Button, Alert } from 'react-bootstrap';
import './../css/Book.css'

function Book(props){
    const params = useParams();
    const [book, setBook] = useState({});
    const id = params.id || -1 ;
    const navigate = useNavigate()
    const [isEditing, setIsEditing] = useState(false);
    const [upload , setUpload] = useState()
    const [isError , setIsError] = useState(false)

    const handleUpload = (e) => {
        const file = e.target.files[0]
        const coverName = "img/" + file.name
        file.preview = URL.createObjectURL(file)
        setUpload(file)
        console.log(coverName)
        setBook({
            ...book,
            cover: coverName
        })
        console.log(book)
    }
    const handleAddBook = async (event) => {
        event.preventDefault();
        console.log(book)
        fetch(`http://localhost:8080/books/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(book),
                })
                .then(response => {
                    if(response.ok){
                        console.log("Thêm dữ liệu thành công!");
                        navigate('/books')
                        setIsEditing(false)
                    }
                });
    }

    const handleUpdateBook = async (event) => {
        // event.preventDefault();
        // if( !book.title || !book.author || !book.des || !book.date || !book.page || !book.category || !book.cover){
        //     setIsError(true)
        // }
        // else{
        //     setIsError(false)
        // }
        if(isEditing){
            if (window.confirm("Bạn có chắc chắn muốn cập nhật quyển sách này không?") ){
                fetch(`http://localhost:8080/books/update/`+ id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(book),
                })
                .then(response => {
                    if(response.ok){
                        console.log("Cập nhật dữ liệu thành công!");
                        navigate('/books')
                        setIsEditing(false)
                    }
                });
            }
        } else {
            setIsEditing(true)
            console.log(isEditing)
        }
        
    };
    useEffect(() => {
        fetch(`http://localhost:8080/books/${id}`)
        .then((response) => response.json())
        .then((data) => setBook(data))
        .catch((err) => console.log(err))
    }, [id]);
    //     return(
    //     <div>
    //         <h1 className="h1-book">{id < 0 ? "New Book" : `Book ${id}`}</h1>
    //         Title: {" "}
    //         <br></br>
    //         <input type="text" className="input-title" value={book.title}
    //             onChange = {(e) => setBook({...book, title: e.target.value})}/>
    //         <br />
    //         Author: 
    //         {" "}
    //         <br></br>
    //         <input type="text" className="input-author" value={book.author}
    //             onChange = {(e) => setBook({...book, author: e.target.value})}/>
    //         <br />
    //         Describe: {" "}
    //         <br></br>
    //         <input type="text" className="input-des" value={book.des}
    //             onChange = {(e) => setBook({...book, des: e.target.value})}/>
    //         <br />
    //         Date: {" "}
    //         <br></br>
    //         <input type="text" className="input-date" value={book.date}
    //             onChange = {(e) => setBook({...book, date: e.target.value})}/>
    //         <br />
    //         Page: {" "}
    //         <br></br>
    //         <input type="text" className="input-page" value={book.page}
    //             onChange = {(e) => setBook({...book, page: e.target.value})}/>
    //         <br />
    //         Category: {" "}
    //         <br></br>
    //         <input type="text" className="input-cate" value={book.category}
    //             onChange = {(e) => setBook({...book, category: e.target.value})}/>
    //         <br />
    //         Upload: {" "}
    //         <br></br>
    //         <input type = "file" className="input-upload" 
    //             onChange = {handleUpload}/>
    //         { upload && (
    //                <img src={upload.preview} alt ="" width="30%"
    //                height="30%" ></img> 
    //         )
    //         }
    //         <br />
    //         { id < 0 ? (
    //             <button className="btn-check" onClick={handleAddBook}>Add</button>
    //             ) :  isEditing ? (
    //                 <button className="btn-check" onClick={handleUpdateBook}>Save</button>
    //             ) : (
    //                 <a className="btn-check" onClick={handleUpdateBook}>
    //                 Edit
    //             </a>
    //             )
    //         }
    //     </div>
    // )

    return (
        <div>
            <h1 className="h1-book">{id < 0 ? "Sách" : `Book ${id}`}</h1>
                <div className="form">
                    <div className="form-left">
                        <div className="form-1">
                            <div className="form-group">
                                <label className="lb-title">Tiêu đề</label>
                                    <br />
                                    <input
                                    type="text"
                                    className="input-title"
                                    value={book.title}
                                    disabled={!isEditing && id > 0  }
                                    onChange={(e) => setBook({ ...book, title: e.target.value })}
                                    />
                            </div>
                            <div className="form-group">
                                <label className="lb-author">Tác giả</label>
                                    <br />
                                    <input
                                    type="text"
                                    className="input-author"
                                    value={book.author}
                                    disabled={!isEditing && id > 0  }
                                    onChange={(e) => setBook({ ...book, author: e.target.value })}
                                    />
                            </div>
                            </div>
                            <div className="form-des">
                                <label className="lb-des">Mô tả về sách</label>
                                    <br />
                                    <input
                                    type="text"
                                    className="input-des"
                                    value={book.des}
                                    disabled={!isEditing && id > 0  }
                                    onChange={(e) => setBook({ ...book, des: e.target.value })}
                                    />
                            </div>
                        <div className="form-2">
                            <div className="form-group">
                                <label className="lb-date">Ngày phát hành</label>
                                    <br />
                                    <input
                                    type="date"
                                    className="input-date"
                                    value={book.date}
                                    disabled={!isEditing && id > 0  }
                                    onChange={(e) => setBook({ ...book, date: e.target.value })}
                                    />
                            </div>
                            <div className="form-group">
                                <label className="lb-page">Số trang</label>
                                    <br />
                                    <input
                                    type="text"
                                    lassName="input-page"
                                    value={book.page}
                                    disabled={!isEditing && id > 0  }
                                    onChange={(e) => setBook({ ...book, page: e.target.value })}
                                    />
                            </div>
                        </div>
                            <div className="form-cate">
                                <label className="lb-cate">Thể loại</label>
                                    <br />
                                    <select
                                    type="text"
                                    className="input-cate"
                                    value={book.category}
                                    disabled={!isEditing && id > 0  }
                                    onChange={(e) => setBook({ ...book, category: e.target.value })}
                                    >
                                        <option>Truyện ngắn</option>
                                        <option>Tiểu thuyết</option>
                                        <option>Truyện cười</option>
                                        <option>Thơ</option>
                                    </select>
                            </div>
                    </div>
                    <div className="form-right">

                            <label htmlFor='img' className="btn btn-danger btn-upload">Upload</label>
                            <input
                            id='img'
                            type="file"
                            onChange={handleUpload}
                            hidden
                            disabled={!isEditing && id > 0}
                            />
                            <img className="img-upload" height="30%" src={ upload && upload.preview ? upload.preview : `${process.env.PUBLIC_URL}/${book.cover}`} /> 
                        
                    </div>
          </div>
            {isError && <Alert variant="danger">Không được để trống các trường</Alert>}
            { id < 0 ? (
                <button className="btn btn-succes btn-check" onClick={handleAddBook}>Add</button>
                ) :  isEditing ? (
                    <button className="btn btn-succes btn-check" onClick={handleUpdateBook}>Save</button>
                ) : (
                    <a className="btn btn-succes btn-check" onClick={handleUpdateBook}>
                    Edit
                </a>
                )
            }
        </div>
    )
};
export default Book;
