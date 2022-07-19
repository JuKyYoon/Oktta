package com.ssafy.backend;

import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.repository.UserRepository;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@ExtendWith(SpringExtension.class)
@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class BackendApplicationTests {

    @Autowired
    private UserRepository userRepository;

    @AfterAll
    public void cleanup() {
        // 삭제 왜 안됄까
        userRepository.deleteAllInBatch();
    }

    @Test
    @Order(1)
    public void insertUser() {
            // 연결된 MySQL에 들어감
            userRepository.save(
                    new User.Builder("testuser", "myname", "1234").build()
            );

            List<User> userList = userRepository.findAll();
            User user = userList.get(0);
            assertThat(user.getId(), is("testuser"));
            assertThat(user.getNickname(), is("myname"));
            assertThat(user.getPassword(), is("1234"));
    }


    @Test
    @Order(2)
    public void updateUser() {
        String id = "testuser";
        User user = userRepository.findById(id);

        assertNotNull(user);

        if(user != null) {
            // 값 변경
            user.updateInfo("newname");
            userRepository.save(user);

            List<User> userList = userRepository.findAll();
            user = userList.get(0);
            assertThat(user.getId(), is("testuser"));
        }

    }
}
