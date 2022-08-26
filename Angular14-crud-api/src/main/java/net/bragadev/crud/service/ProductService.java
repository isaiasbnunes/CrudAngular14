package net.bragadev.crud.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.bragadev.crud.model.Product;
import net.bragadev.crud.repository.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository repository;
	
	public List<Product> findAll(){
		return repository.findAll();
	}
	
	public Product save(Product p) {
		return repository.save(p);
	}
	
	public Optional<Product>  findById(Long id) {
		return repository.findById(id);
	}
	
	public Product edit(Long id, Product p) {
		p.setId(id);
		System.out.println(">>>> name  "+p.getProductName());
		return repository.save(p);
	}
	
	public void delete(Long id) {
		Optional<Product> p = findById(id);
		 if(p.isPresent()) {
			 repository.delete(p.get());
		 }
	}
	
}
