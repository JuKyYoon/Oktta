package com.ssafy.backend.model.dto;

/**
 * 비밀번호 변경 시 사용.
 * @author 유지태
 */
public class PasswordDto {
    String oldPassword;
    String newPassword;

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
