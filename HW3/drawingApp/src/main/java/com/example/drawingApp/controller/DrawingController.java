package com.example.drawingApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.drawingApp.dto.DrawingRequest;
import com.example.drawingApp.entity.Drawing;
import com.example.drawingApp.entity.User;
import com.example.drawingApp.repository.DrawingRepository;
import com.example.drawingApp.repository.UserRepository;

@RestController
@RequestMapping("/api/drawings")
public class DrawingController {

    @Autowired
    private DrawingRepository drawingRepo;

    @Autowired
    private UserRepository userRepo;

    @PostMapping
    public ResponseEntity<?> saveDrawing(@RequestBody DrawingRequest req, Authentication auth) {
        String username = auth.getName();
        User user = userRepo.findById(username).orElseGet(() -> {
            User u = new User(username, "");
            return userRepo.save(u);
        });

        Drawing drawing = drawingRepo.findByUserUsername(username).orElse(new Drawing());
        drawing.setTitle(req.getTitle());
        drawing.setShapesJson(req.getShapesJson());
        drawing.setUser(user);
        drawingRepo.save(drawing);

        return ResponseEntity.ok("Saved");
    }

    @GetMapping
    public ResponseEntity<?> getDrawing(Authentication auth) {
        return drawingRepo.findByUserUsername(auth.getName())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}