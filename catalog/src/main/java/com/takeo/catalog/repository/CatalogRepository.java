package com.takeo.catalog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.takeo.catalog.model.Catalog;

@Repository
public interface CatalogRepository extends JpaRepository<Catalog, Integer> {

}
