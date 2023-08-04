package com.takeo.serviceprovisioning.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.takeo.serviceprovisioning.model.ServiceProvisioning;

@Repository
public interface ServiceProvisioningRepository extends JpaRepository<ServiceProvisioning, Long> {

}
