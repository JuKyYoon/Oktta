package com.ssafy.backend.model.dto;

/**
 * sessionCreated
 * sessionDestroyed
 * participantJoined
 * participantLeft
 * webrtcConnectionCreated
 * webrtcConnectionDestroyed
 * recordingStatusChanged
 * filterEventDispatched
 */
public class SessionEventDto {
    // Session
    private String sessionId;
    private long timestamp;
    private long startTime;
    private long duration;
    private String reason;

    // participant
    private String connectionId;
    private String location;
    private String ip;
    private String platform;
    private String clientData;
    private String serverData;

    // webrtcConnection
    private boolean audioEnabled;
    private boolean videoEnabled;
    private String streamId;
    private String connection;
    private String receivingFrom;
    private String videoSource;
    private int videoFramerate;
    private String videoDimensions;

    // recordings
    private String id;
    private String name;
    private String outputMode;
    private String resolution;
    private String recordingLayout;
    private boolean hasAudio;
    private boolean hasVideo;
    private int size;
    private String status;

    //filter Event
    private String data;
    private String eventType;
    private String filterType;

    public SessionEventDto() {
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public long getStartTime() {
        return startTime;
    }

    public void setStartTime(long startTime) {
        this.startTime = startTime;
    }

    public long getDuration() {
        return duration;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getConnectionId() {
        return connectionId;
    }

    public void setConnectionId(String connectionId) {
        this.connectionId = connectionId;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public String getclientData() {
        return clientData;
    }

    public void setclientData(String clientData) {
        this.clientData = clientData;
    }

    public String getServerData() {
        return serverData;
    }

    public void setServerData(String serverData) {
        this.serverData = serverData;
    }

    public boolean isAudioEnabled() {
        return audioEnabled;
    }

    public void setAudioEnabled(boolean audioEnabled) {
        this.audioEnabled = audioEnabled;
    }

    public boolean isVideoEnabled() {
        return videoEnabled;
    }

    public void setVideoEnabled(boolean videoEnabled) {
        this.videoEnabled = videoEnabled;
    }

    public String getStreamId() {
        return streamId;
    }

    public void setStreamId(String streamId) {
        this.streamId = streamId;
    }

    public String getConnection() {
        return connection;
    }

    public void setConnection(String connection) {
        this.connection = connection;
    }

    public String getReceivingFrom() {
        return receivingFrom;
    }

    public void setReceivingFrom(String receivingFrom) {
        this.receivingFrom = receivingFrom;
    }

    public String getVideoSource() {
        return videoSource;
    }

    public void setVideoSource(String videoSource) {
        this.videoSource = videoSource;
    }

    public int getVideoFramerate() {
        return videoFramerate;
    }

    public void setVideoFramerate(int videoFramerate) {
        this.videoFramerate = videoFramerate;
    }

    public String getVideoDimensions() {
        return videoDimensions;
    }

    public void setVideoDimensions(String videoDimensions) {
        this.videoDimensions = videoDimensions;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOutputMode() {
        return outputMode;
    }

    public void setOutputMode(String outputMode) {
        this.outputMode = outputMode;
    }

    public String getResolution() {
        return resolution;
    }

    public void setResolution(String resolution) {
        this.resolution = resolution;
    }

    public String getRecordingLayout() {
        return recordingLayout;
    }

    public void setRecordingLayout(String recordingLayout) {
        this.recordingLayout = recordingLayout;
    }

    public boolean isHasAudio() {
        return hasAudio;
    }

    public void setHasAudio(boolean hasAudio) {
        this.hasAudio = hasAudio;
    }

    public boolean isHasVideo() {
        return hasVideo;
    }

    public void setHasVideo(boolean hasVideo) {
        this.hasVideo = hasVideo;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public String getFilterType() {
        return filterType;
    }

    public void setFilterType(String filterType) {
        this.filterType = filterType;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("SessionEventDto{");
        sb.append("sessionId='").append(sessionId).append('\'');
        sb.append(", timestamp=").append(timestamp);
        sb.append(", startTime=").append(startTime);
        sb.append(", duration=").append(duration);
        sb.append(", reason='").append(reason).append('\'');
        sb.append(", connectionId='").append(connectionId).append('\'');
        sb.append(", location='").append(location).append('\'');
        sb.append(", ip='").append(ip).append('\'');
        sb.append(", platform='").append(platform).append('\'');
        sb.append(", clientData='").append(clientData).append('\'');
        sb.append(", serverData='").append(serverData).append('\'');
        sb.append(", audioEnabled=").append(audioEnabled);
        sb.append(", videoEnabled=").append(videoEnabled);
        sb.append(", streamId='").append(streamId).append('\'');
        sb.append(", connection='").append(connection).append('\'');
        sb.append(", receivingFrom='").append(receivingFrom).append('\'');
        sb.append(", videoSource='").append(videoSource).append('\'');
        sb.append(", videoFramerate=").append(videoFramerate);
        sb.append(", videoDimensions='").append(videoDimensions).append('\'');
        sb.append(", id='").append(id).append('\'');
        sb.append(", name='").append(name).append('\'');
        sb.append(", outputMode='").append(outputMode).append('\'');
        sb.append(", resolution='").append(resolution).append('\'');
        sb.append(", recordingLayout='").append(recordingLayout).append('\'');
        sb.append(", hasAudio=").append(hasAudio);
        sb.append(", hasVideo=").append(hasVideo);
        sb.append(", size=").append(size);
        sb.append(", status='").append(status).append('\'');
        sb.append(", data='").append(data).append('\'');
        sb.append(", eventType='").append(eventType).append('\'');
        sb.append(", filterType='").append(filterType).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
