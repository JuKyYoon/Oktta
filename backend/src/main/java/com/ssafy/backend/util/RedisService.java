package com.ssafy.backend.util;

import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Service
public class RedisService {

    private final RedisTemplate<String, String> redisTemplate;

    public RedisService(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    /**
     * Set String Type
     * @param key
     * @param data
     */
    public void setValue(String key, String data) {
        ValueOperations<String, String> operations = redisTemplate.opsForValue();
        operations.set(key, data);
    }

    /**
     * Get String Type
     * @param key
     */
    public String getStringValue(String key) {
        ValueOperations<String, String> operations = redisTemplate.opsForValue();
        return operations.get(key);
    }

    /**
     * Set Set Type
     * @param key
     * @param data
     */
    public void setValue(String key, String[] data) {
        SetOperations<String, String> operations = redisTemplate.opsForSet();
        for (String datum : data) {
            operations.add(key, datum);
        }
    }

    /**
     * Get Set Type
     * @param key
     * @return
     */
    public Set<String> getSetValue(String key) {
        SetOperations<String, String> operations = redisTemplate.opsForSet();
        return operations.members(key);
    }

    /**
     * Set Hash Type
     * @param key
     * @param obj1 Hash Key
     * @param obj2 Hash Value
     */
    public void setValue(String key, Object obj1, Object obj2) {
        HashOperations<String, Object, Object> operations = redisTemplate.opsForHash();
        operations.put(key, obj1, obj2);
    }

    /**
     * Get Hash Type
     * @param key
     * @param hash
     * @return
     */
    public Object getHashValue(String key, String hash) {
        HashOperations<String, Object, Object> operations = redisTemplate.opsForHash();
        return operations.get(key, hash);
    }

    /**
     * Set String Value And Expire Time
     * @param key user.id
     * @param token refreshToken
     * @param expireDate expire date
     */
    public void setStringValueAndExpire(String key, String token, long expireDate) {
        ValueOperations<String, String> operations = redisTemplate.opsForValue();
        operations.set(key, token, expireDate, TimeUnit.MILLISECONDS);
    }

    /**
     * Delete Value With Key from Redis
     * @param key
     */
    public void deleteKey(String key) {
        redisTemplate.delete(key);
//        if(redisTemplate.opsForValue().get(key) != null){
//            redisTemplate.delete(key);
//        }
    }

    /**
     * Delete Hash
     * @param hashKey
     * @param key
     */
    public void deleteKey(String hashKey, String key) {
        redisTemplate.opsForHash().delete(hashKey, key);
    }

    /**
     * Set Token BlackList to Redis
     * @param token
     * @param value
     * @param expireTime
     */
    public void setTokenBlackList(String token, String value, long expireTime) {
        ValueOperations<String, String> operations = redisTemplate.opsForValue();
        operations.set(token, value, expireTime, TimeUnit.MILLISECONDS);
    }
}
