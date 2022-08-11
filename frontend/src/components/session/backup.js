<div id="main-session">
  <div className={leftDrawerOpen ? "user-div-show" : "user-div"}>
    <List>
      {participants.map((user, index) => (
        <ListItem key={user.connectionId} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={user.nickname} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </div>

  <div id="video-div">
    <div id="video-container">
      <video autoPlay loop>
        <source src="/flower.webm" type="video/webm" />
        Sorry, your browser doesn't support embedded videos.
      </video>
    </div>

    <div id="session-button-div">
      <span id="title-div">{title}</span>
      <Button
        className="user-session-button"
        variant="contained"
        onClick={toggleUserList}
      >
        유저 목록 보기
      </Button>
      <Button
        className="user-session-button"
        variant="contained"
        onClick={audioToggle}
      >
        {audioEnabled ? "음소거 하기" : "마이크 켜기"}
      </Button>
      <Button
        className="user-session-button"
        variant="contained"
        onClick={handsUp}
      >
        손들기
      </Button>
      <Button
        className="user-session-button"
        variant="contained"
        onClick={toggleChatList}
      >
        채팅창 보기
      </Button>
      {owner ? (
        <Button
          className="user-session-button"
          variant="contained"
          onClick={screenToggle}
        >
          {videoEnabled ? "화면공유 끄기" : "화면공유 켜기"}
        </Button>
      ) : null}
    </div>
  </div>
  <div id={rightDrawerOpen ? "chat-div" : "chat-div-hidden"}>
    <div id="chatting-list">
      {chat.map((item, index) => (
        <div className={item.me ? "my-chat" : "other-chat"} key={index}>
          <div className="chat-nickname">{item.nickname}</div>
          <div className="chat-content">{item.content}</div>
        </div>
      ))}
    </div>
    <div id="chatting-input">
      <TextField
        id="standard-multiline-static"
        multiline
        style={{ margin: "0", width: "100%" }}
        margin="none"
        rows={2}
        placeholder="chatting"
        value={inputMessage}
        onChange={onChangeMessage}
        variant="standard"
      />
      <Button variant="contained" onClick={sendMessage}>
        보내기
      </Button>
      <Button variant="contained">채팅창 띄우기</Button>
    </div>
  </div>
</d>;
