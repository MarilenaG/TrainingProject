package com.training.fullstack.auth;

import com.training.fullstack.users.model.ApplicationMember;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotNull;

import java.util.Arrays;

import static com.training.fullstack.auth.Constants.HEADER_STRING;
import static com.training.fullstack.auth.Constants.TOKEN_PREFIX;

@RestController
public class LoginController {

    @Autowired UserPrincipalService userPrincipalService;


    @PostMapping("/login")
    public ResponseEntity<UserPrincipalRepresentation> login(@RequestBody @NotNull ApplicationMember userToConnect ) {

        ApplicationMember appMember =  userPrincipalService.loadAppMember(userToConnect.getUserName()) ;
//todo verify password

        String token = JwtTokenUtil.generateToken( new UserPrincipal(appMember));
//        System.out.println("generated JWT token for " + HEADER_STRING + ":" + TOKEN_PREFIX +"[token_value], where token_value is" + token);

        UserPrincipalRepresentation representation = UserPrincipalRepresentation.fromUserPrincipal(appMember);
        representation.setJwtHeader(token);


        return ResponseEntity.ok(representation);



    }
}
