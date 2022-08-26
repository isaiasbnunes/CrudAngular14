package net.bragadev.crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import net.bragadev.crud.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

}
