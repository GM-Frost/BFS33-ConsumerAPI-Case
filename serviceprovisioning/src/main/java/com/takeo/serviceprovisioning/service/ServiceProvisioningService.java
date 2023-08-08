package com.takeo.serviceprovisioning.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.takeo.serviceprovisioning.model.ServiceProvisioning;
import com.takeo.serviceprovisioning.repository.ServiceProvisioningRepository;

@Service
public class ServiceProvisioningService {

    @Autowired
    private ServiceProvisioningRepository repository;

    public ServiceProvisioningService(ServiceProvisioningRepository repository) {
        this.repository = repository;
    }

    public void addProvision(ServiceProvisioning provision) {
        repository.save(provision);

    }

    public List<ServiceProvisioning> testService() {
        return repository.findAll();

    }

    public ServiceProvisioning disableConnection(Long id) {
        ServiceProvisioning updatedConnection = repository.findById(id).orElse(null);
        updatedConnection.setStatus("disable");
        repository.save(updatedConnection);

        return updatedConnection;

    }

    public ServiceProvisioning holdConnection(Long id) {
        ServiceProvisioning updatedConnection = repository.findById(id).orElse(null);
        updatedConnection.setStatus("hold");
        repository.save(updatedConnection);
        return updatedConnection;
    }

    public ServiceProvisioning resumeConnection(Long id) {
        ServiceProvisioning updatedConnection = repository.findById(id).orElse(null);
        updatedConnection.setStatus("resume");
        repository.save(updatedConnection);
        return updatedConnection;
    }

}
