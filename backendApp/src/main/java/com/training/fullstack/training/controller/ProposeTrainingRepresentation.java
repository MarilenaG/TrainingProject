package com.training.fullstack.training.controller;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

public class ProposeTrainingRepresentation {
    @JsonProperty   @NotNull String userName;
    @JsonProperty   @NotNull String mentorName;
    @JsonProperty   @NotNull Long skillId;
    @JsonProperty   @NotNull LocalDate startDate;
    @JsonProperty   @NotNull LocalDate endDate;
    @JsonProperty   @NotNull LocalTime startTime;
    @JsonProperty   @NotNull LocalTime endTime;
}
