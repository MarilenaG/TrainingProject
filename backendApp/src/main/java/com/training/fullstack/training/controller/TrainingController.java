package com.training.fullstack.training.controller;


import com.training.fullstack.admin.infrastructure.SkillRepository;
import com.training.fullstack.admin.model.Skill;
import com.training.fullstack.mentor.infrastructure.MentorRepository;
import com.training.fullstack.mentor.model.Mentor;
import com.training.fullstack.training.model.Training;
import com.training.fullstack.training.service.TrainingService;
import com.training.fullstack.users.infrastructure.UserRepository;
import com.training.fullstack.users.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import static java.util.stream.Collectors.toList;
import static org.springframework.http.ResponseEntity.ok;
@CrossOrigin//(origins = "http://localhost:8091")
@RestController
@RequestMapping(value = "/training")

public class TrainingController {
    @Autowired
    private TrainingService trainingService;
    @Autowired
    MentorRepository mentorRepository;
    @Autowired
    SkillRepository skillRepository;
    @Autowired
    UserRepository userRepository;

    @PostMapping("/proposeTraining")
    public ResponseEntity<TrainingRepresentation> proposeTraining(@RequestBody ProposeTrainingRepresentation trainingRepresentation ){
        Training proposedTraining = trainingService.proposeTraining(
                trainingRepresentation.userName,
                trainingRepresentation.mentorName,
                trainingRepresentation.skillId,
                trainingRepresentation.startDate,
                trainingRepresentation.endDate,
                trainingRepresentation.startTime,
                trainingRepresentation.endTime);
        return new ResponseEntity(TrainingRepresentation.fromTraining(proposedTraining),HttpStatus.OK);
    }

    @PostMapping("/acceptTraining")
    public ResponseEntity<TrainingRepresentation> acceptTraining(@RequestParam @NotNull Long trainingId  ) {
        Training acceptedTraining = trainingService.acceptTraining(trainingId);
        return new ResponseEntity(TrainingRepresentation.fromTraining(acceptedTraining),HttpStatus.OK);
    }

    @PostMapping("/rejectTraining")
    public ResponseEntity<TrainingRepresentation> rejectTraining(@RequestParam @NotNull Long trainingId ,
                                                                 @RequestParam @NotNull String rejectComments ) {
        Training rejectedTraining = trainingService.rejectTraining(trainingId,rejectComments);
        return new ResponseEntity(TrainingRepresentation.fromTraining(rejectedTraining),HttpStatus.OK);
    }


    @PostMapping("/finalizeTraining")
    public ResponseEntity<TrainingRepresentation> finalizeTraining(@RequestParam @NotNull Long trainingId  ) {
        Training finalizedTraining = trainingService.acceptTraining(trainingId);
        return new ResponseEntity(TrainingRepresentation.fromTraining(finalizedTraining),HttpStatus.OK);
    }

    @PostMapping("/payTraining")
    public ResponseEntity<TrainingRepresentation> payTraining(@RequestParam @NotNull Long trainingId  ) {
        Training payedTraining = trainingService.payTraining(trainingId);
        return new ResponseEntity(TrainingRepresentation.fromTraining(payedTraining),HttpStatus.OK);
    }

    @PostMapping("/rateTraining")
    public ResponseEntity<TrainingRepresentation> rateTraining(@RequestParam @NotNull Long trainingId ,
                                                               @RequestParam @NotNull Integer rating ) {
        Training ratedTraining = trainingService.rateTraining(trainingId,rating);
        return new ResponseEntity(TrainingRepresentation.fromTraining(ratedTraining),HttpStatus.OK);
    }


    @PostMapping("/updateProgressTraining")
    public ResponseEntity<TrainingRepresentation> updateProgress(@RequestParam @NotNull Long trainingId ,
                                                               @RequestParam @NotNull Integer progress ) {
        Training updatedTraining = trainingService.updateProgress(trainingId,progress);
        return new ResponseEntity(TrainingRepresentation.fromTraining(updatedTraining),HttpStatus.OK);
    }


    //                        public List<Training> listTrainingsInProgress (){
//                            public List<Training> listTrainingsByMentor (String mentorName){


    @PostMapping("/findByMentor")
    public ResponseEntity<List<TrainingRepresentation>> listTrainingsByMentor (@RequestBody String mentorName) {
        List<Training> trainingsByMentor = trainingService.listTrainingsByMentor(mentorName);

        List<TrainingRepresentation> results = trainingsByMentor.stream()
                .map(TrainingRepresentation::fromTraining)
                .map(t->fillMentorName(t))
                .map(t->fillUserName(t))
                .map(t->fillSkilltitle(t))
                .collect(toList());
        return ok(results);
    }

    @PostMapping("/findByUser")
    public ResponseEntity<List<TrainingRepresentation>> listTrainingsByUser (@RequestBody String userName) {
        List<Training> trainingsByMentor = trainingService.listTrainingsByUser(userName);

        List<TrainingRepresentation> results = trainingsByMentor.stream()
                .map(TrainingRepresentation::fromTraining)
                .map(t->fillMentorName(t))
                .map(t->fillUserName(t))
                .map(t->fillSkilltitle(t))
                .collect(toList());
        return ok(results);
    }
    @GetMapping("/trainingsInProgress")
    public ResponseEntity<List<TrainingRepresentation>> listTrainingsInProgress () {
        List<Training> trainingsInProgress = trainingService.listTrainingsInProgress();

        List<TrainingRepresentation> results = trainingsInProgress.stream()
                .map(TrainingRepresentation::fromTraining)
                .map(t->fillMentorName(t))
                .map(t->fillUserName(t))
                .map(t->fillSkilltitle(t))
                .collect(toList());
        return ok(results);
    }

    @GetMapping("/trainings")
    public ResponseEntity<List<TrainingRepresentation>> listAllTrainings () {
        List<Training> trainingsInProgress = trainingService.listAllTrainings();

        List<TrainingRepresentation> results = trainingsInProgress.stream()
                .map(TrainingRepresentation::fromTraining)
                .map(t->fillMentorName(t))
                .map(t->fillUserName(t))
                .map(t->fillSkilltitle(t))
                .collect(toList());
        return ok(results);
    }

    private TrainingRepresentation fillUserName(TrainingRepresentation trainingRepresentation){
        User foundUser = userRepository.getOne(trainingRepresentation.getUserId());
        trainingRepresentation.setUserName(foundUser.getUserName());
        return trainingRepresentation;
    }

    private TrainingRepresentation fillMentorName(TrainingRepresentation trainingRepresentation){
        Mentor foundMentor = mentorRepository.getOne(trainingRepresentation.getMentorId());
        trainingRepresentation.setMentorName(foundMentor.getUserName());
        return trainingRepresentation;
    }

    private TrainingRepresentation fillSkilltitle(TrainingRepresentation trainingRepresentation){
        Skill foundskill = skillRepository.getOne(trainingRepresentation.getSkillId());
        trainingRepresentation.setSkillTitle(foundskill.getTitle());
        return trainingRepresentation;
    }
    }
