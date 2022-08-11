package com.ssafy.backend.model.entity;

import com.ssafy.backend.util.SnsType;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

public class UserPrincipal implements OAuth2User, UserDetails, OidcUser {
    private final String userId;
    private final String password;
    private final ProviderType providerType;
    private final UserRole role;
    private final Collection<GrantedAuthority> authorities;
    private Map<String, Object> attributes;

    public UserPrincipal(String userId, String password, ProviderType providerType, UserRole role, Collection<GrantedAuthority> authorities) {
        this.userId = userId;
        this.password = password;
        this.providerType = providerType;
        this.role = role;
        this.authorities = authorities;
        this.attributes = attributes;
    }

    public String getUserId() {
        return userId;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public ProviderType getProviderType() {
        return providerType;
    }

    public UserRole getRole() {
        return role;
    }

    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getName() {
        return userId;
    }

    @Override
    public String getUsername() {
        return userId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Map<String, Object> getClaims() {
        return null;
    }

    @Override
    public OidcUserInfo getUserInfo() {
        return null;
    }

    @Override
    public OidcIdToken getIdToken() {
        return null;
    }

    public static UserPrincipal create(User user) {
        return new UserPrincipal(
                user.getId(),
                user.getPassword(),
                SnsType.getSnsType(user.getSnsType()),
                user.getRole(),
                Collections.singletonList(new SimpleGrantedAuthority(user.getRole().getValue()))
        );
    }

    public static UserPrincipal create(User user, Map<String, Object> attributes) {
        UserPrincipal userPrincipal = create(user);
        userPrincipal.setAttributes(attributes);

        return userPrincipal;
    }
}
