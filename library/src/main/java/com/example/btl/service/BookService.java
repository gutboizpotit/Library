package com.example.btl.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.btl.entity.Book;
import com.example.btl.repository.BookRepository;

@Service
public class BookService {

	@Autowired
	private BookRepository bookRepository;

	public Book addBook(Book book) {
		if (book != null) {
			bookRepository.save(book);
		}
		return null;
	}

	public Book updateBook(Integer id, Book book) {
		if (book != null) {
			Book book1 = bookRepository.findById(id).orElse(null);
			if (book1 != null) {
				book1.setTitle(book.getTitle());
				book1.setAuthor(book.getAuthor());
				book1.setDes(book.getDes());
				book1.setDate(book.getDate());
				book1.setPage(book.getPage());
				book1.setCategory(book.getCategory());
				book1.setSold(book.getSold());
				book1.setCover(book.getCover());

				return bookRepository.save(book1);
			}
			return null;
		}
		return null;
	}

	public boolean deleteBook(int id) {
		if (id > 0) {
			Book book = bookRepository.findById(id).orElse(null);
			if (book != null) {
				bookRepository.delete(book);
				return true;
			}
		}
		return false;
	}

	public List<Book> getAllBook() {
		return bookRepository.findAll();
	}

	public Book getOneBook(int id) {
		return bookRepository.findById(id).orElse(null);
	}
}
