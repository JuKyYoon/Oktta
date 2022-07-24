package com.ssafy.backend.model.entity;

public enum UserRole {
    // ROLE_ADMIN, ROLE_USER는 코드
    // 괄호 안에 있는 건 Title
    ROLE_ADMIN("ROLE_ADMIN"),
    ROLE_USER("ROLE_USER"),
    ROLE_GUEST("ROLE_GUEST");

    private final String role;

    UserRole(String role) {
        this.role = role;
    }

    public String getValue() {
        return role;
    }
}
