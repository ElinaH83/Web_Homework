package com.example.drawingApp.dto;

import lombok.Data;

@Data
public class DrawingRequest {
    private String title;
    private String shapesJson;
}
