package com.takeo.serviceprovisioning.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.takeo.serviceprovisioning.model.ServiceProvisioning;
import com.takeo.serviceprovisioning.service.ServiceProvisioningService;

// POST /api/service/provision, POST /api/service/test-qos, PUT /api/service/disable/{connectionId}, PUT /api/service/hold/{connectionId}, PUT /api/service/resume/{connectionId}

@RestController
@RequestMapping("/api/service")
public class ServiceProvisioningController {

    @Autowired
    private ServiceProvisioningService service;

    ServiceProvisioningController(ServiceProvisioningService service) {
        this.service = service;
    }

    @GetMapping("/")
    public String test() {
        return "Hello";
    }

    @PostMapping("/provision")
    public String addProvision(@RequestBody ServiceProvisioning provision) {
        service.addProvision(provision);

        return "Added service provision";

    }

    @GetMapping("/test-qos")
    public List<ServiceProvisioning> qosTest() {
        return service.testService();
    }

    @PutMapping("/disable/{connectionId}")
    public String disableConnection(@PathVariable("connectionId") Long id) {
        service.disableConnection(id);
        return "connecttion disabled";
    }

    @PutMapping("/hold/{connectionId}")
    public String holdConnection(@PathVariable("connectionId") Long id) {
        service.holdConnection(id);
        return "connecttion hold";
    }

    @PutMapping("/resume/{connectionId}")
    public String resumeConnection(@PathVariable("connectionId") Long id) {
        service.resumeConnection(id);
        return "connecttion resumed";
    }

}
