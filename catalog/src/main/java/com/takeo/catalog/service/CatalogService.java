package com.takeo.catalog.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.takeo.catalog.model.Catalog;
import com.takeo.catalog.repository.CatalogRepository;

@Service
public class CatalogService {

    private CatalogRepository catalogRepository;

    @Autowired
    public CatalogService(CatalogRepository catalogRepository) {
        this.catalogRepository = catalogRepository;
    }

    public List<Catalog> getAllCatalog() {
        return catalogRepository.findAll();
    }

    public Object postCatalog(Catalog catalog) {
        return catalogRepository.save(catalog);
    }

	public void deleteCatalog(Integer id) {
		 catalogRepository.deleteById(id);
	}
	
    public Catalog updatedCatalog(Integer id, Catalog updatedCatlog) {
        Catalog existinCatalog = catalogRepository.findById(id).orElse(null);
        if (existinCatalog != null) {
            existinCatalog.setFeature(updatedCatlog.getFeature());
			existinCatalog.setPlan(updatedCatlog.getPlan());
            existinCatalog.setProduct(updatedCatlog.getProduct());

            return catalogRepository.save(existinCatalog);
        }

        return null;

    }

	public Catalog getCatalogById(Integer id) {
		return catalogRepository.findById(id).orElse(null);
		
	}



}
