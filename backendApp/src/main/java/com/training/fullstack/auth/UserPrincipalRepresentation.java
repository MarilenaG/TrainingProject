package com.training.fullstack.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.training.fullstack.users.model.ApplicationMember;

public class UserPrincipalRepresentation {
    @JsonProperty
    private String userName;
    @JsonProperty
    private String id;
    @JsonProperty
    private String userType ;
    @JsonProperty
    private String jwtHeader;

    public void setJwtHeader(String jwtHeader) {
        this.jwtHeader = jwtHeader;
    }

    public static UserPrincipalRepresentation fromUserPrincipal(ApplicationMember userPrincipal){
        UserPrincipalRepresentation representation = new UserPrincipalRepresentation();
        representation.userName = userPrincipal.getUserName();
        representation.id = userPrincipal.getId().toString();
        representation.userType = userPrincipal.getUserType().name();
        return representation;
    }

}
