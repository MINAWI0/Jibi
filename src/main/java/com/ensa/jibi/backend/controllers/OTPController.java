package com.ensa.jibi.backend.controllers;

import com.ensa.jibi.backend.domain.dto.sms.OTPTokenDto;
import com.ensa.jibi.backend.domain.entities.sms.SMS;
import com.ensa.jibi.backend.services.OTPService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sms")
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")

public class OTPController {
    @Autowired
    OTPService OTPService;


    @GetMapping
    public String getSMS(){
        return "Hello World";
    }
    @PostMapping
    public String postOTP(@RequestBody SMS sendRequest){
//        log.info("Sending OTP: " + sendRequest.toString());
        return OTPService.sendOTP(sendRequest.getDestinationSMSNumber());
    }
    @PostMapping("/verify")
    public boolean verifyOTP(@RequestBody OTPTokenDto otpToken){
//        log.info("Verifying SMS: " + verifyRequest.toString());
        return OTPService.verifyOTP(otpToken);
    }
}
