package com.ssafy.backend;

import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.repository.UserRepository;
import com.ssafy.backend.service.MailService;
import com.ssafy.backend.service.UserService;
import com.ssafy.backend.service.UserServiceImpl;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.junit.jupiter.api.extension.ExtendWith;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;


import java.sql.SQLException;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@ExtendWith(SpringExtension.class)
@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class UserTests {

//    @Autowired
//    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private MailService mailService;

//    @AfterAll
//    public void cleanup(){
//        userRepository.deleteAllInBatch();
//    }
//    @Test
    public void getUserInfo() throws SQLException {
        assertNotNull(userService);
        User user = userService.findUser("testuser");

    }

    @Test
    public void sendAuthMail() throws Exception {
        mailService.sendAuthMail("engks4619@naver.com");
    }
}
