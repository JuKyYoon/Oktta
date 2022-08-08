package com.ssafy.backend.model.dto.lol;

public class MatchDto {
    private MetadataDto metadataDto;
    private InfoDto infoDto;

    public MatchDto() {
    }

    public MatchDto(MetadataDto metadataDto, InfoDto infoDto) {
        this.metadataDto = metadataDto;
        this.infoDto = infoDto;
    }

    public MetadataDto getMetadataDto() {
        return metadataDto;
    }

    public void setMetadataDto(MetadataDto metadataDto) {
        this.metadataDto = metadataDto;
    }

    public InfoDto getInfoDto() {
        return infoDto;
    }

    public void setInfoDto(InfoDto infoDto) {
        this.infoDto = infoDto;
    }

    @Override
    public String toString() {
        return "MatchDto{" +
                "metadataDto=" + metadataDto +
                ", infoDto=" + infoDto +
                '}';
    }
}
