package com.ssafy.backend;

import com.ssafy.backend.model.entity.User;
import com.ssafy.backend.model.repository.UserRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;

@RunWith(SpringRunner.class)
@SpringBootTest
class BackendApplicationTests {

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    public void cleanup() {
        // 삭제 왜 안됄까
        userRepository.deleteAllInBatch();
    }

    @Test
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

}
