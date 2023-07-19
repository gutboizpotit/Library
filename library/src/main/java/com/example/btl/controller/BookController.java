package com.example.btl.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.btl.entity.Book;

import com.example.btl.repository.BookRepository;
import com.example.btl.service.BookService;

@RestController
@CrossOrigin

public class BookController {

	@Autowired
	private BookService bookService;
	
	@GetMapping("/books")
	public List<Book> getAllBook() {
		return bookService.getAllBook();
	}

	@GetMapping("/books/{id}")
	public Book getOneBook(@PathVariable ("id") int id) {
		return bookService.getOneBook(id);
	}

	@PostMapping("/books/add")
	public Book addBook(@RequestBody Book book) {
		return bookService.addBook(book);
	}

	@PutMapping("/books/update/{id}")
	public Book updateBook(@RequestParam ("id") int id, @RequestBody Book book) {
		return bookService.updateBook(id, book);
	}

	@DeleteMapping("/books/delete/{id}")
	public boolean deleteBook(@PathVariable ("id") int id) {
		return bookService.deleteBook(id);
	}

}