package com.takeo.catalog.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.takeo.catalog.model.Catalog;
import com.takeo.catalog.service.CatalogService;

@RestController
@RequestMapping("/api/catalog")
public class CatalogController {

    private CatalogService catalogService;

    @Autowired
    public CatalogController(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

	@CrossOrigin(origins="*",allowedHeaders= {"Content-Type"})
    @GetMapping("/catalog")
    public List<Catalog> getCatalog() {
        return catalogService.getAllCatalog();

    }
	
	@CrossOrigin(origins="*",allowedHeaders= {"Content-Type"})
    @PostMapping("/catalog")
    public String postCatalog(@RequestBody Catalog catalog) {
        catalogService.postCatalog(catalog);
        return "Catalog Created";
    }
	
	@CrossOrigin(origins="*",allowedHeaders= {"Content-Type"})
    @DeleteMapping("/catalog/{id}")
    public String deleteCatalog(@PathVariable("id") Integer id) {
        catalogService.deleteCatalog(id);
        return "Deleted";
    }

	@CrossOrigin(origins="*",allowedHeaders= {"Content-Type"})
    @GetMapping("/catalog/{id}")
    public Catalog getCatalogById(@PathVariable("id") Integer id) {
		return catalogService.getCatalogById(id);
    }
	
	@CrossOrigin(origins="*",allowedHeaders= {"Content-Type"})
    @PutMapping("/catalog/{id}")
    public String putCatalog(@PathVariable("id") Integer id, @RequestBody Catalog updatedCatlog) {
        catalogService.updatedCatalog(id, updatedCatlog);
        return "Updated Catlog with ID:" + id;
    }

}
