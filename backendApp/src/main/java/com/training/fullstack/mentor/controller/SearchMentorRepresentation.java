package com.training.fullstack.mentor.controller;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

public class SearchMentorRepresentation {
    @JsonProperty @NotNull Long skillId;
    @JsonProperty @NotNull LocalDate desiredDate;
    @JsonProperty @NotNull LocalTime fromTime;
    @JsonProperty @NotNull LocalTime toTime;
}
