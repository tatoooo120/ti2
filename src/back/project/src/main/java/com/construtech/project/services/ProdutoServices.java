package com.construtech.project.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.construtech.project.repositories.ProdutoRepositorio;
import com.construtech.project.models.Produtos;

import java.util.List;

@Service
public class ProdutoServices {
    private final ProdutoRepositorio produto_Repositorio;

    @Autowired
    public ProdutoServices(ProdutoRepositorio produto_Repositorio) {
        this.produto_Repositorio = produto_Repositorio;
    }

    public List<Produtos> listarProdutos() {
        return produto_Repositorio.findAll();
    }

    public Produtos salvar(Produtos produto) {
        return produto_Repositorio.save(produto);
    }

    public Produtos inserir(Long id, Produtos inserirProduto) {
        if (produto_Repositorio.existsById(id)) {
            inserirProduto.setId(id);
            return produto_Repositorio.save(inserirProduto);
        }
        return null;
    }

    public void deletar(Long id) {
        produto_Repositorio.deleteById(id);
    }

    public Produtos getProductById(Long id) {
        return produto_Repositorio.findById(id).orElse(null);
    }

    public Produtos obterProdutoPorId(Long id) {
        return null;
    }

    public Produtos atualizarProduto(Long id, Produtos produtoAtualizado) {
        return null;
    }

    public void deletarProduto(Long id) {
    }
}
