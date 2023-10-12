package com.construtech.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.construtech.project.services.ProdutoServices;
import com.construtech.project.models.Produtos;

import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoServices produtoServices;

    @Autowired
    public ProdutoController(ProdutoServices produtoServices) {
        this.produtoServices = produtoServices;
    }

    @GetMapping
    public List<Produtos> listarProdutos() {
        return produtoServices.listarProdutos();
    }

    @GetMapping("/{id}")
    public Produtos obterProdutoPorId(@PathVariable Long id) {
        return produtoServices.obterProdutoPorId(id);
    }

    @PostMapping
    public Produtos criarProduto(@RequestBody Produtos produto) {
        return produtoServices.salvar(produto);
    }

    @PutMapping("/{id}")
    public Produtos atualizarProduto(@PathVariable Long id, @RequestBody Produtos produtoAtualizado) {
        return produtoServices.atualizarProduto(id, produtoAtualizado);
    }

    @DeleteMapping("/{id}")
    public void deletarProduto(@PathVariable Long id) {
        produtoServices.deletarProduto(id);
    }
}
