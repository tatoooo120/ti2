package com.construtech.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.construtech.project.models.Produtos;

public interface ProdutoRepositorio extends JpaRepository<Produtos, Long> {

}
