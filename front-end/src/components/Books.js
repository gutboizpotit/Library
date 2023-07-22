import React, { useEffect, useState } from "react";
import './../css/Bookscss.css'

function Books() {
	const [data, setData] = useState([]);
	const [books, setBooks] = useState([]);
	const [text, setText] = useState("");

	const handleDelete = (id) => {
		if (window.confirm("Bạn có chắc chắn muốn xóa quyển sách này không?")){
			fetch(`http://localhost:8080/books/delete/`+ id, {
				method: "DELETE" ,
			}
			)
			.then(response => {
				if (response.ok) {
			  		console.log("Xóa dữ liệu thành công");
					window.location.reload();
				} else {
			  		console.log("Xóa dữ liệu thất bại");
				}
		  	})
		.catch(error => console.log(error));
		}
	}

	useEffect(() => {
		fetch("http://localhost:8080/books")
			.then((resp) => resp.json())
			.then((data) => setData(data))
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		setBooks(data);
	}, [data]);

	useEffect(() => {
		setBooks(
			data.filter(
				(book) =>
					book.title.toLowerCase().includes(text.toLowerCase()) ||
					book.author.toLowerCase().includes(text.toLowerCase())
			)
		);
	}, [text]);

	console.log(text);


	// const handleDelete = async (id) => {
	// 	fetch(`http://localhost:8080/books/${id}`, {
	// 		method: "DELETE",
	// 		headers: {
	// 		  "Content-Type": "application/json"
	// 		}
	// 	  })
	// 	  .then(response => {
	// 	if (response.ok) {
	// 	  console.log("Xóa dữ liệu thành công");
	// 	} else {
	// 	  console.log("Xóa dữ liệu thất bại");
	// 	}
	//   })
	// }

	return (
		<div className="container-books">
			<div className="row-books">
				<h1 className="list-books">List Books</h1>
				<div>
					<label className="search-lable-books">Search:</label>
					<input
						type="text"
						id="searchInput"
						className="search-input-books"
						onChange={(e) => {
							setText(e.target.value);
						}}
					/>
				</div>

			</div>
			<table className="table-books">
				<thead className="table-dark-books">
					<tr className="tr-books">
						<th>Id</th>
						<th>Title</th>
						<th>Author</th>
						<th>Category</th>
						<th>Describe</th>
						<th>Date</th>
						<th>Page</th>
						<th>Action</th>
					</tr>
				</thead>

				<tbody>
					{books.map((book) => (
						<tr key={book.id}>
							<td>{book.id}</td>
							<td>{book.title}</td>
							<td>{book.author}</td>
							<td>{book.category}</td>
							<td>{book.des}</td>
							<td>{book.date}</td>
							<td>{book.page}</td>
							<td>
								<a href={`/books/${book.id}`} className="btn btn-success">View</a>
                                <a  className="btn btn-danger" onClick={ () => handleDelete(book.id) } >Delete</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<a href={`/books/-1`} className="btn btn-success">
				New Book
			</a>


		</div>
	);
}
export default Books